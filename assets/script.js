document.addEventListener("DOMContentLoaded", () => {
  const API_BASE = "https://api.deezer.com/";

  // Variabel global untuk menyimpan genre yang dipilih
  let selectedGenreId = "";

  // ==== JSONP FETCH ====
  async function fetchJSON(path) {
    return new Promise((resolve, reject) => {
      const callbackName = `jsonp_cb_${Math.floor(Math.random() * 100000)}`;
      const separator = path.includes("?") ? "&" : "?";
      const url = `${API_BASE}${path}${separator}output=jsonp&callback=${callbackName}`;
      const script = document.createElement("script");

      script.src = url;
      script.onerror = () => reject(new Error("JSONP request failed"));

      window[callbackName] = (data) => {
        resolve(data);
        delete window[callbackName];
        document.body.removeChild(script);
      };

      document.body.appendChild(script);
    });
  }

  // Debounce helper supaya search tidak spam API
  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // ==== LOAD GENRES ====
  async function loadGenres() {
    try {
      const data = await fetchJSON(`genre`);
      const dropdown = document.getElementById("genre-dropdown");
      const button = document.getElementById("genre-button");

      dropdown.innerHTML = "";

      const allItem = document.createElement("li");
      allItem.innerHTML = `<a class="dropdown-item" href="#" data-genre-id="">Semua Genre</a>`;
      dropdown.appendChild(allItem);

      data.data.forEach((genre) => {
        if (genre.id !== 0) {
          const item = document.createElement("li");
          item.innerHTML = `<a class="dropdown-item" href="#" data-genre-id="${genre.id}">${genre.name}</a>`;
          dropdown.appendChild(item);
        }
      });

      // Event klik genre di dropdown
      dropdown.addEventListener("click", async (e) => {
        if (e.target.classList.contains("dropdown-item")) {
          e.preventDefault();
          const genreId = e.target.getAttribute("data-genre-id");
          const genreName = e.target.textContent;

          // Simpan genre yang dipilih ke variabel global
          selectedGenreId = genreId;

          // Update teks tombol genre
          button.textContent = genreName;

          clearTrackDetail();

          if (genreId) {
            await loadTracksByGenre(genreId);
          } else {
            await loadTopTracks();
          }
        }
      });
    } catch (e) {
      console.error("Gagal load genre:", e);
    }
  }

  // ==== LOAD TOP TRACKS FOR MAIN LIST ====
  async function loadTopTracks() {
    try {
      const data = await fetchJSON(`chart/0/tracks?limit=14`);
      displayTracks(data.data);
    } catch (e) {
      console.error("Gagal load top tracks:", e);
      displayTracks([]);
    }
  }

  // ==== LOAD TOP TRACKS FOR SLIDER ====
  async function loadTopTracksSlider() {
    try {
      const data = await fetchJSON(`chart/0/tracks`);
      displayTopTracksSlider(data.data);
    } catch (e) {
      console.error("Gagal load top tracks slider:", e);
    }
  }

  // ==== LOAD TRACKS BY GENRE ====
  async function loadTracksByGenre(genreId) {
    try {
      const artistsData = await fetchJSON(`genre/${genreId}/artists`);
      if (!artistsData.data.length) {
        displayTracks([]);
        return;
      }
      const firstArtistId = artistsData.data[0].id;
      const topTracks = await fetchJSON(`artist/${firstArtistId}/top?limit=21`);
      displayTracks(topTracks.data);
    } catch (e) {
      console.error("Gagal load tracks by genre:", e);
      displayTracks([]);
    }
  }

  // ==== DISPLAY TRACKS DI LIST UTAMA ====
  function displayTracks(tracks) {
    const container = document.getElementById("music-container");
    container.innerHTML = "";

    if (!tracks.length) {
      container.textContent = "Tidak ada lagu untuk ditampilkan.";
      return;
    }

    tracks.forEach((track) => {
      const card = document.createElement("div");
      card.className = "song-card";
      card.innerHTML = `
        <img src="${track.album.cover_medium}" alt="${track.title}" />
        <div class="song-title">${track.title}</div>
        <div class="artist-name">${track.artist.name}</div>
      `;
      card.addEventListener("click", () => showTrackDetail(track));
      container.appendChild(card);
    });
  }

  // ==== DISPLAY TOP TRACKS DI SLIDER ====
  function displayTopTracksSlider(tracks) {
    const slider = document.getElementById("top-tracks-slider");
    slider.innerHTML = "";

    tracks.forEach((track) => {
      const card = document.createElement("div");
      card.className = "slider-card";
      card.innerHTML = `
        <img src="${track.album.cover_medium}" alt="${track.title}" />
        <div class="slider-title">${track.title}</div>
        <div class="slider-artist">${track.artist.name}</div>
      `;
      card.addEventListener("click", () => showTrackDetail(track));
      slider.appendChild(card);
    });
  }

  // ==== CLEAR DETAIL LAGU (jika ada di bawah halaman) ====
  function clearTrackDetail() {
    const detail = document.getElementById("track-detail");
    if (detail) detail.innerHTML = "";
  }

  // ==== SEARCH LAGU / ARTIS ====
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener(
    "input",
    debounce(async (e) => {
      const query = e.target.value.trim();

      // Pakai selectedGenreId dari variabel global
      const genreFilter = selectedGenreId;

      if (query.length < 3) {
        clearTrackDetail();
        if (!genreFilter) {
          await loadTopTracks();
        }
        return;
      }

      // Ambil tipe pencarian (track/artis)
      let searchType =
        document
          .getElementById("search-type-button")
          .getAttribute("data-selected-type") || "track";

      // Buat query sesuai tipe
      let q = "";
      if (searchType === "track") {
        q = `track:"${query}"`;
      } else if (searchType === "artist") {
        q = `artist:"${query}"`;
      }

      try {
        const data = await fetchJSON(`search?q=${encodeURIComponent(q)}`);
        displayTracks(data.data);
        clearTrackDetail();
      } catch (error) {
        console.error("Gagal cari lagu/artis:", error);
      }
    }, 500)
  );

  async function loadWeeklyHits() {
    try {
      const artists = [
        "Tulus",
        "Sheila On 7",
        "Seventeen",
        "Didi Kempot",
        "Denny Caknan",
        "NDX AKA",
      ];

      const promises = artists.map((artist) => {
        const url = `search/track?q=artist:"${encodeURIComponent(
          artist
        )}"&limit=3`;
        return fetchJSON(url).then((result) => result?.data || []);
      });

      const results = await Promise.all(promises);
      // Gabungkan semua hasil array lagu
      let allTracks = results.flat();

      // Hapus duplikat lagu berdasarkan id
      const uniqueTracksMap = new Map();
      for (const track of allTracks) {
        uniqueTracksMap.set(track.id, track);
      }
      const uniqueTracks = Array.from(uniqueTracksMap.values());

      // Tampilkan maksimal 20 lagu
      displayTracksToContainer(
        uniqueTracks.slice(0, 20),
        "weekly-hits-container"
      );
    } catch (e) {
      console.error("Gagal load lagu hits weekly:", e);
    }
  }

  // ==== LOAD TOP ARTISTS ====
  async function loadTopArtists() {
    try {
      const data = await fetchJSON(`chart/0/artists?limit=7`);
      const container = document.getElementById("top-artists-container");
      container.innerHTML = "";

      data.data.forEach((artist) => {
        const card = document.createElement("div");
        card.className = "artist-card";
        card.innerHTML = `
        <img src="${artist.picture_medium}" alt="${artist.name}" />
        <div class="artist-name">${artist.name}</div>
      `;
        container.appendChild(card);
      });
    } catch (e) {
      console.error("Gagal load top artists:", e);
    }
  }

  // ==== LOAD HIGHLIGHT TRACKS DARI BEBERAPA GENRE ====
  async function loadGenreHighlights() {
    const genreIds = [132, 116, 152]; // Misalnya: Pop, Rap/Hip Hop, Electro
    const genreNames = { 132: "Pop", 116: "Rap", 152: "Electro" };
    const container = document.getElementById("genre-highlights-container");
    container.innerHTML = "";

    for (const genreId of genreIds) {
      try {
        const artists = await fetchJSON(`genre/${genreId}/artists?limit=3`);
        if (!artists.data.length) continue;

        const topTracks = await fetchJSON(
          `artist/${artists.data[0].id}/top?limit=4`
        );

        const genreBlock = document.createElement("div");
        genreBlock.className = "genre-block mb-3";
        genreBlock.innerHTML = `<h4>${genreNames[genreId]}</h4><div class="song-list" id="genre-${genreId}-tracks"></div>`;
        container.appendChild(genreBlock);

        displayTracksToContainer(topTracks.data, `genre-${genreId}-tracks`);
      } catch (e) {
        console.error(`Gagal load genre ${genreId}`, e);
      }
    }
  }

  // ==== HELPER UNTUK TAMPILKAN TRACK KE KONTENER SPESIFIK ====
  function displayTracksToContainer(tracks, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    tracks.forEach((track) => {
      const card = document.createElement("div");
      card.className = "song-card";
      card.innerHTML = `
      <img src="${track.album.cover_medium}" alt="${track.title}" />
      <div class="song-title">${track.title}</div>
      <div class="artist-name">${track.artist.name}</div>
    `;
      card.addEventListener("click", () => showTrackDetail(track));
      container.appendChild(card);
    });
  }

  // ==== INISIALISASI LOAD DATA ====
  (async () => {
    await loadGenres();
    await loadTopTracks();
    await loadTopTracksSlider();
    await loadWeeklyHits();
    await loadTopArtists();
    await loadGenreHighlights();
  })();

  // ==== TAMPILKAN DETAIL LAGU DALAM POPUP ====
  function showTrackDetail(track) {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.backgroundSize = "cover";
    modal.style.backgroundPosition = "center";
    modal.style.backdropFilter = "blur(8px)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "999999";
    modal.style.color = "white";

    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.7)";
    overlay.style.zIndex = "999999";
    modal.appendChild(overlay);

    const content = document.createElement("div");
    content.classList.add("modal-content-custom");

    // Buat elemen gambar terpisah dengan styling fixed width
    const imgDiv = document.createElement("div");
    imgDiv.style.flex = "0 0 250px"; // fixed lebar 250px
    imgDiv.style.borderRadius = "12px";
    imgDiv.style.overflow = "hidden";
    imgDiv.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";

    const img = document.createElement("img");
    img.src = track.album.cover_medium;
    img.alt = "Album Cover";
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.display = "block";
    img.style.objectFit = "cover";

    imgDiv.appendChild(img);

    // Buat div info detail + audio
    const infoDiv = document.createElement("div");
    infoDiv.style.flex = "1"; // fleksibel, ambil sisa ruang
    infoDiv.style.color = "white";

    infoDiv.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h2 class="mb-1" style="font-size: 1.75rem;">${track.title}</h2>
        <p style="font-size: 1.1rem; color: #ccc;">${track.artist.name}</p>
        <p style="font-size: 0.95rem; color: #aaa;"><strong>Album:</strong> ${
          track.album.title
        }</p>
        <p style="font-size: 0.95rem; color: #aaa;"><strong>Durasi:</strong> ${Math.floor(
          track.duration / 60
        )}:${(track.duration % 60).toString().padStart(2, "0")}</p>
      </div>
      <div style="background-color: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.2);">
        <audio id="modern-audio-player" controls style="width: 100%; height: 40px;">
          <source src="${track.preview}" type="audio/mpeg" />
          Browser kamu tidak mendukung audio.
        </audio>
      </div>
    </div>
  `;

    // Tombol close
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "12px";
    closeBtn.style.right = "12px";
    closeBtn.style.background = "rgba(255, 0, 0, 0.8)";
    closeBtn.style.border = "none";
    closeBtn.style.color = "white";
    closeBtn.style.padding = "6px 12px";
    closeBtn.style.borderRadius = "50%";
    closeBtn.style.fontSize = "1.25rem";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.lineHeight = "1";

    closeBtn.addEventListener("click", () => {
      document.body.removeChild(modal);
      document.body.style.overflow = "";
    });

    content.appendChild(imgDiv);
    content.appendChild(infoDiv);
    content.appendChild(closeBtn);

    modal.appendChild(content);
    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";

    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target === overlay) {
        document.body.removeChild(modal);
        document.body.style.overflow = "";
      }
    });
  }
});
