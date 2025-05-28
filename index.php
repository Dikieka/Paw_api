<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Top Musik Deezer</title>
  <!-- Google Font -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

  <!-- Bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

  <!-- link css -->
  <link rel="stylesheet" href="style.css">
</head>
<body>

   <!-- Hero Section -->
   <section class="hero d-flex align-items-center text-center text-white">
    <div class="container py-5">
      <h1 class="display-3 fw-bold mb-3 hero-title">
        <i class="bi bi-music-note-beamed me-3 icon-accent"></i>Top Musik Deezer
      </h1>
      <p class="lead hero-subtitle mb-0">
        Temukan lagu terbaik, artis populer, dan hits mingguan.
      </p>
    </div>
  </section>

    <section class="section-container">
      <h2 class="section-title"><i class="bi bi-headphones me-2"></i>Lagu Terpopuler</h2>
      <div class="slider-wrapper">
        <div id="top-tracks-slider">
        <div id="top-tracks-slider" class="d-flex gap-3 overflow-auto"></div>
        </div>
        <button class="slider-btn prev" onclick="scrollSlider('left')">&#10094;</button>
        <button class="slider-btn next" onclick="scrollSlider('right')">&#10095;</button>
      </div>
    </section>

    <section class="sticky-top">
  <!-- SEARCH & GENRE BAR COMBINED -->
  <div class="sticky-search-container">
  <div class="d-flex flex-column flex-md-row gap-2 mb-0">
  <!-- Search Bar -->
  <div class="flex-grow-1">
    <div class="input-group input-group-lg">
      <span class="input-group-text bg-dark border-0 text-white">
        <i class="bi bi-search"></i>
      </span>
      <input
        type="text"
        id="search-input"
        class="form-control bg-dark text-white border-0"
        placeholder="Cari lagu atau artis..."
      />
      <button
        class="btn btn-outline-light dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="search-type-button"
      >
        Judul Lagu
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item active" href="#" data-type="track">Judul Lagu</a></li>
        <li><a class="dropdown-item" href="#" data-type="artist">Nama Artis</a></li>
      </ul>
    </div>
  </div>

  <!-- Genre Dropdown -->
  <div style="min-width: 220px;">
    <div class="dropdown w-100">
      <button
        class="btn btn-outline-light dropdown-toggle btn-lg w-100"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="genre-button"
      >
        <i class="bi bi-music-note-list me-2"></i> Semua Genre
      </button>
      <ul class="dropdown-menu genre-dropdown text-white p-2" id="genre-dropdown">
        <!-- Genre list here -->
      </ul>
    </div>
  </div>
</div>
</section>

    <section class="section-container">
      <h3 class="section-title"><i class="bi bi-collection-play me-2"></i>Daftar Lagu</h3>
      <div id="music-container" class="musikList"></div>
    </section>

    <section class="section-container">
      <h3 class="section-title"><i class="bi bi-fire me-2"></i>Daftar Lagu Hits Minggu Ini</h3>
      <div id="weekly-hits-container" class="song-list"></div>
    </section>

    <section class="section-container">
      <h3 class="section-title"><i class="bi bi-star-fill me-2"></i>Artis Terpopuler</h3>
      <div id="top-artists-container" class="artist-list"></div>
    </section>

    <section class="section-container">
      <h3 class="section-title"><i class="bi bi-music-note-list me-2"></i>Lagu Terpopuler per Genre</h3>
      <div id="genre-highlights-container" class="genre-highlight-list"></div>
    </section>
  </div>

  <!-- Modal Detail Lagu -->
  <div class="modal fade" id="track-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header border-0">
          <h5 class="modal-title">Detail Lagu</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="modal-track-detail">
          <!-- Diisi via JavaScript -->
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap & Script -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="script.js"></script>
  <script>
    document.querySelectorAll(".dropdown-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedType = item.getAttribute("data-type");
        document.querySelectorAll(".dropdown-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const btn = document.getElementById("search-type-button");
        btn.textContent = selectedType === "track" ? "Judul Lagu" : "Nama Artis";
        btn.setAttribute("data-selected-type", selectedType);
      });
    });
  function scrollSlider(direction) {
    const slider = document.getElementById('top-tracks-slider');
    const scrollAmount = 300;
    slider.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

const stickyTop = document.querySelector(".sticky-top");
// Simpan posisi awal elemen dari atas dokumen:
const stickyTopInitialOffset = stickyTop.offsetTop;

window.addEventListener("scroll", () => {
  if (window.scrollY > stickyTopInitialOffset) {
    stickyTop.classList.add("sticky-active");
  } else {
    stickyTop.classList.remove("sticky-active");
  }
});

</script>
</body>
</html>
