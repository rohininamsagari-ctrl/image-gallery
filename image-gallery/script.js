/**
 * Luminary Gallery — script.js
 * Handles: lightbox, category filtering, search, keyboard navigation
 */

// ============================================================
// Image Data
// All gallery images with metadata for filtering and search
// ============================================================
const IMAGES = [
  // Nature
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?w=600&h=400&fit=crop&auto=format",
    title: "Golden Hour Ridge",
    category: "nature",
    alt: "Layered mountain ridges under a warm orange sky with long shadows",
    desc: "Waves of mountain ridges stretch toward a horizon set ablaze by the setting sun, each layer dissolving into warm haze."
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1612441804231-77a36b284856?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1612441804231-77a36b284856?w=600&h=400&fit=crop&auto=format",
    title: "Alpine Meadow",
    category: "nature",
    alt: "Green mountains under a clear blue sky during daytime",
    desc: "Lush green slopes roll beneath a sharp alpine sky — a landscape of quiet, overwhelming scale."
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?w=600&h=400&fit=crop&auto=format",
    title: "Yosemite Falls at Dawn",
    category: "nature",
    alt: "Snow-dusted granite cliffs and a waterfall above a forest in Yosemite National Park",
    desc: "Mist rising from Yosemite's famous falls, framed by winter granite and a dense pine forest below."
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=600&h=400&fit=crop&auto=format",
    title: "Desert Aerial",
    category: "nature",
    alt: "Aerial photo of brown eroded mountains and canyons",
    desc: "From altitude, Earth's crust reveals its ancient geology — a tapestry of erosion and time."
  },

  // Travel
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1433769778268-24b797c4fc9a?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1433769778268-24b797c4fc9a?w=600&h=400&fit=crop&auto=format",
    title: "Mediterranean Streets",
    category: "travel",
    alt: "Low-angle photography of white and orange buildings under blue sky",
    desc: "Whitewashed walls and terracotta rooftops beneath a Mediterranean afternoon — the kind of place that slows time."
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1525095240410-9645dea911e4?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1525095240410-9645dea911e4?w=600&h=400&fit=crop&auto=format",
    title: "Glass Towers",
    category: "travel",
    alt: "Worm's eye view of high-rise buildings under blue sky",
    desc: "Looking straight up into a canyon of glass and steel — a city's ambition distilled to pure geometry."
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1601546993085-fdfb6c5f76a9?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1601546993085-fdfb6c5f76a9?w=600&h=400&fit=crop&auto=format",
    title: "Stone Façade",
    category: "travel",
    alt: "Brown and gray concrete heritage building facade",
    desc: "Age-worn stone tells the story of centuries — every crack and shadow a page of urban history."
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1554793000-245d3a3c2a51?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1554793000-245d3a3c2a51?w=600&h=400&fit=crop&auto=format",
    title: "Colonial Quarter",
    category: "travel",
    alt: "Brown building structure in a colonial quarter",
    desc: "Colonial-era architecture standing quietly in afternoon light, its proportions a lesson in measured elegance."
  },

  // Animals
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?w=600&h=400&fit=crop&auto=format",
    title: "Silver Fox",
    category: "animals",
    alt: "Orange and silver fox portrait",
    desc: "A silver fox pauses, its amber eyes meeting the lens with unmistakable intelligence and poise."
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1544979590-37e9b47eb705?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1544979590-37e9b47eb705?w=600&h=400&fit=crop&auto=format",
    title: "Leopard at Rest",
    category: "animals",
    alt: "Brown and black leopard close-up portrait",
    desc: "Every spot a fingerprint, every gaze a quiet threat — the leopard at rest is no less formidable."
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1511216113906-8f57bb83e776?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1511216113906-8f57bb83e776?w=600&h=400&fit=crop&auto=format",
    title: "Lion Portrait",
    category: "animals",
    alt: "Lion in close up shot, mane filling the frame",
    desc: "The lion's mane frames a face of absolute authority — regal, still, and utterly present."
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1605092676920-8ac5ae40c7c8?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1605092676920-8ac5ae40c7c8?w=600&h=400&fit=crop&auto=format",
    title: "Bengal Tiger",
    category: "animals",
    alt: "Brown and black tiger in close-up photography",
    desc: "Stripes dissolve into shadow as the tiger's gaze holds steady — nature's most perfectly designed predator."
  },

  // Architecture (bonus entries mixing with travel)
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1462556791646-c201b8241a94?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1462556791646-c201b8241a94?w=600&h=400&fit=crop&auto=format",
    title: "Glass Reflection",
    category: "architecture",
    alt: "Low angle photo of curtain wall glass building",
    desc: "A curtain wall of glass mirrors sky and clouds — architecture and atmosphere merging into one surface."
  },

  // Technology
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=600&h=400&fit=crop&auto=format",
    title: "Orbital Circuit",
    category: "technology",
    alt: "Blue and white round abstract technology illustration",
    desc: "Data flows in orbital arcs — a visual language for the invisible systems that power modern life."
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1672750771479-5ea73e9439ce?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1672750771479-5ea73e9439ce?w=600&h=400&fit=crop&auto=format",
    title: "Signal Flow",
    category: "technology",
    alt: "Abstract blue background with flowing lines and curves",
    desc: "Smooth curves of light trace the path of data — a serene abstraction of the speed beneath."
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=1200&h=800&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=600&h=400&fit=crop&auto=format",
    title: "Chromatic Spiral",
    category: "technology",
    alt: "Spiral of blue, purple, and yellow discs against a solid purple background",
    desc: "A vortex of color and geometry — playful, precise, and slightly hypnotic."
  }
];

