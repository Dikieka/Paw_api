<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Pilih Artis Favorit</title>
  <style>
   body {
  font-family: sans-serif;
  background: linear-gradient(-45deg, #0a0f1a, #1f2937, #2d3748, #1a202c);
  margin: 0;
}
.content {
  padding: 20px;
}

    h1 { margin-bottom: 10px; }
    .genre-container {
      display: flex;
      overflow-x: auto;
      gap: 10px;
      padding-bottom: 10px;
      padding: 30px;
      font-weight: bold;
    }

    nav {
      position: sticky;
      top: 0;
      background: linear-gradient(-45deg, #0a0f1a, #1f2937, #2d3748, #1a202c);
      z-index: 1000;
      padding: 10px 20px;
      width: 100vw;       /* Buat selebar viewport */
      margin-left: -20px; /* Hapus efek padding dari body */
      box-sizing: border-box;
      text-align: center;
      color: white;
    }

    .genre-card {
      flex: 0 0 auto;
      padding: 10px 16px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 8px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.3s;
      user-select: none;
      color: white;
    }
    .genre-card.active {
      background: #007bff;
      color: white;
    }
    .artist-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 16px;
      margin-top: 20px;
    }
    .artist-card {
      background: rgba(255, 255, 255, 0.06);
      padding: 10px;
      border-radius: 8px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      text-align: center;
      transition: transform 0.2s, border 0.2s;
      user-select: none;
      color: white;
    }
    .artist-card.selected {
      border: 2px solid #28a745;
      transform: scale(1.03);
    }
    .artist-card img {
      width: 100%;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    #confirm-btn {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 12px 20px;
      font-size: 16px;
      background: gray;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: not-allowed;
      z-index: 999;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      transition: background 0.3s;
    }
    #confirm-btn.active {
      background: #28a745;
      cursor: pointer;
    }
    .spacer { height: 100px; }

    @media (max-width: 600px) {
  .genre-container {
    padding: 10px;
    gap: 8px;
    font-size: 14px;
  }

  .artist-grid {
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 12px;
  }

  .artist-card {
    padding: 8px;
    font-size: 14px;
  }

  nav {
    padding: 10px 10px;
    margin-left: 0;
  }

  h1 {
    font-size: 20px;
  }

  #confirm-btn {
    width: calc(100% - 40px);
    max-width: 360px;
    padding: 10px 16px;
    font-size: 14px;
  }
}

  </style>
</head>
<body>
  <nav>
    <h1>Pilih Artis Favorit</h1>
    <div class="genre-container" id="genre-container"></div>
  </nav>
  <div class="content">
    <div class="artist-grid" id="artist-grid"></div>
    <div class="spacer"></div>
  </div>
  <button id="confirm-btn" tabindex="-1" disabled>Pilih 10 Artis untuk Melanjutkan</button>

  <script>
  const API_BASE = "https://api.deezer.com/";
  const selectedArtists = new Map();
  const MAX_SELECTION = 15;
  const MIN_SELECTION = 10;

  // JSONP fetch helper karena Deezer API CORS terbatas
  function fetchJSON(path) {
    return new Promise((resolve, reject) => {
      const callbackName = "jsonp_cb_" + Math.floor(Math.random() * 100000);
      const url = `${API_BASE}${path}${path.includes("?") ? "&" : "?"}output=jsonp&callback=${callbackName}`;
      const script = document.createElement("script");
      script.src = url;

      script.onerror = () => {
        console.error("JSONP request failed:", url);
        reject(new Error("JSONP error"));
      };

      window[callbackName] = (data) => {
        resolve(data);
        delete window[callbackName];
        document.body.removeChild(script);
      };

      document.body.appendChild(script);
    });
  }

  async function loadGenres() {
    try {
      const data = await fetchJSON("genre");
      const container = document.getElementById("genre-container");
      container.innerHTML = "";

      let firstGenreDiv = null;
      data.data.forEach((genre) => {
        if (genre.id !== 0) {
          const div = document.createElement("div");
          div.className = "genre-card";
          div.textContent = genre.name;
          div.dataset.id = genre.id;
          div.addEventListener("click", () => handleGenreClick(genre.id, div));
          container.appendChild(div);
          if (!firstGenreDiv) firstGenreDiv = div;
        }
      });

      if (firstGenreDiv) {
        firstGenreDiv.classList.add("active");
        await handleGenreClick(firstGenreDiv.dataset.id, firstGenreDiv);
      }
    } catch (err) {
      console.error("Failed to load genres", err);
      alert("Gagal memuat genre. Coba lagi nanti.");
    }
  }

  async function handleGenreClick(genreId, clickedEl) {
    document.querySelectorAll(".genre-card").forEach(el => el.classList.remove("active"));
    clickedEl.classList.add("active");
    try {
      const data = await fetchJSON(`genre/${genreId}/artists?limit=10`);
      displayArtists(data.data || []);
    } catch (err) {
      console.error("Failed to load artists", err);
      alert("Gagal memuat artis.");
    }
  }

  function displayArtists(artists) {
    const grid = document.getElementById("artist-grid");
    grid.innerHTML = "";
    artists.forEach(artist => {
      const card = document.createElement("div");
      card.className = "artist-card";
      card.innerHTML = `
        <img src="${artist.picture_medium}" alt="${artist.name}" />
        <div>${artist.name}</div>
      `;
      card.addEventListener("click", () => toggleSelect(card, artist));
      if (selectedArtists.has(artist.id)) card.classList.add("selected");
      grid.appendChild(card);
    });
  }

  function toggleSelect(card, artist) {
    if (selectedArtists.has(artist.id)) {
      selectedArtists.delete(artist.id);
      card.classList.remove("selected");
    } else {
      if (selectedArtists.size >= MAX_SELECTION) {
        alert(`Maksimal memilih ${MAX_SELECTION} artis.`);
        return;
      }
      selectedArtists.set(artist.id, artist);
      card.classList.add("selected");
    }
    updateButtonState();
  }

  function updateButtonState() {
    const btn = document.getElementById("confirm-btn");
    const count = selectedArtists.size;
    btn.textContent = count >= MIN_SELECTION ? `Lanjut (${count} artis dipilih)` : `Pilih ${MIN_SELECTION} Artis untuk Melanjutkan`;
    btn.classList.toggle("active", count >= MIN_SELECTION);
    btn.disabled = count < MIN_SELECTION;
    if (count >= MIN_SELECTION) {
      btn.onclick = count >= 10 ? () => {
  const ids = Array.from(selectedArtists.values()).map(a => a.id).join(",");
  sessionStorage.setItem("selectedArtistIds", ids);  // pake sessionStorage
  location.href = "index.php";
} : null;

    } else {
      btn.onclick = null;
    }
  }

  // Inisialisasi
  loadGenres();

  // Scroll ke atas saat load
  window.onload = () => window.scrollTo(0, 0);
  </script>
</body>
</html>
