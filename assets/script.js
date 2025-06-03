document.addEventListener("DOMContentLoaded", () => {
  const API = "https://api.deezer.com/";
  let selectedGenreId = "";
  let selectedArtistIds = null; // Track selected artists

  const fetchJSONP = (path) => {
    return new Promise((resolve, reject) => {
      const cb = "cb_" + Math.floor(Math.random() * 100000);
      const url = `${API}${path}${
        path.includes("?") ? "&" : "?"
      }output=jsonp&callback=${cb}`;
      const script = document.createElement("script");
      script.src = url;
      script.onerror = () => reject(new Error("JSONP error"));
      window[cb] = (data) => {
        resolve(data);
        delete window[cb];
        document.body.removeChild(script);
      };
      document.body.appendChild(script);
    });
  };

  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  async function loadGenres() {
    try {
      const data = await fetchJSONP("genre");
      const dropdown = document.getElementById("genre-dropdown");
      const button = document.getElementById("genre-button");
      dropdown.innerHTML = `<li><a class="dropdown-item" href="#" data-genre-id="">Semua Genre</a></li>`;
      data.data.forEach(({ id, name }) => {
        if (id !== 0) {
          dropdown.innerHTML += `<li><a class="dropdown-item" href="#" data-genre-id="${id}">${name}</a></li>`;
        }
      });

      dropdown.addEventListener("click", async (e) => {
        if (e.target.classList.contains("dropdown-item")) {
          e.preventDefault();
          const id = e.target.dataset.genreId;
          selectedGenreId = id;
          button.innerHTML = `<i class="bi bi-music-note-list me-2"></i>${e.target.textContent}`;
          clearDetail();
          if (id) {
            await loadTracksByGenre(id);
          } else {
            // Jika "Semua Genre" dipilih, load berdasarkan artis terpilih atau top tracks
            if (selectedArtistIds && selectedArtistIds.length > 0) {
              await loadTracksByArtists(selectedArtistIds);
            } else {
              await loadTopTracks();
            }
          }
        }
      });
    } catch (err) {
      console.error("Gagal load genre:", err);
    }
  }

  const loadTopTracks = async () => {
    try {
      const { data } = await fetchJSONP("chart/0/tracks?limit=14");
      renderTracks(data, "music-container");
    } catch (err) {
      console.error("Gagal load top tracks:", err);
      renderTracks([], "music-container");
    }
  };

  const loadTracksByGenre = async (genreId) => {
    try {
      const { data: artists } = await fetchJSONP(`genre/${genreId}/artists`);
      if (!artists.length) return renderTracks([], "music-container");
      const artistId = artists[0].id;
      const { data } = await fetchJSONP(`artist/${artistId}/top?limit=21`);
      renderTracks(data, "music-container");
    } catch (err) {
      console.error("Gagal load tracks by genre:", err);
      renderTracks([], "music-container");
    }
  };

  const loadTracksByArtists = async (artistIds) => {
    try {
      const trackResults = await Promise.all(
        artistIds.map((id) =>
          fetchJSONP(`artist/${id}/top?limit=5`).then((res) => res.data || [])
        )
      );
      // Remove duplicate tracks by ID
      const tracks = [
        ...new Map(trackResults.flat().map((t) => [t.id, t])).values(),
      ];
      renderTracks(tracks.slice(0, 30), "music-container");
    } catch (err) {
      console.error("Gagal load tracks dari artis-artis pilihan:", err);
      renderTracks([], "music-container");
    }
  };

  const renderTracks = (tracks, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = tracks.length
      ? tracks.map(trackCard).join("")
      : "Tidak ada lagu untuk ditampilkan.";

    container
      .querySelectorAll(".song-card")
      .forEach((card, i) =>
        card.addEventListener("click", () => window.showTrackDetail(tracks[i]))
      );
  };

  const trackCard = (track) => `
    <div class="song-card" style="cursor:pointer;">
      <img src="${track.album.cover_medium}" alt="${track.title}">
      <div class="song-title">${track.title}</div>
      <div class="artist-name">${track.artist.name}</div>
    </div>`;

  const clearDetail = () => {
    const detail = document.getElementById("track-detail");
    if (detail) detail.innerHTML = "";
  };

  // Search input with debounce
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce(async (e) => {
        const query = e.target.value.trim();
        const typeBtn = document.getElementById("search-type-button");
        const type = typeBtn?.getAttribute("data-selected-type") || "track";

        if (query.length < 3) {
          clearDetail();
          // Jika search kosong, kembalikan ke default (artis terpilih atau top tracks)
          if (selectedArtistIds && selectedArtistIds.length > 0) {
            await loadTracksByArtists(selectedArtistIds);
          } else if (!selectedGenreId) {
            await loadTopTracks();
          }
          return;
        }

        try {
          const q = `${type}:"${query}"`;
          const { data } = await fetchJSONP(
            `search?q=${encodeURIComponent(q)}`
          );
          renderTracks(data, "music-container");
          clearDetail();
        } catch (err) {
          console.error("Gagal cari:", err);
        }
      }, 500)
    );
  }

  async function loadTopSlider() {
    try {
      const { data } = await fetchJSONP("chart/0/tracks");
      const slider = document.getElementById("top-tracks-slider");
      if (!slider) return;
      slider.innerHTML = data
        .map(
          (track) => `
        <div class="slider-card" style="cursor:pointer;">
          <img src="${track.album.cover_medium}" alt="${track.title}">
          <div class="slider-title">${track.title}</div>
          <div class="slider-artist">${track.artist.name}</div>
        </div>`
        )
        .join("");

      slider
        .querySelectorAll(".slider-card")
        .forEach((el, i) =>
          el.addEventListener("click", () => window.showTrackDetail(data[i]))
        );
    } catch (err) {
      console.error("Gagal load slider:", err);
    }
  }

  async function loadWeeklyHits() {
    const artists = [
      "Tulus",
      "Sheila On 7",
      "Seventeen",
      "Didi Kempot",
      "Denny Caknan",
      "NDX AKA",
    ];
    try {
      const results = await Promise.all(
        artists.map((name) =>
          fetchJSONP(
            `search/track?q=artist:"${encodeURIComponent(name)}"&limit=3`
          ).then((res) => res.data || [])
        )
      );
      const tracks = [
        ...new Map(results.flat().map((t) => [t.id, t])).values(),
      ];
      renderTracks(tracks.slice(0, 20), "weekly-hits-container");
    } catch (err) {
      console.error("Gagal load weekly hits:", err);
    }
  }

  async function loadTopArtists() {
    try {
      const { data } = await fetchJSONP("chart/0/artists?limit=7");
      const container = document.getElementById("top-artists-container");
      if (!container) return;
      container.innerHTML = data
        .map(
          (a) => `
        <div class="artist-card">
          <img src="${a.picture_medium}" alt="${a.name}">
          <div class="artist-name">${a.name}</div>
        </div>`
        )
        .join("");
    } catch (err) {
      console.error("Gagal load top artists:", err);
    }
  }

  async function loadGenreHighlights() {
    const genres = [
      { id: 132, name: "Pop" },
      { id: 116, name: "Rap" },
      { id: 152, name: "Electro" },
    ];

    const container = document.getElementById("genre-highlights-container");
    if (!container) return;
    container.innerHTML = "";

    for (const { id, name } of genres) {
      try {
        const { data: artists } = await fetchJSONP(
          `genre/${id}/artists?limit=3`
        );
        if (!artists.length) continue;
        const { data } = await fetchJSONP(
          `artist/${artists[0].id}/top?limit=4`
        );
        const block = document.createElement("div");
        block.className = "genre-block mb-3";
        block.innerHTML = `<h4>${name}</h4><div class="song-list" id="genre-${id}-tracks"></div>`;
        container.appendChild(block);
        renderTracks(data, `genre-${id}-tracks`);
      } catch (err) {
        console.error(`Gagal load genre ${id}:`, err);
      }
    }
  }

  async function init() {
    // Cek artis yang dipilih dari sessionStorage
    const selectedArtistIdsString = sessionStorage.getItem("selectedArtistIds");
    if (selectedArtistIdsString) {
      selectedArtistIds = selectedArtistIdsString
        .split(",")
        .map((id) => id.trim());
    }

    await loadGenres();

    // Prioritaskan loading berdasarkan artis yang dipilih
    if (selectedArtistIds && selectedArtistIds.length >= 10) {
      await loadTracksByArtists(selectedArtistIds);
    } else {
      // Jika tidak ada artis terpilih yang cukup, redirect ke select.php
      if (!selectedArtistIds || selectedArtistIds.length < 10) {
        window.location.href = "select.php";
        return;
      }
      await loadTopTracks();
    }

    await loadTopSlider();
    await loadWeeklyHits();
    await loadTopArtists();
    await loadGenreHighlights();
  }

  init();
});