// ============================================================
// State
// ============================================================
let currentCategory = "all";  // active filter
let searchQuery = "";          // active search string
let lightboxIndex = -1;        // index into filtered images
let filteredImages = [...IMAGES];

// ============================================================
// Gallery Rendering
// Build and inject gallery cards into #galleryGrid
// ============================================================
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  // Apply filters
  filteredImages = IMAGES.filter(function(img) {
    var matchCat = currentCategory === "all" || img.category === currentCategory;
    var q = searchQuery.toLowerCase();
    var matchSearch = !q || img.title.toLowerCase().includes(q) || img.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  // Update count
  var countEl = document.getElementById("galleryCount");
  if (countEl) {
    countEl.textContent = filteredImages.length + " image" + (filteredImages.length !== 1 ? "s" : "");
  }

  // Empty state
  if (filteredImages.length === 0) {
    grid.innerHTML = '<div class="gallery-empty"><h3>No images found</h3><p>Try a different category or search term.</p></div>';
    return;
  }

  // Build cards
  grid.innerHTML = filteredImages.map(function(img, i) {
    return '<article class="card" data-index="' + i + '" tabindex="0" role="button" aria-label="View image: ' + img.title + '">' +
      '<div class="card__img-wrap">' +
        '<img src="' + img.thumb + '" alt="' + img.alt + '" loading="lazy" />' +
      '</div>' +
      '<div class="card__overlay">' +
        '<span class="card__category">' + capitalise(img.category) + '</span>' +
        '<span class="card__title">' + img.title + '</span>' +
      '</div>' +
    '</article>';
  }).join("");

  // Attach click / keyboard events to each card
  grid.querySelectorAll(".card").forEach(function(card) {
    var idx = parseInt(card.getAttribute("data-index"), 10);
    card.addEventListener("click", function() { openLightbox(idx); });
    card.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(idx); }
    });
  });
}

// ============================================================
// Category Filter
// Highlight active button and re-render gallery
// ============================================================
function setCategory(cat) {
  currentCategory = cat;

  // Update button states
  document.querySelectorAll(".filter-btn").forEach(function(btn) {
    btn.classList.toggle("active", btn.getAttribute("data-cat") === cat);
    btn.setAttribute("aria-pressed", btn.getAttribute("data-cat") === cat ? "true" : "false");
  });

  renderGallery();
}

// ============================================================
// Search
// Triggered on every keystroke in the search input
// ============================================================
function handleSearch(e) {
  searchQuery = e.target.value;
  renderGallery();
}

// ============================================================
// Lightbox — Open
// Show the lightbox with the image at `index` in filteredImages
// ============================================================
function openLightbox(index) {
  lightboxIndex = index;
  updateLightboxContent();

  var lb = document.getElementById("lightbox");
  lb.classList.add("open");
  document.body.style.overflow = "hidden"; // prevent page scroll
  lb.querySelector(".lightbox__close").focus();
}

// ============================================================
// Lightbox — Close
// Hide the lightbox and restore scrolling
// ============================================================
function closeLightbox() {
  var lb = document.getElementById("lightbox");
  lb.classList.remove("open");
  document.body.style.overflow = "";
  lightboxIndex = -1;
}

// ============================================================
// Lightbox — Next / Previous
// Navigate through filteredImages with wraparound
// ============================================================
function showNextImage() {
  if (filteredImages.length === 0) return;
  lightboxIndex = (lightboxIndex + 1) % filteredImages.length;
  updateLightboxContent();
}

function showPrevImage() {
  if (filteredImages.length === 0) return;
  lightboxIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
  updateLightboxContent();
}

// ============================================================
// Lightbox — Update Content
// Swap image src and meta info for the current index
// ============================================================
function updateLightboxContent() {
  var img = filteredImages[lightboxIndex];
  if (!img) return;

  var el = document.getElementById("lightbox");
  var imgEl = el.querySelector(".lightbox__img");
  var titleEl = el.querySelector(".lightbox__title");
  var catEl = el.querySelector(".lightbox__cat");
  var descEl = el.querySelector(".lightbox__desc");
  var counterEl = el.querySelector(".lightbox__counter");

  // Fade out → swap → fade in
  imgEl.style.opacity = "0";
  setTimeout(function() {
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    imgEl.style.opacity = "1";
  }, 160);

  if (titleEl) titleEl.textContent = img.title;
  if (catEl) catEl.textContent = capitalise(img.category);
  if (descEl) descEl.textContent = img.desc;
  if (counterEl) counterEl.textContent = (lightboxIndex + 1) + " / " + filteredImages.length;
}

// ============================================================
// Keyboard Navigation
// Arrow keys for next/prev, Escape to close
// ============================================================
document.addEventListener("keydown", function(e) {
  var lb = document.getElementById("lightbox");
  if (!lb || !lb.classList.contains("open")) return;

  if (e.key === "ArrowRight") { e.preventDefault(); showNextImage(); }
  if (e.key === "ArrowLeft")  { e.preventDefault(); showPrevImage(); }
  if (e.key === "Escape")     { closeLightbox(); }
});

// Close on backdrop click
document.addEventListener("click", function(e) {
  if (e.target.id === "lightbox") closeLightbox();
});

// ============================================================
// URL Query Param — pre-select category from link
// e.g. gallery.html?cat=nature
// ============================================================
function applyURLCategory() {
  var params = new URLSearchParams(window.location.search);
  var cat = params.get("cat");
  if (cat) setCategory(cat);
}

// ============================================================
// Helpers
// ============================================================
function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================================
// Init — called on DOMContentLoaded in gallery.html
// ============================================================
function initGallery() {
  renderGallery();
  applyURLCategory();

  // Search input listener
  var searchEl = document.getElementById("searchInput");
  if (searchEl) searchEl.addEventListener("input", handleSearch);
}
