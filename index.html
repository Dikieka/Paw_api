<?php
session_start();
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/png" href="assets/img/tracksnap.png" />
  <title>TrackSnap</title>

  <!-- Google Font -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />

  <!-- Custom CSS -->
  <link rel="stylesheet" href="assets/style.css" />
</head>
<body>
  <!-- Hero Section -->
  <section class="hero d-flex align-items-center text-center text-white bg-primary">
    <div class="container py-5">
      <h1 class="display-3 fw-bold mb-3 hero-title">
        <i class="bi bi-music-note-beamed me-3 icon-accent"></i>Top Musik TrackSnap
      </h1>
      <p class="lead hero-subtitle mb-0">
        Temukan lagu terbaik, artis populer, dan hits mingguan.
      </p>
    </div>
  </section>

  <section class="section-container">
    <h2 class="section-title"><i class="bi bi-headphones me-2"></i>Lagu Terpopuler</h2>
    <div class="slider-wrapper position-relative">
      <div id="top-tracks-slider" class="d-flex gap-3 overflow-auto"></div>
      <button class="slider-btn prev" onclick="scrollSlider('left')">&#10094;</button>
      <button class="slider-btn next" onclick="scrollSlider('right')">&#10095;</button>
    </div>
  </section>

  <!-- IMPROVED STICKY SEARCH & GENRE BAR -->
  <div class="sticky-search-wrapper" id="sticky-search-wrapper">
    <div class="sticky-search-container">
      <div class="container-fluid px-3">
        <div class="d-flex flex-column flex-md-row gap-3 align-items-stretch">
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
                data-selected-type="track"
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
          <div style="min-width: 240px;">
            <div class="dropdown w-100">
              <button
                class="btn btn-outline-light dropdown-toggle btn-lg w-100 d-flex align-items-center justify-content-between"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="genre-button"
              >
                <span><i class="bi bi-music-note-list me-2"></i>Semua Genre</span>
              </button>
              <ul class="dropdown-menu genre-dropdown w-100" id="genre-dropdown">
                <li class="text-center p-2">
                  <div class="spinner-border spinner-border-sm text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <small class="text-muted ms-2">Memuat genre...</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="section-container">
    <h3 class="section-title"><i class="bi bi-collection-play me-2"></i>Daftar Lagu</h3>
    <div id="music-container" class="song-list">
      <div class="text-center p-4">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="text-muted mt-2">Memuat lagu...</p>
      </div>
    </div>
  </section>

  <section class="section-container">
    <h3 class="section-title"><i class="bi bi-fire me-2"></i>Daftar Lagu Hits Minggu Ini</h3>
    <div id="weekly-hits-container" class="song-list">
      <div class="text-center p-4">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="text-muted mt-2">Memuat hits mingguan...</p>
      </div>
    </div>
  </section>

  <section class="section-container">
    <h3 class="section-title"><i class="bi bi-star-fill me-2"></i>Artis Terpopuler</h3>
    <div id="top-artists-container" class="artist-list">
      <div class="text-center p-4">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="text-muted mt-2">Memuat artis...</p>
      </div>
    </div>
  </section>

  <section class="section-container">
    <h3 class="section-title"><i class="bi bi-music-note-list me-2"></i>Lagu Terpopuler per Genre</h3>
    <div id="genre-highlights-container" class="genre-highlight-list">
      <div class="text-center p-4">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="text-muted mt-2">Memuat genre highlights...</p>
      </div>
    </div>
  </section>

  <!-- Modal Detail Lagu -->
  <div class="modal fade" id="track-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header border-0">
          <h5 class="modal-title">Detail Lagu</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="modal-track-detail">
          <!-- Isi modal via JS -->
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap & Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/script.js"></script>

  <script>
    // IMPROVED Sticky Search Bar JavaScript
    class StickySearchBar {
      constructor() {
        this.stickyWrapper = document.getElementById("sticky-search-wrapper");
        this.stickyOffset = 0;
        this.isSticky = false;
        this.spacer = null;
        this.ticking = false;
        
        this.init();
      }

      init() {
        if (!this.stickyWrapper) return;
        
        // Wait for page to fully load before calculating offset
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => this.calculateOffset(), 100);
          });
        } else {
          setTimeout(() => this.calculateOffset(), 100);
        }

        // Bind events
        this.bindEvents();
      }

      calculateOffset() {
        if (this.stickyWrapper && !this.isSticky) {
          // Get the offset position relative to the document
          const rect = this.stickyWrapper.getBoundingClientRect();
          this.stickyOffset = rect.top + window.pageYOffset;
          console.log('Sticky offset calculated:', this.stickyOffset);
        }
      }

      createSpacer() {
        if (!this.spacer) {
          this.spacer = document.createElement('div');
          this.spacer.id = 'sticky-spacer';
          this.spacer.className = 'sticky-spacer';
          this.spacer.style.height = this.stickyWrapper.offsetHeight + 'px';
          this.stickyWrapper.parentNode.insertBefore(this.spacer, this.stickyWrapper);
        }
      }

      removeSpacer() {
        if (this.spacer) {
          this.spacer.remove();
          this.spacer = null;
        }
      }

      handleScroll() {
        if (!this.stickyWrapper) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const shouldBeSticky = scrollTop > this.stickyOffset;
        
        if (shouldBeSticky && !this.isSticky) {
          // Becoming sticky
          this.isSticky = true;
          this.createSpacer();
          this.stickyWrapper.classList.add("sticky-active");
        } else if (!shouldBeSticky && this.isSticky) {
          // Becoming non-sticky
          this.isSticky = false;
          this.removeSpacer();
          this.stickyWrapper.classList.remove("sticky-active");
        }
      }

      throttledScroll() {
        if (!this.ticking) {
          requestAnimationFrame(() => {
            this.handleScroll();
            this.ticking = false;
          });
          this.ticking = true;
        }
      }

      bindEvents() {
        // Scroll event
        window.addEventListener("scroll", () => this.throttledScroll(), { passive: true });
        
        // Resize event
        window.addEventListener('resize', () => {
          if (!this.isSticky) {
            setTimeout(() => this.calculateOffset(), 100);
          } else if (this.spacer) {
            this.spacer.style.height = this.stickyWrapper.offsetHeight + 'px';
          }
        });

        // Image load events
        window.addEventListener('load', () => {
          setTimeout(() => this.calculateOffset(), 200);
        });
      }
    }

    // Initialize sticky search bar
    const stickySearchBar = new StickySearchBar();

    // Dropdown search type logic
    document.addEventListener('DOMContentLoaded', () => {
      const searchTypeDropdown = document.querySelectorAll("#sticky-search-wrapper .dropdown-item");
      const searchTypeButton = document.getElementById("search-type-button");
      
      searchTypeDropdown.forEach(item => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          const selectedType = item.getAttribute("data-type");
          
          // Update active state
          searchTypeDropdown.forEach(i => i.classList.remove("active"));
          item.classList.add("active");

          // Update button text and data attribute
          if (searchTypeButton) {
            searchTypeButton.textContent = selectedType === "track" ? "Judul Lagu" : "Nama Artis";
            searchTypeButton.setAttribute("data-selected-type", selectedType);
          }
        });
      });
    });

    // Slider scroll function
    function scrollSlider(direction) {
      const slider = document.getElementById('top-tracks-slider');
      if (!slider) return;
      
      const scrollAmount = 300;
      const currentScroll = slider.scrollLeft;
      const targetScroll = direction === 'left' 
        ? Math.max(0, currentScroll - scrollAmount)
        : currentScroll + scrollAmount;
        
      slider.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }

    // JSONP helper function for Deezer API
    async function fetchJSON(path) {
      return new Promise((resolve, reject) => {
        const callback = "jsonp_cb_" + Math.floor(Math.random() * 100000);
        const url = `https://api.deezer.com/${path}${path.includes("?") ? "&" : "?"}output=jsonp&callback=${callback}`;
        const script = document.createElement("script");
        script.src = url;
        script.onerror = () => reject(new Error("JSONP error"));
        window[callback] = (data) => {
          resolve(data);
          delete window[callback];
          document.body.removeChild(script);
        };
        document.body.appendChild(script);
      });
    }

    // Fungsi menampilkan detail lagu di modal
    function showTrackDetail(track) {
      const modalDetail = document.getElementById('modal-track-detail');
      modalDetail.innerHTML = `
        <div class="text-center mb-3">
          <img src="${track.album.cover_big}" alt="${track.title}" class="img-fluid rounded" style="max-height: 300px;">
        </div>
        <h4>${track.title}</h4>
        <p><strong>Artis:</strong> ${track.artist.name}</p>
        <p><strong>Album:</strong> ${track.album.title}</p>
        <p><strong>Durasi:</strong> ${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')} menit</p>
        <audio controls src="${track.preview}" class="w-100"></audio>
      `;

      const trackModal = new bootstrap.Modal(document.getElementById('track-modal'));
      trackModal.show();
    }

    // Cek data artis terpilih di sessionStorage - redirect jika tidak ada
    const selectedArtistIds = sessionStorage.getItem('selectedArtistIds');
    if (!selectedArtistIds || selectedArtistIds.split(',').length < 10) {
      window.location.href = 'select.php';
    }

    // Make functions globally accessible
    window.showTrackDetail = showTrackDetail;
    window.scrollSlider = scrollSlider;
  </script>
</body>
</html>