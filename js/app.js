// Tropic Treasure - Single Page Application Router & Interaction Controller

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

// --- State Management ---
const AppState = {
  currentView: "home",
  activeProduct: null,
  activeJournalPost: null,
  glossaryFilter: "All",
  shopFilter: "All"
};

// --- Initialization ---
function initApp() {
  // Mobile Nav Toggle
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
    
    // Close menu when links are clicked
    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }

  // Routing setup
  window.addEventListener("hashchange", handleRouting);
  handleRouting(); // Run once for initial load

  // Global Event Listeners for Dynamic Modals & Buttons
  document.addEventListener("click", (e) => {
    // Product Detail triggers
    const detailBtn = e.target.closest("[data-action='view-product']");
    if (detailBtn) {
      const prodId = detailBtn.getAttribute("data-id");
      openProductModal(prodId);
    }
    
    // Modal Close
    if (e.target.closest("[data-action='close-modal']")) {
      closeAllModals();
    }
  });

  // Modal Backdrop Click
  const modalOverlay = document.getElementById("modal-overlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeAllModals();
      }
    });
  }

  // Scroll event for transparent header
  window.addEventListener("scroll", handleHeaderScroll);
}

// --- Header Scroll Controller ---
function handleHeaderScroll() {
  const header = document.getElementById("main-header");
  if (!header) return;
  if (AppState.currentView === "home") {
    if (window.scrollY > 50) {
      header.classList.remove("header-transparent");
    } else {
      header.classList.add("header-transparent");
    }
  } else {
    header.classList.remove("header-transparent");
  }
}

// --- Routing Controller ---
function handleRouting() {
  const hash = window.location.hash || "#/";
  let route = hash.replace("#/", "").replace("#", "");
  
  // Handle sub-routing checks (e.g. journal posts)
  if (route.startsWith("journal/")) {
    const postId = route.split("/")[1];
    AppState.activeJournalPost = postId;
    route = "journal-detail";
  } else {
    AppState.activeJournalPost = null;
  }

  AppState.currentView = route || "home";
  updateNavigationState();
  renderActiveView();
}

function updateNavigationState() {
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === `#/${AppState.currentView}` || (AppState.currentView === "home" && href === "#/")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function renderActiveView() {
  const viewport = document.getElementById("app-viewport");
  if (!viewport) return;

  // Add transition classes
  viewport.style.opacity = 0;
  
  setTimeout(() => {
    let htmlContent = "";
    
    switch (AppState.currentView) {
      case "home":
        htmlContent = renderHomeView();
        break;
      case "shop":
        htmlContent = renderShopView();
        break;
      case "wellness":
        htmlContent = renderWellnessView();
        break;
      case "ingredients":
        htmlContent = renderIngredientsView();
        break;
      case "trade":
        htmlContent = renderTradeView();
        break;
      case "our-story":
        htmlContent = renderStoryView();
        break;
      case "sustainability":
        htmlContent = renderSustainabilityView();
        break;
      case "journal":
        htmlContent = renderJournalListView();
        break;
      case "journal-detail":
        htmlContent = renderJournalDetailView();
        break;
      case "recipes":
        htmlContent = renderRecipesView();
        break;
      case "tastymonials":
        htmlContent = renderTastymonialsView();
        break;
      case "track":
        htmlContent = renderTrackView();
        break;
      case "contact":
        htmlContent = renderContactView();
        break;
      default:
        htmlContent = renderHomeView();
    }
    
    viewport.innerHTML = htmlContent;
    viewport.style.opacity = 1;
    
    // Scroll to top of viewport
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update header transparency
    handleHeaderScroll();

    // Initialize scripts/events bound to specific views
    initViewSpecificScripts();
  }, 200);
}

// --- Dynamic Modal Controls ---
function openProductModal(productId) {
  const product = PRODUCTS_DB.find(p => p.id === productId);
  if (!product) return;

  const overlay = document.getElementById("modal-overlay");
  const container = document.getElementById("modal-container");
  
  if (!overlay || !container) return;

  let specRows = "";
  for (const [key, val] of Object.entries(product.specs)) {
    specRows += `
      <div class="modal-spec-item">
        <div class="tech-label">${key}</div>
        <div class="tech-val">${val}</div>
      </div>
    `;
  }

  let bulletsList = "";
  product.bullets.forEach(b => {
    bulletsList += `<li>${b}</li>`;
  });

  container.innerHTML = `
    <button class="modal-close" data-action="close-modal" aria-label="Close modal">×</button>
    <div class="modal-product-grid">
      <div>
        <div class="image-frame">
          <img src="${product.image}" alt="${product.name}">
          <div class="img-caption">${product.caption}</div>
        </div>
        
        <div class="modal-product-specs">
          <div class="modal-spec-title">Technical Specification Box</div>
          <div class="modal-spec-grid">
            ${specRows}
          </div>
        </div>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
        <h4 style="margin-bottom: 0;">${product.scientificName}</h4>
        <h2 style="margin-bottom: 5px;">${product.name}</h2>
        <div class="product-origin" style="margin-bottom: 15px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
          Origin: ${product.origin}
        </div>
        
        <div class="product-price" style="font-size: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 10px;">${product.price} <span style="font-size: 0.9rem; font-family: var(--font-sans); color: var(--color-text-light); font-weight: normal;">/ ${product.unit}</span></div>
        
        <h3 style="font-size: 1.15rem; margin-top: 10px;">Sourcing Story</h3>
        <p style="font-size: 0.9rem; color: var(--color-text-light);">${product.sourcingStory}</p>
        
        <h3 style="font-size: 1.15rem;">Usage & Formulation</h3>
        <p style="font-size: 0.9rem; color: var(--color-text-light);">${product.usage}</p>

        <h3 style="font-size: 1.15rem;">Sourcing Verification</h3>
        <ul style="font-size: 0.9rem; color: var(--color-text-light); padding-left: 20px; display: flex; flex-direction: column; gap: 6px;">
          ${bulletsList}
        </ul>

        <div style="background-color: var(--color-white); padding: 15px; border: 1px solid var(--color-border); margin-top: 15px; display: flex; align-items: center; gap: 15px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-forest)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div>
            <div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase;">Batch Traceability Code</div>
            <div style="font-family: monospace; font-size: 0.95rem; color: var(--color-spice); font-weight: bold;">${product.traceabilityCode}</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 15px;">
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary" style="flex: 1;" onclick="simulateAddToCart('${product.name}')">Secure Order</button>
            <a href="#/trade" class="btn btn-secondary" style="flex: 1; border-color: var(--color-border-dark);" onclick="closeAllModals()">Wholesale Enquiry</a>
          </div>
          ${product.pdfUrl ? `
            <a href="${product.pdfUrl}" target="_blank" class="btn btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 8px; border-color: var(--color-border-dark);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              Download PDF Sourcing Profile
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeAllModals() {
  const overlay = document.getElementById("modal-overlay");
  if (overlay) overlay.classList.remove("open");
  document.body.style.overflow = "auto";
}

let globalCartCount = 0;
function simulateAddToCart(prodName) {
  globalCartCount++;
  const badge = document.getElementById("cart-badge-count");
  if (badge) {
    badge.textContent = globalCartCount;
    badge.style.transform = "scale(1.3)";
    badge.style.transition = "transform 0.15s ease-out";
    setTimeout(() => {
      badge.style.transform = "scale(1)";
    }, 150);
  }
  showToast(`Added ${prodName} to Cart. Tropic Treasure packaging preserves peak essential oils.`);
}

function showToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.position = "fixed";
    container.style.bottom = "30px";
    container.style.right = "30px";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.style.backgroundColor = "var(--color-forest)";
  toast.style.color = "var(--color-sand)";
  toast.style.padding = "16px 24px";
  toast.style.borderLeft = "4px solid var(--color-spice)";
  toast.style.fontFamily = "var(--font-sans)";
  toast.style.fontSize = "0.85rem";
  toast.style.letterSpacing = "0.02em";
  toast.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
  toast.style.display = "flex";
  toast.style.alignItems = "center";
  toast.style.gap = "12px";
  toast.style.maxWidth = "400px";
  toast.style.animation = "fadeInUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-spice)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
    <div>${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = 0;
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.4s ease";
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4000);
}

// --- View Specific Event Initializations ---
function initViewSpecificScripts() {
  // 1. Traceability Portal Form
  const traceFormBtn = document.getElementById("trace-search-btn");
  const traceInput = document.getElementById("trace-code-input");
  
  if (traceFormBtn && traceInput) {
    const handleTraceLookup = () => {
      const code = traceInput.value.trim().toUpperCase();
      performTraceabilityLookup(code);
    };

    traceFormBtn.addEventListener("click", handleTraceLookup);
    traceInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleTraceLookup();
    });
  }

  // 2. Shop Categories filters
  const shopFilters = document.querySelectorAll(".shop-filter-btn");
  shopFilters.forEach(btn => {
    btn.addEventListener("click", (e) => {
      shopFilters.forEach(f => f.classList.remove("btn-primary"));
      shopFilters.forEach(f => f.classList.add("btn-secondary"));
      btn.classList.remove("btn-secondary");
      btn.classList.add("btn-primary");
      
      AppState.shopFilter = btn.getAttribute("data-filter");
      filterShopProducts();
    });
  });

  // Populate home product grid on load
  filterHomeProducts();

  // 3. Glossary filters
  const glossaryFilters = document.querySelectorAll(".glossary-filter-btn");
  glossaryFilters.forEach(btn => {
    btn.addEventListener("click", () => {
      glossaryFilters.forEach(f => f.classList.remove("btn-primary"));
      glossaryFilters.forEach(f => f.classList.add("btn-secondary"));
      btn.classList.remove("btn-secondary");
      btn.classList.add("btn-primary");

      AppState.glossaryFilter = btn.getAttribute("data-filter");
      filterGlossaryItems();
    });
  });
  
  const glossarySearch = document.getElementById("glossary-search");
  if (glossarySearch) {
    glossarySearch.addEventListener("input", filterGlossaryItems);
  }

  // 4. Trade Enquiry Submission Form
  const tradeForm = document.getElementById("trade-enquiry-form");
  if (tradeForm) {
    tradeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      simulateFormSubmission("Wholesale Enquiry received. Our UK-based trade compliance supervisor will review and contact you within 4 hours.");
      tradeForm.reset();
    });
  }

  // 5. General Contact Form
  const contactForm = document.getElementById("contact-general-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      simulateFormSubmission("Message successfully sent. Thank you for connecting with Tropic Treasure.");
      contactForm.reset();
    });
  }

  // 6. Dynamic Trade Freight Estimator (Trade Page Only)
  initTradeFreighter();

  // 7. Shop Page Packaging Mockup Switcher
  const pouchBtns = document.querySelectorAll(".pouch-option-btn");
  pouchBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      pouchBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const type = btn.getAttribute("data-type");
      
      const img = document.getElementById("pouch-mockup-img");
      const title = document.getElementById("pouch-mockup-title");
      const desc = document.getElementById("pouch-mockup-desc");
      const points = document.getElementById("pouch-mockup-points");
      
      if (img && title && desc && points) {
        if (type === "colorful") {
          img.src = "images/pouch_showcase.png";
          title.textContent = "Signature Colorful Pouches";
          desc.textContent = "Elegant standing pouches featuring vibrant, spice-themed colors (red, yellow, green) with clean branding and clear ingredient windows.";
          points.innerHTML = `
            <li><strong>Aesthetic:</strong> Harmonious color palettes matching the spice's nature.</li>
            <li><strong>Barrier Level:</strong> High-performance light and moisture barrier.</li>
            <li><strong>Best For:</strong> Retail shelves and culinary display setups.</li>
          `;
        } else {
          img.src = "images/kraft_pouches.png";
          title.textContent = "The Urban Kraft Pouches";
          desc.textContent = "Minimalist kraft paper standing pouches with rich solid blue labels, clean typography, and a rustic aesthetic.";
          points.innerHTML = `
            <li><strong>Aesthetic:</strong> Organic kraft paper with premium typography labels.</li>
            <li><strong>Eco Factor:</strong> 100% compostable and recyclable paperboard.</li>
            <li><strong>Best For:</strong> High-end wellness grocers and organic gift ranges.</li>
          `;
        }
      }
    });
  });

  // 8. Recipe Submission Form
  const recipeForm = document.getElementById("recipe-submission-form");
  if (recipeForm) {
    recipeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("recipe-name").value.trim();
      const subtitle = document.getElementById("recipe-subtitle").value.trim();
      const category = document.getElementById("recipe-category").value;
      const excerpt = document.getElementById("recipe-excerpt").value.trim();
      const prepTime = document.getElementById("recipe-prep").value.trim();
      const cookTime = document.getElementById("recipe-cook").value.trim();
      const difficulty = document.getElementById("recipe-diff").value;
      const desc = document.getElementById("recipe-desc").value.trim();
      const ingString = document.getElementById("recipe-ing").value.trim();
      const stepString = document.getElementById("recipe-steps").value.trim();
      
      const ingredients = ingString.split("\n").map(i => i.trim()).filter(i => i);
      const steps = stepString.split("\n").map(s => s.trim()).filter(s => s);
      
      const newRecipe = {
        id: "recipe-" + Date.now(),
        title: name,
        subtitle: subtitle,
        category: category.toUpperCase(),
        excerpt: excerpt,
        author: "Guest Chef (Community Contributor)",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: "5 min read",
        image: "images/stuffed_bell_pepper.png", // default to recipe image
        caption: `Homemade ${name} seasoned with Tropic Treasure aromatic spices.`,
        prepTime: prepTime || "15 Mins",
        cookTime: cookTime || "15 Mins",
        difficulty: difficulty,
        description: desc,
        ingredients: ingredients,
        steps: steps
      };
      
      saveRecipe(newRecipe);
      showToast("Recipe added successfully! Rendered under the community directory.");
      recipeForm.reset();
      AppState.activeRecipeId = newRecipe.id;
      renderActiveView(); // Re-render page
    });
  }

  // 9. Testimonial Submission Form
  const testForm = document.getElementById("testimonial-submission-form");
  if (testForm) {
    testForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const author = document.getElementById("test-author").value.trim();
      const rating = parseInt(document.getElementById("test-rating").value);
      const title = document.getElementById("test-title").value.trim();
      const text = document.getElementById("test-text").value.trim();
      const product = document.getElementById("test-product").value;
      const location = document.getElementById("test-location").value.trim();
      
      const newTestimonial = {
        id: "test-" + Date.now(),
        rating: rating,
        title: title,
        text: text,
        author: author,
        product: product,
        location: location || "UK",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      
      saveTestimonial(newTestimonial);
      showToast("Thank you! Your Tastymonial has been saved in our database.");
      testForm.reset();
      renderActiveView(); // Re-render page
    });
  }

  // 10. Recipe Category Tabs Switcher
  const recipeTabs = document.querySelectorAll(".recipe-tab-btn");
  recipeTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      recipeTabs.forEach(t => t.classList.remove("btn-primary"));
      recipeTabs.forEach(t => t.classList.add("btn-secondary"));
      tab.classList.remove("btn-secondary");
      tab.classList.add("btn-primary");
      
      const filter = tab.getAttribute("data-filter");
      filterRecipesGrid(filter);
    });
  });
}

function simulateFormSubmission(successMsg) {
  showToast(successMsg);
}

// --- Trade Cargo Weight Estimator Logic ---
function initTradeFreighter() {
  const inputWeight = document.getElementById("freight-weight");
  const estimateBtn = document.getElementById("calc-freight-btn");
  const resultPanel = document.getElementById("freight-results");
  
  if (inputWeight && estimateBtn && resultPanel) {
    estimateBtn.addEventListener("click", () => {
      const w = parseFloat(inputWeight.value);
      if (isNaN(w) || w <= 0) {
        showToast("Please enter a valid weight in kilograms.");
        return;
      }
      
      let method = "Sea Freight Consolidation (LCL)";
      let transit = "24-28 days (Cochin to London Gateway)";
      let packaging = "Multi-wall kraft paper valve bags, palletized and shrink-wrapped";
      let compliance = "UK customs commodity codes mapped, DEFRA notification filed";

      if (w < 200) {
        method = "Air Freight Cargo (Priority)";
        transit = "5-7 days (Cochin Int'l Airport to London Heathrow)";
        packaging = "High-barrier vacuum chambers packed in impact-tested cardboard crates";
      } else if (w >= 10000) {
        method = "Full Container Load (FCL 20ft Dry Van)";
        transit = "21 days (Port of Cochin to Port of Felixstowe direct)";
        packaging = "Full moisture-locked interior container lining, standard pallets";
      }

      resultPanel.innerHTML = `
        <h4 style="color: var(--color-forest); font-size: 0.9rem; margin-bottom: 12px; border-bottom: 1px solid var(--color-border); padding-bottom: 5px;">Estimated Sourcing Transit Logs</h4>
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.82rem;">
          <div><strong style="color: var(--color-forest);">Logistics Protocol:</strong> ${method}</div>
          <div><strong style="color: var(--color-forest);">Transit Duration:</strong> ${transit}</div>
          <div><strong style="color: var(--color-forest);">Preservation Packaging:</strong> ${packaging}</div>
          <div><strong style="color: var(--color-forest);">Operational Compliance:</strong> ${compliance}</div>
        </div>
      `;
      resultPanel.style.display = "block";
    });
  }
}

// --- Interactive Sourcing Batch Tracker logic ---
function performTraceabilityLookup(code) {
  const resultViewport = document.getElementById("trace-result-viewport");
  if (!resultViewport) return;

  const data = TRACEABILITY_LOGS[code];
  if (!data) {
    resultViewport.innerHTML = `
      <div style="padding: 30px; text-align: center; border: 1px dashed var(--color-border); background-color: var(--color-sand);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" style="margin-bottom: 10px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h3 style="font-size: 1.15rem; color: #cc0000; margin-bottom: 5px;">Traceability Code Unresolved</h3>
        <p style="font-size: 0.85rem; color: var(--color-text-light);">We could not find active shipping logs matching code <strong>"${code}"</strong>. Check the product label and try again. Active demo codes: <strong>TT-TBP-041</strong> or <strong>TT-GCD-082</strong>.</p>
      </div>
    `;
    return;
  }

  let timelineHtml = "";
  data.transitLog.forEach(log => {
    timelineHtml += `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-date">${log.date}</div>
          <div class="timeline-text">${log.status}</div>
        </div>
      </div>
    `;
  });

  resultViewport.innerHTML = `
    <div class="trace-results">
      <div class="trace-header">
        <div>
          <h3>Batch ${data.batch} : Sourcing Ledger</h3>
          <p style="font-size: 0.8rem; color: var(--color-text-light); margin-bottom: 0;">Product: <strong>${data.product}</strong></p>
        </div>
        <span class="trace-tag">UK Verification Active</span>
      </div>
      
      <div class="trace-grid">
        <div class="trace-spec-box">
          <h4>Sourcing Credentials</h4>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.8rem;">
            <div><span class="tech-label">Farming Cooperative:</span> <span class="tech-val" style="display:block;">${data.farmerGroup}</span></div>
            <div><span class="tech-label">Harvest Period:</span> <span class="tech-val" style="display:block;">${data.harvestDate}</span></div>
            <div><span class="tech-label">Dehydration Standard:</span> <span class="tech-val" style="display:block;">${data.dryingMethod} (${data.dryingDate})</span></div>
            <div><span class="tech-label">Purity Protocol:</span> <span class="tech-val" style="display:block;">${data.purityTest}</span></div>
          </div>
        </div>
        
        <div class="trace-spec-box">
          <h4>Analytical Lab Profile</h4>
          <div style="display: flex; flex-direction: column; gap: 5px; font-size: 0.8rem; margin-bottom: 12px;">
            <div style="display:flex; justify-content:space-between;"><span>Piperine/Volatiles:</span> <strong>${data.chemicalProfile["Piperine Concentration"] || data.chemicalProfile["Volatile Oil Density"]}</strong></div>
            <div style="display:flex; justify-content:space-between;"><span>Moisture Content:</span> <strong>${data.chemicalProfile.Moisture}</strong></div>
            <div style="display:flex; justify-content:space-between;"><span>Aflatoxins:</span> <strong>${data.contaminants.Aflatoxins}</strong></div>
            <div style="display:flex; justify-content:space-between;"><span>Pesticide Screening:</span> <strong style="color: green;">${data.contaminants["Pesticide Residues"]}</strong></div>
            <div style="display:flex; justify-content:space-between;"><span>Heavy Metals:</span> <strong>${data.contaminants["Lead / Heavy Metals"] || "Undetected"}</strong></div>
          </div>
          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.65rem; width:100%;" onclick="simulatePDFDownload('${data.batch}')">Download Certificate of Analysis (COA) PDF</button>
        </div>
      </div>

      <div class="trace-spec-box" style="margin-bottom: 20px;">
        <h4>Sea Freight & Logistics Ledger</h4>
        <div class="trace-timeline">
          ${timelineHtml}
        </div>
      </div>
    </div>
  `;
}

function simulatePDFDownload(batchNum) {
  showToast(`Initiating download for COA Certificate - Batch ${batchNum}. Authentic lab profiles verified.`);
}

// --- Shop Products Filter logic ---
function filterShopProducts() {
  const container = document.getElementById("shop-products-grid");
  if (!container) return;

  const filtered = PRODUCTS_DB.filter(p => {
    if (AppState.shopFilter === "All") return true;
    return p.category === AppState.shopFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; padding: 40px; text-align: center; border: 1px dashed var(--color-border);">
        <p>No products available in this category for this season. Check back soon for fresh harvests.</p>
      </div>
    `;
    return;
  }

  let productsHtml = "";
  filtered.forEach(p => {
    let techRows = "";
    // Display 3 interesting specs on card
    const keys = Object.keys(p.specs).slice(0, 3);
    keys.forEach(k => {
      techRows += `
        <div class="product-tech-row">
          <span class="tech-label">${k}</span>
          <span class="tech-val">${p.specs[k]}</span>
        </div>
      `;
    });

    productsHtml += `
      <div class="product-card fade-in-up">
        <div class="product-card-img-wrapper">
          <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="product-origin">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
          ${p.origin}
        </div>
        <h3 class="product-card-title">${p.name}</h3>
        <p class="product-card-tagline">${p.tagline}</p>
        
        <div class="product-tech-specs">
          ${techRows}
        </div>

        <div class="product-card-footer">
          <span class="product-price">${p.price}</span>
          <button class="btn btn-secondary" style="padding: 8px 16px; font-size: 0.7rem; border-color: var(--color-forest);" data-action="view-product" data-id="${p.id}">View Sourcing Proof</button>
        </div>
      </div>
    `;
  });

  container.innerHTML = productsHtml;
}

// --- Home Products Renderer (shows all products) ---
function filterHomeProducts() {
  const container = document.getElementById("home-products-grid");
  if (!container) return;

  const products = PRODUCTS_DB;
  let html = "";

  products.forEach(p => {
    // Generate star rating string
    let starsHtml = "";
    const fullStars = Math.floor(p.rating);
    const hasHalf = p.rating % 1 !== 0;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHtml += "★";
      } else if (i === fullStars && hasHalf) {
        starsHtml += "★";
      } else {
        starsHtml += "☆";
      }
    }

    // Pricing display (strikethrough original price if present)
    let priceHtml = "";
    if (p.originalPrice) {
      priceHtml = `
        <span class="product-price">${p.price}</span>
        <span class="product-price-original">${p.originalPrice}</span>
      `;
    } else {
      priceHtml = `<span class="product-price">${p.price}</span>`;
    }

    // Discount badge
    const discountBadgeHtml = p.discount
      ? `<div class="product-discount-badge">${p.discount}</div>`
      : "";

    // PDF download button
    const pdfBtnHtml = p.pdfUrl ? `
      <a href="${p.pdfUrl}" target="_blank" class="btn btn-secondary card-btn-pdf" title="Download Product PDF Profile"
         style="width: 100%; padding: 10px 14px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 0.7rem; border-color: var(--color-border-dark);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        Download PDF Sourcing Profile
      </a>
    ` : "";

    html += `
      <div class="product-card fade-in-up">
        <div class="product-card-img-wrapper" style="border-radius: 16px; overflow: hidden; position: relative; background-color: #E6DFD5; height: 270px; border: none;">
          ${discountBadgeHtml}
          <img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:contain; padding: 25px; transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);">
        </div>
        <div style="padding-top: 16px; display: flex; flex-direction: column; flex-grow: 1;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px; font-size: 0.9rem; color: #D4AF37;">
            <span>${starsHtml}</span>
            <span style="color: var(--color-text-light); font-size: 0.75rem; font-family: var(--font-sans); font-weight: 500;">${p.reviewsCount} reviews</span>
          </div>
          <h3 class="product-card-title" style="font-size: 1.25rem; margin-bottom: 4px;">${p.name}</h3>
          <p class="product-card-tagline" style="flex-grow: 1; margin-bottom: 14px;">${p.tagline}</p>

          <div style="margin-bottom: 16px; font-family: var(--font-serif); font-weight: 600; font-size: 1.15rem; display: flex; align-items: baseline; flex-wrap: wrap; gap: 2px;">
            ${priceHtml}
            <span style="font-size: 0.78rem; color: var(--color-text-light); font-weight: normal; font-family: var(--font-sans); margin-left: 4px;">/ ${p.unit}</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-primary" onclick="simulateAddToCart('${p.name}')" style="flex: 1; padding: 10px 12px; font-size: 0.68rem;">Secure Order</button>
              <button class="btn btn-secondary" data-action="view-product" data-id="${p.id}" style="flex: 1; padding: 10px 12px; font-size: 0.68rem; border-color: var(--color-border-dark);">Sourcing Proof</button>
            </div>
            ${pdfBtnHtml}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// --- Glossary Filter logic ---
function filterGlossaryItems() {
  const container = document.getElementById("glossary-results-grid");
  const searchInput = document.getElementById("glossary-search");
  if (!container) return;

  const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const filtered = GLOSSARY_DB.filter(item => {
    const matchesCategory = (AppState.glossaryFilter === "All" || item.role.includes(AppState.glossaryFilter) || (AppState.glossaryFilter === "Essential Oils" && item.type.includes("Essential")) || (AppState.glossaryFilter === "Spices" && item.type.includes("Spice")));
    const matchesSearch = (item.name.toLowerCase().includes(searchQuery) || item.botanical.toLowerCase().includes(searchQuery) || item.description.toLowerCase().includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; padding: 40px; text-align: center; border: 1px dashed var(--color-border);">
        <p>No botanical profiles match your active filters.</p>
      </div>
    `;
    return;
  }

  let glossaryHtml = "";
  filtered.forEach(item => {
    glossaryHtml += `
      <div class="glossary-card fade-in-up">
        <div class="glossary-card-header">
          <div>
            <h3 class="glossary-title">${item.name}</h3>
            <div class="glossary-botanical">${item.botanical}</div>
          </div>
          <span class="glossary-tag">${item.type}</span>
        </div>
        
        <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
          <div class="glossary-meta-row">
            <span class="glossary-meta-label">Primary Active Marker:</span>
            <span class="glossary-meta-value" style="color:var(--color-spice);">${item.marker}</span>
          </div>
          <div class="glossary-meta-row">
            <span class="glossary-meta-label">Sourcing Region:</span>
            <span class="glossary-meta-value">${item.region}</span>
          </div>
          <div class="glossary-meta-row">
            <span class="glossary-meta-label">Functional Role:</span>
            <span class="glossary-meta-value">${item.role}</span>
          </div>
        </div>

        <p class="glossary-description">${item.description}</p>
      </div>
    `;
  });

  container.innerHTML = glossaryHtml;
}

// --- RENDERERS FOR SPA VIEWS ---

// 1. Home View Renderer
function renderHomeView() {
  let featuredProductsHtml = "";
  // Render first 3 products for homepage preview
  const previewProds = PRODUCTS_DB.slice(0, 3);
  previewProds.forEach(p => {
    let techRows = "";
    const keys = Object.keys(p.specs).slice(0, 2);
    keys.forEach(k => {
      techRows += `
        <div class="product-tech-row">
          <span class="tech-label">${k}</span>
          <span class="tech-val">${p.specs[k]}</span>
        </div>
      `;
    });

    featuredProductsHtml += `
      <div class="product-card">
        <div class="product-card-img-wrapper">
          <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="product-origin">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
          ${p.origin}
        </div>
        <h3 class="product-card-title">${p.name}</h3>
        <p class="product-card-tagline">${p.tagline}</p>
        <div class="product-tech-specs">
          ${techRows}
        </div>
        <div class="product-card-footer">
          <span class="product-price">${p.price}</span>
          <button class="btn btn-secondary" style="padding: 8px 16px; font-size: 0.7rem;" data-action="view-product" data-id="${p.id}">View Sourcing Proof</button>
        </div>
      </div>
    `;
  });

  let journalPreviewHtml = "";
  JOURNAL_DB.slice(0, 2).forEach(post => {
    journalPreviewHtml += `
      <div class="journal-item">
        <div class="journal-meta">
          <span>${post.date}</span>
          <span>${post.readTime}</span>
        </div>
        <h3 class="journal-title">${post.title}</h3>
        <p class="journal-excerpt">${post.excerpt}</p>
        <a href="#/journal/${post.id}" class="btn-text" style="align-self: flex-start;">Read Sourcing Narrative →</a>
      </div>
    `;
  });

  return `
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content-fullscreen">
          <span class="hero-volume">VOLUME I &middot; ORIGIN EDITION</span>
          <h1 class="hero-headline">
            Integrity in Sourcing.<br>
            <span class="hero-headline-italic">A Direct Link</span> from the Western Ghats to the UK.
          </h1>
          <p class="hero-description">Rooted in Kerala's heritage and shared from the UK, Tropic Treasure delivers premium spices, wellness ingredients, and botanical products with full traceability and UK-ready quality assurance.</p>
          <div class="hero-btn-group">
            <a href="#/shop" class="btn-hero-primary">Shop Collection <span style="font-family: var(--font-sans); margin-left: 5px;">&rarr;</span></a>
            <a href="#/trade" class="btn-hero-secondary">Request Trade Portfolio</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Dual Entity Infographic Section -->
    <section class="infographic-section section-padding">
      <div class="container">
        <div class="text-center" style="max-width: 750px; margin: 0 auto var(--spacing-lg) auto;">
          <h4>The Tropic Treasure Structure</h4>
          <h2>One company. Two entities. Zero middlemen.</h2>
          <p class="lead">By owning both sourcing at origin and compliance verification in the UK, we eliminate third-party consolidators and guarantee uncompromised purity.</p>
        </div>
        
        <div class="infographic-wrapper">
          <div class="info-flow">
            <div class="info-node">
              <div class="info-node-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <span class="tag">01 - INDIA</span>
              <h3>Kerala Office</h3>
              <p style="font-weight:600; color:var(--color-forest); font-size:0.75rem; margin-bottom:8px;">Sourcing & Selection</p>
              <p>Direct relationships with growers across Wayanad, Idukki and Kollam.</p>
            </div>
            
            <div class="info-connector">
              <div class="connector-line"></div>
              <span class="info-connector-label">Transit</span>
            </div>
            
            <div class="info-node">
              <div class="info-node-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <span class="tag">02 - TRANSIT</span>
              <h3>Sea Freight</h3>
              <p style="font-weight:600; color:var(--color-forest); font-size:0.75rem; margin-bottom:8px;">Temperature Lock</p>
              <p>Climate-controlled containers, tamper-evident batch coding, end-to-end documentation.</p>
            </div>
            
            <div class="info-connector">
              <div class="connector-line"></div>
              <span class="info-connector-label">Clearance</span>
            </div>
            
            <div class="info-node">
              <div class="info-node-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <span class="tag">03 - UNITED KINGDOM</span>
              <h3>UK Office</h3>
              <p style="font-weight:600; color:var(--color-forest); font-size:0.75rem; margin-bottom:8px;">Compliance & Fulfilment</p>
              <p>Every batch cleared against UK Food Standards, with London laboratory safety verification.</p>
            </div>
          </div>
          <div class="text-center" style="margin-top: 25px;">
            <div class="img-caption" style="border:none; margin:0; display:inline-block;">Our dual-entity structure eliminates middlemen, ensuring full traceability from Kerala's soil to British shelves.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Four Divisions Grid Section -->
    <section class="section-padding" style="background-color: var(--color-white); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div class="text-center" style="max-width: 750px; margin: 0 auto var(--spacing-lg) auto;">
          <h4>Future-Ready Channels</h4>
          <h2>Four divisions. One standard.</h2>
          <p class="lead">Operating across four dedicated sourcing channels to support premium wellness, culinary craft, and industrial commodity expansions.</p>
        </div>
        
        <div class="divisions-flex-container">
          <div class="division-flex-card" data-index="1">
            <div class="division-card-content">
              <div class="division-num">01</div>
              <div>
                <h3 class="division-title">Core Spices & Culinary</h3>
                <p class="division-desc">Pepper, cardamom, cloves and culinary essentials, single-origin from Kerala estates.</p>
              </div>
            </div>
          </div>
          
          <div class="division-flex-card" data-index="2">
            <div class="division-card-content">
              <div class="division-num">02</div>
              <div>
                <h3 class="division-title">Herbal Wellness</h3>
                <p class="division-desc">Moringa, ginger, turmeric and adaptogenic botanicals processed for potency.</p>
              </div>
            </div>
          </div>
          
          <div class="division-flex-card" data-index="3">
            <div class="division-card-content">
              <div class="division-num">03</div>
              <div>
                <h3 class="division-title">Industrial Ingredients</h3>
                <p class="division-desc">Bulk-format spice blends, oleoresins and food-grade powders for UK manufacturers.</p>
              </div>
            </div>
          </div>
          
          <div class="division-flex-card" data-index="4">
            <div class="division-card-content">
              <div class="division-num">04</div>
              <div>
                <h3 class="division-title">Dehydrated Food Tech</h3>
                <p class="division-desc">Low-temperature dried botanicals engineered for clean-label formulations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Commitment to Quality — Full Bleed Immersive -->
    <section class="protocol-hero">
      <div class="protocol-hero-bg">
        <img src="images/farmer_hands.png" alt="Farmer hands — direct sourcing" class="protocol-hero-img">
        <div class="protocol-hero-overlay"></div>
      </div>

      <div class="protocol-hero-inner">
        <!-- Header -->
        <div class="protocol-hero-header">
          <span class="protocol-hero-eyebrow">Commitment to Quality</span>
          <h2 class="protocol-hero-title">The Soil-to-Shelf <em>Protocol</em></h2>
          <p class="protocol-hero-lead">Three commitments. Verified at every batch.</p>
        </div>

        <!-- Three commitment strips -->
        <div class="protocol-cards">

          <!-- Card 01 -->
          <div class="protocol-card">
            <div class="protocol-card-accent"></div>
            <div class="protocol-card-ghost-num">01</div>
            <div class="protocol-card-inner">
              <div class="protocol-card-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <h3 class="protocol-card-title">Direct Sourcing</h3>
              <p class="protocol-card-desc">Fair pricing and long-term farmer relationships. We pay growers above mandi rates and commit to multi-season offtake — the grower's name is on every file.</p>
              <div class="protocol-card-tag">Farm Gate</div>
            </div>
          </div>

          <!-- Card 02 -->
          <div class="protocol-card">
            <div class="protocol-card-accent"></div>
            <div class="protocol-card-ghost-num">02</div>
            <div class="protocol-card-inner">
              <div class="protocol-card-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
              </div>
              <h3 class="protocol-card-title">Scientific Verification</h3>
              <p class="protocol-card-desc">Independent laboratory testing for residues, contaminants, and active-compound profiles — published per batch. HPLC and GC-MS analysed at source and UK entry.</p>
              <div class="protocol-card-tag">Lab Verified</div>
            </div>
          </div>

          <!-- Card 03 -->
          <div class="protocol-card">
            <div class="protocol-card-accent"></div>
            <div class="protocol-card-ghost-num">03</div>
            <div class="protocol-card-inner">
              <div class="protocol-card-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <h3 class="protocol-card-title">Full Traceability</h3>
              <p class="protocol-card-desc">Batch-coded sourcing from farm to shelf. Every jar carries a code that maps back to estate, harvest week and lab report. Scan. Verify. Trust.</p>
              <div class="protocol-card-tag">Batch Coded</div>
            </div>
          </div>

        </div>


        <div class="protocol-hero-footer">
          <a href="#/our-story" class="btn btn-primary" style="background-color: var(--color-spice); color: var(--color-forest); border: none; font-weight: 700; padding: 16px 36px;">Explore Sourcing Heritage</a>
          <a href="#/track" class="btn btn-secondary" style="border-color: rgba(255,255,255,0.35); color: var(--color-white); padding: 16px 36px;">Track a Batch →</a>
        </div>
      </div>
    </section>




    <!-- Conscious Consumption Section -->
    <section class="conscious-section section-padding">
      <div class="container">
        <h4>Mindful Commerce</h4>
        <div class="conscious-quote">
          Every ingredient tells a story — of soil, climate, hands, systems, and choices. Tropic Treasure exists to reconnect people with that story.
        </div>
        <p class="conscious-subtext">We invite you to think deeply about what you consume. Sourcing is not just commerce; it is an ecological contract between farmers, logistics routes, and consumers.</p>
      </div>
    </section>



    <!-- Trade & Wholesale Section -->
    <!-- Trade & Wholesale Section (Redesigned Editorial Split) -->
    <section style="background-color: var(--color-forest); color: var(--color-white); border-bottom: 1px solid var(--color-border); overflow: hidden;">
      <div style="display: flex; flex-wrap: wrap;">
        <!-- Left Content Pane -->
        <div style="flex: 1 1 500px; padding: 100px 8%; display: flex; flex-direction: column; justify-content: center;">
          <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 30px;">
            <div style="width: 40px; height: 1px; background-color: var(--color-spice);"></div>
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.25em; font-weight: 700; color: var(--color-spice);">For buyers, importers & manufacturers</span>
          </div>
          <h2 style="font-size: clamp(2.5rem, 4vw, 3.8rem); line-height: 1.1; margin-bottom: 30px; color: var(--color-white); font-family: var(--font-serif); font-weight: 400;">Looking for a UK-ready sourcing partner?</h2>
          <p style="font-size: 1.15rem; color: rgba(249, 248, 244, 0.75); line-height: 1.7; margin-bottom: 50px; max-width: 500px;">Download our 2026 Origin & Compliance Report, or book a 30-minute consultation with our trade team in London.</p>
          
          <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <button onclick="simulatePDFDownload('Origin_Compliance_Report_2026')" class="btn" style="background-color: var(--color-spice); border: 1px solid var(--color-spice); color: var(--color-forest); font-weight: 700; padding: 18px 40px; border-radius: 4px;">Download 2026 Report</button>
            <a href="#/trade" class="btn btn-secondary" style="border: 1px solid rgba(255,255,255,0.25); color: var(--color-white); padding: 18px 40px; background: transparent; border-radius: 4px; transition: var(--transition-smooth);">Contact Trade Team</a>
          </div>
        </div>
        <!-- Right Image Pane -->
        <div style="flex: 1 1 500px; min-height: 500px; position: relative;">
           <img src="images/trade_warehouse.png" alt="Warehouse logistics" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;">
           <div style="position: absolute; inset: 0; background: linear-gradient(to right, var(--color-forest) 0%, transparent 25%);"></div>
        </div>
      </div>
    </section>
  `;
}

// 2. Shop View Renderer
function renderShopView() {
  return `
    <section class="section-padding" style="background-color: var(--color-sand); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div class="text-center" style="max-width: 800px; margin: 0 auto var(--spacing-md) auto;">
          <h4>The Sourcing Portfolio</h4>
          <h2>Conscious Ingredient Collection</h2>
          <p class="lead">Grown sustainably, harvested at peak physiological maturity, and verified in UK laboratories. Click "View Sourcing Proof" on any item to view its complete specifications.</p>
        </div>
        
        <!-- Filter Bar -->
        <div class="glossary-filter-bar">
          <button class="btn btn-primary shop-filter-btn" data-filter="All">All Harvests</button>
          <button class="btn btn-secondary shop-filter-btn" data-filter="Dehydrated Ingredients">Dehydrated Ingredients</button>
          <button class="btn btn-secondary shop-filter-btn" data-filter="Herbal Wellness">Herbal Wellness</button>
          <button class="btn btn-secondary shop-filter-btn" data-filter="Lifestyle & Craft">Lifestyle & Craft</button>
        </div>

        <div class="grid-3" id="shop-products-grid" style="margin-top: var(--spacing-md);">
          <!-- Loaded Dynamically by filterShopProducts() -->
        </div>
      </div>
    </section>

    <!-- Interactive Packaging Showcase (Pouch Showcases) -->
    <section class="pouch-showcase-section">
      <div class="container">
        <div class="text-center" style="max-width: 800px; margin: 0 auto var(--spacing-lg) auto;">
          <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.25em; color: var(--color-spice); font-weight: 600; display: block; margin-bottom: 10px;">Preservation Packaging</span>
          <h2>Aesthetic & Active Protection</h2>
          <p style="color: rgba(249, 248, 244, 0.85); font-size: 1.1rem; line-height: 1.6;">We match premium botanicals with barrier-grade standing pouches designed for both aesthetic impact and maximum protection of volatile compounds.</p>
        </div>

        <div class="pouch-toggle-container">
          <button class="pouch-option-btn active" data-type="colorful">Signature Colorful Pouches</button>
          <button class="pouch-option-btn" data-type="kraft">The Urban Kraft Pouches</button>
        </div>

        <div class="pouch-gallery-grid">
          <div class="pouch-mockup-wrapper">
            <img id="pouch-mockup-img" src="images/pouch_showcase.png" alt="Spice Pouches Mockup">
          </div>
          
          <div style="display: flex; flex-direction: column; gap: var(--spacing-md); justify-content: center; font-family: var(--font-sans);">
            <h3 id="pouch-mockup-title" style="color: var(--color-white); font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 5px;">Signature Colorful Pouches</h3>
            <p id="pouch-mockup-desc" style="color: rgba(249, 248, 244, 0.75); font-size: 0.95rem; line-height: 1.6;">Elegant standing pouches featuring vibrant, spice-themed colors (red, yellow, green) with clean branding and clear ingredient windows.</p>
            
            <ul id="pouch-mockup-points" style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 15px; font-size: 0.88rem; color: rgba(249, 248, 244, 0.85);">
              <li><strong style="color: var(--color-spice);">Aesthetic:</strong> Harmonious color palettes matching the spice's nature.</li>
              <li><strong style="color: var(--color-spice);">Barrier Level:</strong> High-performance light and moisture barrier.</li>
              <li><strong style="color: var(--color-spice);">Best For:</strong> Retail shelves and culinary display setups.</li>
            </ul>
          </div>
        </div>

      </div>
    </section>

    <!-- Interactive Quality Banner -->
    <section class="section-padding" style="background-color: var(--color-forest); color: var(--color-sand);">
      <div class="container">
        <div class="grid-2" style="align-items: center;">
          <div>
            <h2 style="color: var(--color-white); margin-bottom: 15px;">Packed at Origin, Protected by Science</h2>
            <p style="color: rgba(249,248,244,0.7); font-size: 0.95rem;">To protect volatile compounds, our premium ingredients are packed in high-barrier glass or compostable laminates immediately after solar drying. This ensures that the piperine levels in your Tellicherry pepper or the citral values in our lemongrass oil remain completely uncompromised until they arrive in your kitchen or laboratory.</p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 15px; background: rgba(249, 248, 244, 0.05); padding: var(--spacing-md); border: 1px solid rgba(249, 248, 244, 0.1);">
            <h3 style="color: var(--color-spice); font-size: 1.15rem; margin-bottom: 5px;">Our Packaging Promises</h3>
            <div style="font-size: 0.85rem;">✔ <strong>Ultraviolet Glass:</strong> Protects spices against light degradation.</div>
            <div style="font-size: 0.85rem;">✔ <strong>Hermetically Sealed:</strong> Locking moisture and air out to avoid mold.</div>
            <div style="font-size: 0.85rem;">✔ <strong>Compostable Bags:</strong> Plant-based barriers with zip-locks.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Harvests (Moved from Home Page) -->
    <section class="section-padding" style="background-color: var(--color-sand);">
      <div class="container">
        <div class="text-center" style="max-width: 750px; margin: 0 auto 50px auto;">
          <h4 style="color: var(--color-spice); font-weight: 600; font-size: 0.85rem; letter-spacing: 0.25em; text-transform: uppercase;">THE FINEST</h4>
          <h2 style="font-family: var(--font-serif); font-size: clamp(2.2rem, 4vw, 3.2rem); color: var(--color-forest); margin-top: 5px; margin-bottom: 0;">Products</h2>
        </div>

        <div id="home-products-grid" class="grid-3">
          <!-- Dynamic products injected by JS -->
        </div>
      </div>
    </section>
  `;
}

// 3. Wellness View Renderer
function renderWellnessView() {
  return `
    <!-- Split Hero Banner Section -->
    <section style="background-color: var(--color-white); border-bottom: 1px solid var(--color-border); overflow: hidden;">
      <div style="display: grid; grid-template-columns: 1fr 1.2fr; min-height: 480px;">
        <div style="background-color: var(--color-forest); color: var(--color-sand); padding: var(--spacing-lg) var(--spacing-md) var(--spacing-lg) var(--spacing-lg); display: flex; flex-direction: column; justify-content: center; min-height: 400px;">
          <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--color-spice); font-weight: 600; margin-bottom: 15px;">Wellness</span>
          <h1 style="color: var(--color-white); font-size: clamp(2rem, 4vw, 3rem); line-height: 1.15; margin-bottom: 20px;">Botanicals, processed for potency.</h1>
          <p style="color: rgba(249, 248, 244, 0.8); font-size: 0.95rem; line-height: 1.7; margin-bottom: 0;">Moringa, ginger, turmeric, ashwagandha, and amla — the wellness pharmacopoeia of Kerala, handled at low temperature so the active compounds reach you intact.</p>
        </div>
        <div class="image-frame" style="padding: 0; border: none; box-shadow: none; display: flex; align-items: stretch; position: relative;">
          <img src="images/macro_turmeric.png" alt="Botanical Turmeric Powder" style="width: 100%; height: 100%; object-fit: cover; min-height: 400px;">
          <div class="img-caption" style="position: absolute; bottom: 15px; right: 15px; background: rgba(27, 48, 34, 0.85); color: var(--color-sand); padding: 8px 12px; font-size: 0.78rem; border-top: none; line-height: 1.3; max-width: 320px;">Vibrant, cold-milled turmeric root showcasing high active curcumin levels and pure earthy textures.</div>
        </div>
      </div>
    </section>

    <section class="section-padding" style="background-color: var(--color-white); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div class="editorial-layout fade-in-up">
          <p class="drop-cap">W</p><p>ellness has become a commodity, wrapped in plastic and sold on empty promises of quick physical transformation. At Tropic Treasure, we understand wellness through a different lens: the integrity of botanical actives and the preservation of ecological balance.</p>
          
          <h3>The Bioactive Premium</h3>
          <p>The physiological benefit of any herbal ingredient is determined entirely by its chemical density. Green tea is useful for its polyphenols; ginger for its gingerol; pepper for its piperine. When sourcing systems optimize solely for price, they harvest crops prematurely, dry them under harsh industrial heat, and store them in non-barrier containers. The result is a dead powder containing zero active molecules.</p>
          
          <p>Tropic Treasure guarantees chemical potency. By choosing single-origin growing collectives in micro-climates characterized by rich volcanic soils, and drying harvests at low, controlled temperatures, we preserve the biological compounds. We verify these levels via HPLC laboratory testing, presenting hard scientific proof instead of marketing hype.</p>
          
          <blockquote>
            "True wellness cannot arise from degraded soil. The health of the human body is a direct reflection of the health of the soil in which its nourishment grew."
          </blockquote>

          <h3>Ancient Kerala Traditions</h3>
          <p>Our wellness philosophy is rooted in Kerala’s ancient horticultural traditions. Kerala has historically been the epicenter of botanical healing, where cultivation is treated as a collaborative act with nature. The plants are intercropped, growing alongside fruit trees, shade canopies, and native wildlife. This polyculture ensures that the soil remains rich in nutrients, giving the roots their potent essential oils and deep chemical footprints.</p>
          
          <p>When you consume our green cardamom or cold-milled ginger powder, you are not simply taking an ingredient; you are participating in a multi-generational system of botanical excellence designed to nourish the human body naturally.</p>
        </div>
      </div>
    </section>

    <!-- Botanical Grid Section -->
    <section class="section-padding" style="background-color: var(--color-sand); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div class="grid-3" style="margin-bottom: var(--spacing-lg); gap: 40px var(--spacing-md);">
          <div style="border-bottom: 1px solid var(--color-border); padding-bottom: 25px;">
            <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-forest); margin-bottom: 8px; font-weight: bold;">Moringa Leaf Powder</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">Shade-dried, 80-mesh. &ge; 27% protein, full B-vitamin profile.</p>
          </div>
          <div style="border-bottom: 1px solid var(--color-border); padding-bottom: 25px;">
            <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-forest); margin-bottom: 8px; font-weight: bold;">Turmeric (Lakadong)</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">&ge; 7% curcumin &mdash; the highest-grade turmeric harvested in India.</p>
          </div>
          <div style="border-bottom: 1px solid var(--color-border); padding-bottom: 25px;">
            <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-forest); margin-bottom: 8px; font-weight: bold;">Ashwagandha Root</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">Withaferin-A standardised, traceable to single-farm origin.</p>
          </div>
          <div style="padding-bottom: 25px;">
            <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-forest); margin-bottom: 8px; font-weight: bold;">Ginger Powder</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">&ge; 1.2% gingerol, cold-milled to preserve volatile aromatics.</p>
          </div>
          <div style="padding-bottom: 25px;">
            <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-forest); margin-bottom: 8px; font-weight: bold;">Amla</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">Vitamin-C dense fruit powder, freeze-stable for formulation.</p>
          </div>
          <div style="padding-bottom: 25px;">
            <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-forest); margin-bottom: 8px; font-weight: bold;">Tulsi (Holy Basil)</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">Sun-cured below 50&deg;C, full essential-oil retention.</p>
          </div>
        </div>

        <div style="display: flex; gap: 20px; justify-content: flex-start; align-items: center; flex-wrap: wrap; margin-top: 40px;">
          <a href="#/shop" class="btn btn-primary" style="background-color: var(--color-forest); color: var(--color-sand); border: none; font-weight: 500; padding: 16px 32px; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase;">SHOP WELLNESS</a>
          <a href="#/trade" class="btn btn-secondary" style="background-color: transparent; border: 1px solid var(--color-forest); color: var(--color-forest); font-weight: 500; padding: 16px 32px; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase;">BULK & MANUFACTURER ENQUIRIES</a>
        </div>
      </div>
    </section>
  `;
}

// 4. Ingredients View Renderer
function renderIngredientsView() {
  return `
    <section class="section-padding" style="background-color: var(--color-white); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); border-top: 1px solid var(--color-border); border-left: 1px solid var(--color-border); background-color: var(--color-white);">
          
          <div style="border-right: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 40px; display: flex; flex-direction: column; justify-content: center;">
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 10px; color: var(--color-forest); font-weight: bold; margin-top: 0;">Whole & Cracked Spices</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">Bulk format pepper, cardamom, clove, nutmeg. 25kg food-grade liners.</p>
          </div>
          
          <div style="border-right: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 40px; display: flex; flex-direction: column; justify-content: center;">
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 10px; color: var(--color-forest); font-weight: bold; margin-top: 0;">Ground Spices</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">Custom mesh sizes, residual moisture &lt; 9%, no anti-caking additives.</p>
          </div>
          
          <div style="border-right: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 40px; display: flex; flex-direction: column; justify-content: center;">
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 10px; color: var(--color-forest); font-weight: bold; margin-top: 0;">Oleoresins</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">Solvent-extracted concentrates: capsicum, ginger, black pepper, turmeric.</p>
          </div>
          
          <div style="border-right: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 40px; display: flex; flex-direction: column; justify-content: center;">
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 10px; color: var(--color-forest); font-weight: bold; margin-top: 0;">Dehydrated Vegetables</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">Air-dried onion, garlic, curry leaf &mdash; engineered for clean-label use.</p>
          </div>
          
          <div style="border-right: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 40px; display: flex; flex-direction: column; justify-content: center;">
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 10px; color: var(--color-forest); font-weight: bold; margin-top: 0;">Botanical Powders</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">Moringa, amla, tulsi, ashwagandha &mdash; assayed for active compounds.</p>
          </div>
          
          <div style="border-right: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 40px; display: flex; flex-direction: column; justify-content: center;">
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 10px; color: var(--color-forest); font-weight: bold; margin-top: 0;">Custom Blends</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">Formulated to your spec, with full ingredient declaration and allergen control.</p>
          </div>
          
        </div>
      </div>
    </section>

    <!-- Spec CTA Section -->
    <section class="section-padding" style="background-color: var(--color-sand); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: var(--spacing-md); flex-wrap: wrap;">
          <div>
            <h2 style="font-size: 2.2rem; margin-bottom: 8px; color: var(--color-forest); font-family: var(--font-serif); margin-top: 0; font-weight: normal;">Need a specification sheet?</h2>
            <p style="font-size: 1.05rem; color: var(--color-text-light); margin-bottom: 0;">We'll send a full COA, allergen statement and origin declaration on request.</p>
          </div>
          <button onclick="simulatePDFDownload('Specification_Sheet_Pack_2026')" class="btn btn-primary" style="background-color: #cca03e; border: none; color: var(--color-forest); font-weight: bold; padding: 16px 32px; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase;">REQUEST SPEC PACK</button>
        </div>
      </div>
    </section>

    <section class="section-padding" style="background-color: var(--color-sand); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div class="text-center" style="max-width: 800px; margin: 0 auto var(--spacing-md) auto;">
          <h4>Botanical Glossary</h4>
          <h2>Premium Ingredient Directory</h2>
          <p class="lead">A transparent encyclopedia of our sourcing catalog. Access botanical details, active markers, and growing regions for our spice and herb selections.</p>
        </div>

        <div class="glossary-filter-bar">
          <button class="btn btn-primary glossary-filter-btn" data-filter="All">All Ingredients</button>
          <button class="btn btn-secondary glossary-filter-btn" data-filter="Spices">Spices</button>
          <button class="btn btn-secondary glossary-filter-btn" data-filter="Essential Oils">Essential Oils</button>
          <button class="btn btn-secondary glossary-filter-btn" data-filter="Wellness">Wellness Roots</button>
        </div>

        <div class="glossary-grid" id="glossary-results-grid">
          <!-- Loaded dynamically via filterGlossaryItems() -->
        </div>
      </div>
    </section>
  `;
}

// 5. Trade View Renderer
function renderTradeView() {
  return `
    <!-- Parallax Divider Header Banner -->
    <section class="parallax-banner">
      <div class="container">
        <h2>UK-Ready Sourcing & Compliance</h2>
        <p>TAMPER-EVIDENT BATCH CODE TRACEABILITY • FSA COMPLIANT LABELLING • UK BORDER FORWARDING</p>
        <button onclick="simulatePDFDownload('Origin_Compliance_Report_2026')" class="btn btn-primary" style="background-color: var(--color-spice); border-color: var(--color-spice); color: var(--color-forest); font-weight: bold;">Request Wholesale Portfolio</button>
      </div>
    </section>

    <section class="section-padding" style="background-color: var(--color-white); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div class="grid-2" style="gap: var(--spacing-lg);">
          <div>
            <h4>B2B Sourcing Ecosystem</h4>
            <h2>Request Sourcing & Compliance Portfolio</h2>
            <p class="lead">A globally trusted sourcing pipeline from Kerala's estates directly to your UK facility, backed by comprehensive compliance data.</p>
            <p>Tropic Treasure provides wholesale clients with seamless supply continuity, custom private labeling, and bulk ingredient containers. By operating our own export-import structure, we manage all UK import notifications, agricultural inspections, custom classifications, and compliance filings.</p>
            
            <div style="background-color: var(--color-sand); border: 1px solid var(--color-border); padding: 20px; margin: 25px 0;">
              <h3 style="font-size: 1.15rem; margin-bottom: 10px; color: var(--color-forest);">Logistics and Documentation Support</h3>
              <ul style="font-size: 0.85rem; color: var(--color-text-light); padding-left: 20px; display: flex; flex-direction: column; gap: 8px;">
                <li><strong>Private Labeling:</strong> Modern retail-ready jars or bags, packed under HACCP conditions.</li>
                <li><strong>UK Customs Clearance:</strong> All DEFRA / IPAFFS import notifications handled automatically.</li>
                <li><strong>Bulk Shipments:</strong> Clean, moisture-locked multi-wall LCL or FCL shipments.</li>
                <li><strong>Standard Compliance:</strong> Third-party chemical analysis certificate with every delivery.</li>
              </ul>
            </div>

            <!-- Dynamic Trade Freight Calculator Widget -->
            <div style="background-color: var(--color-white); border: 1px solid var(--color-border-dark); padding: 20px; margin-top: 20px;">
              <h3 style="font-size: 1.15rem; margin-bottom: 5px;">Sourcing Freight Estimator</h3>
              <p style="font-size: 0.8rem; color: var(--color-text-light); margin-bottom: 15px;">Input your required volume to view recommended shipping methods, packing types, and UK custom clearance times.</p>
              
              <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <input type="number" id="freight-weight" class="form-control" placeholder="Quantity (e.g. 500)" style="max-width: 200px;">
                <button class="btn btn-primary" id="calc-freight-btn" style="padding: 10px 20px; font-size: 0.75rem;">Estimate Sourcing</button>
              </div>
              
              <div id="freight-results" style="display: none; background-color: var(--color-sand); padding: 15px; border: 1px solid var(--color-border);">
                <!-- Populated dynamically by JS -->
              </div>
            </div>
          </div>
          
          <div>
            <div style="background-color: var(--color-sand); border: 1px solid var(--color-border); padding: var(--spacing-md); box-shadow: 0 10px 40px rgba(27,48,34,0.02);">
              <h3 style="margin-bottom: 15px; font-family: var(--font-serif); border-bottom: 1px solid var(--color-border); padding-bottom: 10px;">Trade Inquiry Form</h3>
              
              <form id="trade-enquiry-form">
                <div class="form-group">
                  <label class="form-label" for="trade-name">Your Name</label>
                  <input type="text" id="trade-name" class="form-control" required placeholder="e.g. Christopher Reynolds">
                </div>
                
                <div class="form-group">
                  <label class="form-label" for="trade-company">Company Name</label>
                  <input type="text" id="trade-company" class="form-control" required placeholder="e.g. Artisan Wellness UK">
                </div>

                <div class="form-group">
                  <label class="form-label" for="trade-email">Business Email</label>
                  <input type="email" id="trade-email" class="form-control" required placeholder="e.g. c.reynolds@artisanwellness.co.uk">
                </div>

                <div class="form-group">
                  <label class="form-label" for="trade-ingredient">Ingredient Required</label>
                  <select id="trade-ingredient" class="form-control" style="background-color: var(--color-white);">
                    <option>Tellicherry Black Pepper (Whole)</option>
                    <option>Green Cardamom (8mm Bold)</option>
                    <option>Cochin Ginger Powder (80 Mesh)</option>
                    <option>Lemongrass Essential Oil</option>
                    <option>Other / Custom Sourcing Contract</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="trade-volume">Estimated Volume Required</label>
                  <input type="text" id="trade-volume" class="form-control" placeholder="e.g. 500 kg / quarterly">
                </div>

                <div class="form-group">
                  <label class="form-label" for="trade-message">Custom Specifications & Packaging Requirements</label>
                  <textarea id="trade-message" class="form-control" placeholder="Specify if you require steam sterilisation, private packaging, or specific moisture/volatile oil targets..."></textarea>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%;">Submit Trade Inquiry</button>
              </form>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
              <button class="btn btn-secondary" style="width:100%;" onclick="simulatePDFDownload('Origin_Compliance_Report_2026')">Download 2026 Origin & Compliance Report</button>
              <p style="font-size: 0.72rem; color: var(--color-text-light); margin-top: 8px;">Detailed breakdown of our farm structures, fair pricing audits, and HPLC lab clearances.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// 6. Our Story View Renderer
function renderStoryView() {
  return `
    <!-- Image Hero Banner Section -->
    <section style="background-image: linear-gradient(rgba(27, 48, 34, 0.7), rgba(27, 48, 34, 0.7)), url('images/hero_plantation.png'); background-size: cover; background-position: center; padding: 120px 0; color: var(--color-sand); text-align: center; border-bottom: 1px solid var(--color-border);">
      <div class="container" style="max-width: 900px;">
        <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.25em; color: var(--color-spice); font-weight: 600; display: block; margin-bottom: 15px;">OUR STORY</span>
        <h1 style="color: var(--color-white); font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1.15; margin: 0; font-family: var(--font-serif); font-weight: normal;">Integrity in Sourcing. <span style="color: var(--color-spice); font-style: italic;">A Direct Link</span> from the Western Ghats to the UK.</h1>
      </div>
    </section>

    <section class="section-padding" style="background-color: var(--color-white); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div style="display: grid; grid-template-columns: 280px 1fr; gap: 80px; align-items: start;">
          
          <!-- Sticky Table of Contents (Left) -->
          <aside style="position: sticky; top: 120px; display: flex; flex-direction: column; gap: 20px;">
            <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; color: var(--color-text-light);">CONTENTS</span>
            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 16px; font-size: 0.88rem; font-weight: 500; font-family: var(--font-sans); line-height: 1.4;">
              <li><a href="#/our-story#chapter-i" style="color: var(--color-forest); font-weight: bold;">I. The Heritage of the Hills</a></li>
              <li><a href="#/our-story#chapter-ii" style="color: var(--color-text-light); transition: var(--transition-fast);">II. The Old Model vs Tropic Treasure</a></li>
              <li><a href="#/our-story#chapter-iii" style="color: var(--color-text-light); transition: var(--transition-fast);">III. A Dual-Entity System Built for Trust</a></li>
              <li><a href="#/our-story#chapter-iv" style="color: var(--color-text-light); transition: var(--transition-fast);">IV. The Soil-to-Shelf Promise</a></li>
            </ul>
          </aside>
          
          <!-- Chapters Flow (Right) -->
          <div class="editorial-layout-flow" style="display: flex; flex-direction: column; gap: 80px; font-family: var(--font-serif); font-size: 1.15rem; line-height: 1.8; color: var(--color-text-dark);">
            
            <!-- Chapter I -->
            <div id="chapter-i" style="scroll-margin-top: 140px;">
              <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.25em; color: var(--color-spice); font-weight: 600; display: block; margin-bottom: 12px; font-family: var(--font-sans);">CHAPTER I</span>
              <h2 style="font-size: 2.2rem; line-height: 1.2; margin-top: 0; margin-bottom: 20px; color: var(--color-forest); font-family: var(--font-serif); font-weight: normal;">The Heritage of the Hills</h2>
              <p class="drop-cap">F</p><p>or over two thousand years, the Western Ghats — a UNESCO World Heritage range running parallel to India's southwest coast — have produced the spices that defined global trade. Roman scribes wrote of Malabar pepper. Portuguese fleets crossed oceans for cardamom. The volcanic soils, monsoon rhythm and 1,200-metre estates of Kerala remain, by any objective measure, the world's finest spice terroir. Tropic Treasure begins here, where the mist still settles into the same valleys it has for twenty centuries.</p>
            </div>

            <!-- Chapter II -->
            <div id="chapter-ii" style="scroll-margin-top: 140px;">
              <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.25em; color: var(--color-spice); font-weight: 600; display: block; margin-bottom: 12px; font-family: var(--font-sans);">CHAPTER II</span>
              <h2 style="font-size: 2.2rem; line-height: 1.2; margin-top: 0; margin-bottom: 20px; color: var(--color-forest); font-family: var(--font-serif); font-weight: normal;">The Old Model vs Tropic Treasure</h2>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; font-family: var(--font-sans);">
                <div style="background-color: var(--color-sand); border: 1px solid var(--color-border); padding: 25px;">
                  <h4 style="color: #c94a4a; margin-top: 0; margin-bottom: 15px; font-size: 0.85rem; letter-spacing: 0.1em; font-family: var(--font-sans); font-weight: 600;">THE OLD MODEL</h4>
                  <ul style="list-style: none; font-size: 0.9rem; display: flex; flex-direction: column; gap: 10px; padding: 0; line-height: 1.4; color: var(--color-text-dark);">
                    <li style="display: flex; gap: 8px;"><span style="color: #c94a4a; font-weight: bold;">—</span> Fragmented sourcing across anonymous lots</li>
                    <li style="display: flex; gap: 8px;"><span style="color: #c94a4a; font-weight: bold;">—</span> Five to seven middlemen between farmer and buyer</li>
                    <li style="display: flex; gap: 8px;"><span style="color: #c94a4a; font-weight: bold;">—</span> Potency loss from blended, aged stock</li>
                    <li style="display: flex; gap: 8px;"><span style="color: #c94a4a; font-weight: bold;">—</span> No traceability beyond the exporter</li>
                  </ul>
                </div>
                
                <div style="background-color: var(--color-sand); border: 1px solid var(--color-forest); padding: 25px;">
                  <h4 style="color: var(--color-forest); margin-top: 0; margin-bottom: 15px; font-size: 0.85rem; letter-spacing: 0.1em; font-family: var(--font-sans); font-weight: 600;">THE TROPIC TREASURE MODEL</h4>
                  <ul style="list-style: none; font-size: 0.9rem; display: flex; flex-direction: column; gap: 10px; padding: 0; line-height: 1.4; color: var(--color-text-dark);">
                    <li style="display: flex; gap: 8px;"><span style="color: var(--color-forest); font-weight: bold;">✓</span> Direct sourcing from named estates</li>
                    <li style="display: flex; gap: 8px;"><span style="color: var(--color-forest); font-weight: bold;">✓</span> Human relationships with multi-season offtake</li>
                    <li style="display: flex; gap: 8px;"><span style="color: var(--color-forest); font-weight: bold;">✓</span> Batch traceability to harvest week</li>
                    <li style="display: flex; gap: 8px;"><span style="color: var(--color-forest); font-weight: bold;">✓</span> UK-side compliance and laboratory verification</li>
                  </ul>
                </div>
              </div>

              <div class="image-frame" style="margin: 30px 0;">
                <img src="images/farmer_hands.png" alt="Farmer Sourcing Ginger Root">
                <div class="img-caption">Direct sourcing means the grower's name is on the file. Anonymity is the supply chain's favourite hiding place — we removed it.</div>
              </div>
            </div>

            <!-- Chapter III -->
            <div id="chapter-iii" style="scroll-margin-top: 140px;">
              <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.25em; color: var(--color-spice); font-weight: 600; display: block; margin-bottom: 12px; font-family: var(--font-sans);">CHAPTER III</span>
              <h2 style="font-size: 2.2rem; line-height: 1.2; margin-top: 0; margin-bottom: 20px; color: var(--color-forest); font-family: var(--font-serif); font-weight: normal;">A Dual-Entity System Built for Trust</h2>
              <p>Tropic Treasure operates as two legal entities working in lockstep: Tropic Treasure Exim OPC Pvt Ltd in Kerala handles cultivation partnerships, on-site grading and export; and Tropic Treasure Ltd in the United Kingdom owns import compliance, laboratory verification, and customer fulfilment. Each side absorbs the obligations its jurisdiction demands — and refuses the shortcuts the other might be tempted to take.</p>
            </div>

            <!-- Chapter IV -->
            <div id="chapter-iv" style="scroll-margin-top: 140px;">
              <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.25em; color: var(--color-spice); font-weight: 600; display: block; margin-bottom: 12px; font-family: var(--font-sans);">CHAPTER IV</span>
              <h2 style="font-size: 2.2rem; line-height: 1.2; margin-top: 0; margin-bottom: 20px; color: var(--color-forest); font-family: var(--font-serif); font-weight: normal;">The Soil-to-Shelf Promise</h2>
              
              <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 25px; font-family: var(--font-sans); font-size: 0.95rem;">
                <div style="border-left: 2px solid var(--color-spice); padding-left: 20px; line-height: 1.5;">
                  <strong style="color: var(--color-forest); display: block; margin-bottom: 4px;">Direct Sourcing:</strong> Long-term, named-grower partnerships. Fair pricing audits.
                </div>
                <div style="border-left: 2px solid var(--color-spice); padding-left: 20px; line-height: 1.5;">
                  <strong style="color: var(--color-forest); display: block; margin-bottom: 4px;">Scientific Verification:</strong> Independent laboratory clearance. Published batch results.
                </div>
                <div style="border-left: 2px solid var(--color-spice); padding-left: 20px; line-height: 1.5;">
                  <strong style="color: var(--color-forest); display: block; margin-bottom: 4px;">Full Traceability:</strong> Every batch carries a code that maps back to estate, harvest week, and lab report.
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  `;
}

// 7. Sustainability View Renderer
function renderSustainabilityView() {
  return `
    <!-- Sourcing Pillars Grid Section -->
    <section class="section-padding" style="background-color: var(--color-sand); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px var(--spacing-lg);">
          
          <div>
            <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--color-spice); font-weight: 600; display: block; margin-bottom: 10px; font-family: var(--font-sans);">PILLAR</span>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-forest); margin-top: 0; margin-bottom: 15px; font-weight: bold;">Ethical Partnerships</h3>
            <p style="font-size: 0.95rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">We sign multi-season offtake agreements with named estates &mdash; security that lets farmers invest in the land instead of chasing the spot price.</p>
          </div>
          
          <div>
            <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--color-spice); font-weight: 600; display: block; margin-bottom: 10px; font-family: var(--font-sans);">PILLAR</span>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-forest); margin-top: 0; margin-bottom: 15px; font-weight: bold;">Fair Pricing</h3>
            <p style="font-size: 0.95rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">Above mandi rates, paid on collection. No deductions for grading we perform ourselves.</p>
          </div>
          
          <div>
            <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--color-spice); font-weight: 600; display: block; margin-bottom: 10px; font-family: var(--font-sans);">PILLAR</span>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-forest); margin-top: 0; margin-bottom: 15px; font-weight: bold;">Scientific Testing</h3>
            <p style="font-size: 0.95rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">Every shipment is independently assayed for residues, heavy metals, microbial load and active-compound concentration.</p>
          </div>
          
          <div>
            <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--color-spice); font-weight: 600; display: block; margin-bottom: 10px; font-family: var(--font-sans);">PILLAR</span>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-forest); margin-top: 0; margin-bottom: 15px; font-weight: bold;">Traceability</h3>
            <p style="font-size: 0.95rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">Each retail unit and each industrial pallet carries a batch code that resolves to an estate, harvest week, and lab report.</p>
          </div>

          <div>
            <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--color-spice); font-weight: 600; display: block; margin-bottom: 10px; font-family: var(--font-sans);">PILLAR</span>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-forest); margin-top: 0; margin-bottom: 15px; font-weight: bold;">Soil Health</h3>
            <p style="font-size: 0.95rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">We work exclusively with polyculture farm setups, testing soil samples regularly to verify complete absence of synthetic residues.</p>
          </div>

          <div>
            <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--color-spice); font-weight: 600; display: block; margin-bottom: 10px; font-family: var(--font-sans);">PILLAR</span>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-forest); margin-top: 0; margin-bottom: 15px; font-weight: bold;">Broker Elimination</h3>
            <p style="font-size: 0.95rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 0;">By operating our own offices in India and the UK, we bypass local intermediaries, redirecting savings directly to the growers.</p>
          </div>
          
        </div>
      </div>
    </section>

    <!-- Original Sourcing System Details Section -->
    <section class="section-padding" style="background-color: var(--color-white); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div class="grid-2" style="gap: var(--spacing-lg); align-items: center; margin-bottom: var(--spacing-lg);">
          <div>
            <div class="image-frame">
              <img src="images/farmer_hands.png" alt="Farmer Sourcing">
              <div class="img-caption">Farmer hands plucking and inspecting fresh botanicals, ensuring strict quality logs at primary sorting.</div>
            </div>
          </div>
          
          <div>
            <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600; color: var(--color-text-light);">The Sourcing System</span>
            <h1 style="margin-bottom: var(--spacing-sm); margin-top: 10px;">Grown by farmers. Protected by systems.</h1>
            <p style="font-size: 1.05rem; line-height: 1.6; color: var(--color-text-light);">Behind every Tropic Treasure ingredient is a network of growers, harvesters, laboratory partners, and sourcing teams working together to preserve quality from origin to shelf.</p>
            
            <blockquote style="font-family: var(--font-serif); font-style: italic; font-size: 1.15rem; border-left: 2px solid var(--color-spice); padding-left: 15px; margin: 20px 0; color: var(--color-text-light);">
              The same farming communities that harvest our ingredients are part of the long-term relationships that sustain our sourcing system.
            </blockquote>

            <div class="grid-3" style="margin-top: 30px; border-top: 1px solid var(--color-border); padding-top: 20px;">
              <div>
                <div style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--color-forest); font-weight: bold; line-height: 1;">40+</div>
                <div style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-light); margin-top: 5px;">Farmer Partners</div>
              </div>
              <div>
                <div style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--color-forest); font-weight: bold; line-height: 1;">3</div>
                <div style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-light); margin-top: 5px;">Kerala Districts</div>
              </div>
              <div>
                <div style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--color-forest); font-weight: bold; line-height: 1;">100%</div>
                <div style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-light); margin-top: 5px;">Batch Traced</div>
              </div>
            </div>
          </div>
        </div>

        <div class="editorial-layout fade-in-up">
          <p class="drop-cap">S</p><p>ustainability is often used as a marketing tool, but in the spice trade, true sustainability is defined by concrete operational systems. Monoculture farming requires high chemical fertilizer inputs and strips nutrients from the soil, creating rapid land degradation. Tropic Treasure works exclusively with polyculture farm setups.</p>
          
          <h3>Fair Pricing Guarantees</h3>
          <p>Ecological health is impossible without economic stability. If a farmer is forced to sell their crop below cost to bulk consolidators, they cannot afford organic inputs, solar drying equipment, or sustainable labor. We guarantee our partner farmers a pre-negotiated price floor that sits comfortably above market averages, creating long-term economic resilience.</p>
          
          <h3>Reduced Intermediaries</h3>
          <p>By operating our own offices in India and the UK, we bypass local broker channels. The money saved is redirected to our farmers in the form of direct sourcing bonuses and investments in community infrastructures, such as solar dehydration domes and compost facilities.</p>

          <blockquote>
            "A system is only sustainable if every node within it benefits — from the soil microbes to the consumer."
          </blockquote>

          <h3>Scientific Verification of Clean Soil</h3>
          <p>Pesticide residues are a massive crisis in commercial spices. To ensure that our partner growers maintain clean agricultural setups, our Cochin office tests soil samples regularly. Every batch is then steam pasteurised and tested via HPLC to verify complete absence of synthetic pesticides, chemical ripening agents, and heavy metals. We protect your health while preserving the integrity of the soil.</p>
        </div>
      </div>
    </section>
  `;
}

// 8. Journal List View Renderer
function renderJournalListView() {
  let listHtml = "";
  JOURNAL_DB.forEach(post => {
    listHtml += `
      <div style="border-right: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); padding: 40px; display: flex; flex-direction: column; background-color: var(--color-sand);">
        <div style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-spice); font-weight: 600; margin-bottom: 12px; font-family: var(--font-sans);">
          ${post.category.toUpperCase()} &middot; ${post.readTime.toUpperCase()}
        </div>
        <h2 style="font-family: var(--font-serif); font-size: 1.6rem; line-height: 1.3; margin-bottom: 12px; color: var(--color-forest); font-weight: bold; margin-top: 0;">${post.title}</h2>
        <p style="font-size: 0.9rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 25px; flex-grow: 1;">${post.excerpt}</p>
        <a href="#/journal/${post.id}" style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-forest); display: inline-flex; align-items: center; gap: 6px; transition: var(--transition-fast); align-self: flex-start;">READ ENTRY &rarr;</a>
      </div>
    `;
  });

  return `
    <section class="section-padding" style="background-color: var(--color-sand); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div style="max-width: 800px; margin: 0 auto var(--spacing-lg) 0;">
          <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.25em; font-weight: 600; color: var(--color-spice); display: block; margin-bottom: 10px;">JOURNAL</span>
          <h1 style="font-size: 3.5rem; line-height: 1.1; margin-bottom: 15px; color: var(--color-forest); font-family: var(--font-serif); font-weight: normal; margin-top: 0;">Notes from the Ghats.</h1>
          <p style="font-size: 1.25rem; font-weight: 300; line-height: 1.6; color: var(--color-text-light); margin-bottom: 0;">Editorial writing on spice quality, wellness science, Kerala heritage and UK import standards &mdash; published as we learn.</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); border-top: 1px solid var(--color-border); border-left: 1px solid var(--color-border); background-color: var(--color-sand); margin-top: var(--spacing-lg);">
          ${listHtml}
        </div>
      </div>
    </section>
  `;
}

// 9. Journal Detail View Renderer
function renderJournalDetailView() {
  const post = JOURNAL_DB.find(p => p.id === AppState.activeJournalPost);
  if (!post) {
    return `
      <div class="container section-padding text-center">
        <h2>Article Not Found</h2>
        <p>The requested journal story could not be resolved.</p>
        <a href="#/journal" class="btn btn-primary">Return to Journal</a>
      </div>
    `;
  }

  return `
    <section class="section-padding" style="background-color: var(--color-white); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div style="margin-bottom: var(--spacing-md);">
          <a href="#/journal" class="btn-text">← Return to Sourcing Journal</a>
        </div>
        
        <div class="editorial-layout fade-in-up">
          <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.2em; font-weight:600; color:var(--color-spice); margin-bottom:10px;">
            ${post.date} • ${post.readTime}
          </div>
          <h1 style="margin-bottom: 20px; line-height: 1.15;">${post.title}</h1>
          <div style="font-size:0.9rem; color:var(--color-text-light); margin-bottom: var(--spacing-md); font-family:var(--font-sans);">
            Written by <strong>${post.author}</strong>
          </div>

          <div class="image-frame" style="margin: var(--spacing-md) 0;">
            <img src="${post.image}" alt="${post.title}">
            <div class="img-caption">${post.caption}</div>
          </div>

          <div class="journal-detail-body">
            ${post.content}
          </div>
        </div>
      </div>
    </section>
  `;
}

// 10. Contact View Renderer
function renderContactView() {
  return `
    <section class="section-padding" style="background-color: var(--color-white); border-bottom: 1px solid var(--color-border); min-height: 80vh; display: flex; align-items: center;">
      <div class="container" style="max-width: 1000px;">
        <div style="margin-bottom: var(--spacing-xl);">
          <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.25em; font-weight: 600; color: var(--color-spice); display: block; margin-bottom: 15px;">CONTACT</span>
          <h1 style="font-size: 4rem; line-height: 1.1; margin-top: 0; margin-bottom: 20px; color: var(--color-forest); font-family: var(--font-serif); font-weight: normal;">Let's talk.</h1>
          <p style="font-size: 1.25rem; font-weight: 300; line-height: 1.6; color: var(--color-text-light); max-width: 700px; margin-bottom: 0;">Two offices. One team. Whether you're a customer, a buyer, or a journalist &mdash; we read every message.</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 60px; border-top: 1px solid var(--color-border); padding-top: 40px; font-family: var(--font-sans); font-size: 0.9rem; line-height: 1.6;">
          
          <div>
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-forest); margin-top: 0; margin-bottom: 15px; font-weight: bold;">United Kingdom</h3>
            <p style="color: var(--color-text-light); margin-bottom: 0;">
              Tropic Treasure Ltd<br>
              London, EC2A<br>
              +44 (0)20 0000 0000<br>
              <a href="mailto:hello@tropictreasure.co.uk" style="color: var(--color-forest); font-weight: 600;">hello@tropictreasure.co.uk</a>
            </p>
          </div>
          
          <div>
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-forest); margin-top: 0; margin-bottom: 15px; font-weight: bold;">India (Sourcing)</h3>
            <p style="color: var(--color-text-light); margin-bottom: 0;">
              Tropic Treasure Exim OPC Pvt Ltd<br>
              Kochi, Kerala 682001<br>
              +91 484 000 0000<br>
              <a href="mailto:kerala@tropictreasure.co.uk" style="color: var(--color-forest); font-weight: 600;">kerala@tropictreasure.co.uk</a>
            </p>
          </div>
          
          <div>
            <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-forest); margin-top: 0; margin-bottom: 15px; font-weight: bold;">Press & Partnerships</h3>
            <p style="color: var(--color-text-light); margin-bottom: 0;">
              For interviews, samples, collaborations.<br>
              <a href="mailto:press@tropictreasure.co.uk" style="color: var(--color-forest); font-weight: 600;">press@tropictreasure.co.uk</a>
            </p>
          </div>
          
        </div>
      </div>
    </section>
  `;
}

// 11. Recipes View Renderer (Blog Style)
function renderRecipesView() {
  const recipes = getRecipes();
  
  // Set default active recipe if not set
  if (!AppState.activeRecipeId && recipes.length > 0) {
    AppState.activeRecipeId = recipes[0].id;
  }
  
  const featured = recipes.find(r => r.id === AppState.activeRecipeId) || recipes[0];
  
  // Render Ingredients list items
  let ingredientsHtml = "";
  featured.ingredients.forEach(ing => {
    ingredientsHtml += `<li>${ing}</li>`;
  });
  
  // Render Instructions steps
  let stepsHtml = "";
  featured.steps.forEach((step, idx) => {
    stepsHtml += `
      <li class="recipe-instruction-step">
        <div class="recipe-step-num">${idx + 1}</div>
        <div class="recipe-step-content">${step}</div>
      </li>
    `;
  });

  // Render Category filter tabs
  const categories = ["All", "Lunch", "Dinner", "Side Dish"];
  let tabsHtml = "";
  categories.forEach(cat => {
    const isActive = cat === "All"; // Default to All active on load
    tabsHtml += `
      <button class="btn ${isActive ? "btn-primary" : "btn-secondary"} recipe-tab-btn" data-filter="${cat}">
        ${cat}
      </button>
    `;
  });

  // Render Recipe Cards Grid (Initial render, All category)
  let cardsHtml = "";
  recipes.forEach(r => {
    cardsHtml += `
      <div class="recipe-blog-card fade-in-up">
        <img class="recipe-blog-card-img" src="${r.image}" alt="${r.title}">
        <span class="recipe-tag-badge">${r.category}</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; line-height: 1.3; margin-bottom: 8px; color: var(--color-forest);">${r.title}</h3>
        <p style="font-size: 0.88rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 20px; flex-grow: 1;">${r.excerpt}</p>
        <button class="btn btn-secondary" style="padding: 8px 16px; font-size: 0.7rem; align-self: flex-start;" onclick="viewFeaturedRecipe('${r.id}')">View Recipe Details</button>
      </div>
    `;
  });

  return `
    <section class="section-padding" style="background-color: var(--color-white); border-bottom: 1px solid var(--color-border);" id="featured-recipe-anchor">
      <div class="container">
        
        <div style="max-width: 800px; margin-bottom: var(--spacing-lg);">
          <span class="recipe-blog-subtitle">Tropic Treasure Test Kitchen</span>
          <h1 class="recipe-blog-title">Blog. <span style="font-style: italic; font-weight: normal; font-size: 2.2rem; color: var(--color-text-light);">Food for thought</span></h1>
          <p class="lead">Exploring the culinary possibilities of single-origin spices and organic botanicals. Detailed walkthroughs from our kitchen partners.</p>
        </div>

        <!-- Featured Recipe (Split Layout) -->
        <div class="recipe-featured-layout">
          <div>
            <div class="image-frame">
              <img src="${featured.image}" alt="${featured.title}" style="max-height: 500px; width: 100%; object-fit: cover;">
              <div class="img-caption">${featured.caption}</div>
            </div>
            
            <div style="margin-top: 30px; display: flex; gap: 15px; flex-wrap: wrap;">
              <div class="recipe-meta-badge">⏱ Prep: ${featured.prepTime}</div>
              <div class="recipe-meta-badge">🍳 Cook: ${featured.cookTime}</div>
              <div class="recipe-meta-badge">🌶 Level: ${featured.difficulty}</div>
            </div>
          </div>
          
          <div>
            <span class="recipe-tag-badge active-tag">${featured.category}</span>
            <h2 style="font-size: 2.5rem; margin-top: 10px; margin-bottom: 15px; line-height: 1.2;">${featured.title}</h2>
            <div class="recipe-meta-row">
              <span>By ${featured.author}</span>
              <span>•</span>
              <span>${featured.date}</span>
              <span>•</span>
              <span>${featured.readTime}</span>
            </div>
            <p style="font-family: var(--font-serif); font-size: 1.15rem; line-height: 1.8; color: var(--color-text-dark); margin-bottom: 25px;">${featured.description}</p>
            
            <h3 class="recipe-section-title">Ingredients</h3>
            <ul class="recipe-ingredients-list">
              ${ingredientsHtml}
            </ul>
            
            <h3 class="recipe-section-title">Instructions</h3>
            <ul class="recipe-instructions-list">
              ${stepsHtml}
            </ul>
          </div>
        </div>

        <!-- Recipes Grid (Filterable) -->
        <div style="border-top: 1px solid var(--color-border); padding-top: var(--spacing-lg); margin-top: var(--spacing-lg);">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--spacing-md); flex-wrap: wrap; gap: 20px;">
            <div>
              <h4>Community Recipes</h4>
              <h2 style="margin-bottom: 0;">Explore Cookbooks</h2>
            </div>
            <div class="recipe-category-tabs">
              ${tabsHtml}
            </div>
          </div>

          <div class="grid-3" id="recipes-grid-list">
            ${cardsHtml}
          </div>
        </div>

        <!-- Recipe Contribution Form -->
        <div style="margin-top: var(--spacing-xl); background-color: var(--color-sand); border: 1px solid var(--color-border); padding: var(--spacing-md); max-width: 800px; margin-left: auto; margin-right: auto;">
          <div class="text-center" style="margin-bottom: 25px;">
            <h2 style="font-family: var(--font-serif); margin-bottom: 5px;">Share Your Recipe</h2>
            <p style="font-size: 0.9rem; color: var(--color-text-light); margin-bottom: 0;">Have a unique culinary blend or wellness recipe using Tropic Treasure spices? Submit your creation below.</p>
          </div>

          <form id="recipe-submission-form">
            <div class="grid-2" style="gap: 15px; margin-bottom: 15px;">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="recipe-name">Recipe Title</label>
                <input type="text" id="recipe-name" class="form-control" required placeholder="e.g. Cardamom Honey Glazed Carrots">
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="recipe-subtitle">Short Tagline</label>
                <input type="text" id="recipe-subtitle" class="form-control" required placeholder="e.g. Sweet, aromatic roasted side-dish">
              </div>
            </div>

            <div class="grid-3" style="gap: 15px; margin-bottom: 15px;">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="recipe-category">Meal Type</label>
                <select id="recipe-category" class="form-control" style="background-color: var(--color-white);">
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Side Dish</option>
                  <option>Beverages</option>
                </select>
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="recipe-prep">Prep Time</label>
                <input type="text" id="recipe-prep" class="form-control" placeholder="e.g. 15 Minutes">
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="recipe-cook">Cook Time</label>
                <input type="text" id="recipe-cook" class="form-control" placeholder="e.g. 20 Minutes">
              </div>
            </div>

            <div class="grid-2" style="gap: 15px; margin-bottom: 15px;">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="recipe-diff">Difficulty Level</label>
                <select id="recipe-diff" class="form-control" style="background-color: var(--color-white);">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="recipe-excerpt">One-sentence Summary</label>
                <input type="text" id="recipe-excerpt" class="form-control" required placeholder="e.g. A quick side-dish featuring the warm sweetness of Elettaria pods.">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="recipe-desc">Recipe Introduction / Sourcing Description</label>
              <textarea id="recipe-desc" class="form-control" required placeholder="Write a brief introduction about the dish and which spices you selected..."></textarea>
            </div>

            <div class="form-group">
              <label class="form-label" for="recipe-ing">Ingredients (One per line)</label>
              <textarea id="recipe-ing" class="form-control" required placeholder="e.g.&#10;500g carrots&#10;3 crushed green cardamom pods&#10;2 tablespoons honey" style="min-height:100px;"></textarea>
            </div>

            <div class="form-group">
              <label class="form-label" for="recipe-steps">Instructions (One step per line)</label>
              <textarea id="recipe-steps" class="form-control" required placeholder="e.g.&#10;Preheat oven to 200°C.&#10;Toss carrots with honey and spices.&#10;Roast for 20 minutes until caramelised." style="min-height:100px;"></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">Publish Recipe to Sourcing Hub</button>
          </form>
        </div>

      </div>
    </section>
  `;
}

// Helper to scroll & feature a recipe
function viewFeaturedRecipe(recipeId) {
  AppState.activeRecipeId = recipeId;
  renderActiveView();
  setTimeout(() => {
    const el = document.getElementById("featured-recipe-anchor");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, 250);
}

// Helper to filter recipes list
function filterRecipesGrid(filter) {
  const container = document.getElementById("recipes-grid-list");
  if (!container) return;

  const recipes = getRecipes();
  const filtered = recipes.filter(r => {
    if (filter === "All") return true;
    return r.category.toUpperCase() === filter.toUpperCase();
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; padding: 40px; text-align: center; border: 1px dashed var(--color-border); background-color: var(--color-sand);">
        <p style="font-size: 0.9rem; color: var(--color-text-light);">No recipes found in the "${filter}" category. Submit your recipe below to begin the collection!</p>
      </div>
    `;
    return;
  }

  let html = "";
  filtered.forEach(r => {
    html += `
      <div class="recipe-blog-card fade-in-up">
        <img class="recipe-blog-card-img" src="${r.image}" alt="${r.title}">
        <span class="recipe-tag-badge">${r.category}</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; line-height: 1.3; margin-bottom: 8px; color: var(--color-forest);">${r.title}</h3>
        <p style="font-size: 0.88rem; color: var(--color-text-light); line-height: 1.6; margin-bottom: 20px; flex-grow: 1;">${r.excerpt}</p>
        <button class="btn btn-secondary" style="padding: 8px 16px; font-size: 0.7rem; align-self: flex-start;" onclick="viewFeaturedRecipe('${r.id}')">View Recipe Details</button>
      </div>
    `;
  });
  container.innerHTML = html;
}

// 12. Tastymonials View Renderer
function renderTastymonialsView() {
  const testimonials = getTestimonials();

  // Dynamic metrics calculation
  const totalReviewsCount = 62 + (testimonials.length - 4);
  const avgStars = 5.0; // Keep it clean for luxury branding

  let listHtml = "";
  testimonials.forEach(t => {
    // Render star row
    let starsHtml = "";
    for (let i = 0; i < t.rating; i++) {
      starsHtml += "★";
    }
    
    listHtml += `
      <div class="tastymonial-card fade-in-up">
        <div class="stars-rating-wrap" style="font-size:0.95rem;">${starsHtml}</div>
        <h4 class="tastymonial-card-title">${t.title}</h4>
        <p class="tastymonial-card-text">"${t.text}"</p>
        <div class="tastymonial-card-footer">
          <div class="tastymonial-author">${t.author}</div>
          <div>${t.location} • ${t.date}</div>
          <span class="tastymonial-product-tag">${t.product}</span>
        </div>
      </div>
    `;
  });

  return `
    <section class="section-padding" style="background-color: var(--color-sand); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        
        <!-- Header Section -->
        <div class="tastymonial-header-box">
          <div class="tastymonial-heart-icon">💛</div>
          <h1 style="font-size: clamp(2.5rem, 5vw, 3.5rem); line-height: 1.15; margin-bottom: 15px; color: var(--color-forest); font-family: var(--font-serif);">Tastymonial</h1>
          <p style="max-width: 800px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6; color: var(--color-text-light);">
            We love being a part of your life as you celebrate every day with aromatic and flavoursome food. Your life stories excite us and motivate us to deliver premium quality every single time. Your reviews warm our hearts and we are truly grateful for your love.
          </p>
        </div>

        <!-- Rating Stats Divider -->
        <div style="text-align: center; margin-bottom: var(--spacing-lg);">
          <h2 style="font-size: 2rem; font-family: var(--font-serif); margin-bottom: 10px;">Let customers speak for us</h2>
          <div class="tastymonial-stats-container">
            <div class="stars-rating-wrap" style="font-size: 1.6rem; gap: 8px;">★★★★★</div>
            <div style="font-size: 0.95rem; color: var(--color-text-light); font-weight: 500;">
              from <span class="stars-rating-num" style="font-size:1.15rem; color: var(--color-forest);">${totalReviewsCount}</span> reviews
            </div>
          </div>
        </div>

        <!-- Testimonials Cards Grid -->
        <div class="tastymonials-list-grid">
          ${listHtml}
        </div>

        <!-- Testimonial Submission Form -->
        <div style="background-color: var(--color-white); border: 1px solid var(--color-border); padding: var(--spacing-md); max-width: 600px; margin: var(--spacing-xl) auto 0 auto; box-shadow: 0 10px 40px rgba(27,48,34,0.02);">
          <div class="text-center" style="margin-bottom: 20px;">
            <h3 style="font-family: var(--font-serif); margin-bottom: 5px;">Leave a Tastymonial</h3>
            <p style="font-size: 0.85rem; color: var(--color-text-light); margin-bottom: 0;">We read every piece of feedback. Let us know how Tropic Treasure spice oils elevate your dishes.</p>
          </div>

          <form id="testimonial-submission-form">
            <div class="grid-2" style="gap: 15px; margin-bottom: 15px;">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="test-author">Your Name</label>
                <input type="text" id="test-author" class="form-control" required placeholder="e.g. Elizabeth Vance">
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="test-location">Your Location</label>
                <input type="text" id="test-location" class="form-control" placeholder="e.g. London, UK">
              </div>
            </div>

            <div class="grid-2" style="gap: 15px; margin-bottom: 15px;">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="test-rating">Overall Rating</label>
                <select id="test-rating" class="form-control" style="background-color: var(--color-white);">
                  <option value="5">★★★★★ (5 Stars)</option>
                  <option value="4">★★★★ (4 Stars)</option>
                  <option value="3">★★★ (3 Stars)</option>
                  <option value="2">★★ (2 Stars)</option>
                  <option value="1">★ (1 Star)</option>
                </select>
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="test-product">Product Sourced</label>
                <select id="test-product" class="form-control" style="background-color: var(--color-white);">
                  <option>Tellicherry Black Pepper</option>
                  <option>Green Cardamom</option>
                  <option>Premium Ginger Powder</option>
                  <option>Cashew Kernels (W180)</option>
                  <option>Whole Spice Collection</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="test-title">Review Title</label>
              <input type="text" id="test-title" class="form-control" required placeholder="e.g. Incredibly potent pepper, highly aromatic">
            </div>

            <div class="form-group">
              <label class="form-label" for="test-text">Review Details</label>
              <textarea id="test-text" class="form-control" required placeholder="Describe your experience with the spice, the aroma release, and culinary results..." style="min-height: 100px;"></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">Record Testimonial</button>
          </form>
        </div>

      </div>
    </section>
  `;
}

// 13. Track View Renderer
function renderTrackView() {
  return `
    <section class="section-padding" style="background-color: var(--color-sand); min-height: 80vh; display: flex; align-items: center; border-bottom: 1px solid var(--color-border);">
      <div class="container" style="max-width: 850px;">
        <div class="text-center" style="margin-bottom: var(--spacing-lg);">
          <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.25em; font-weight: 600; color: var(--color-spice); display: block; margin-bottom: 10px;">TRACK HARVEST</span>
          <h1 style="font-size: 3.2rem; font-family: var(--font-serif); color: var(--color-forest); margin-top: 0; margin-bottom: 15px; font-weight: normal;">Traceability Portal</h1>
          <p style="font-size: 1.1rem; color: var(--color-text-light); max-width: 600px; margin: 0 auto; line-height: 1.6;">Have a Tropic Treasure jar? Enter its batch code below to view complete harvest records, laboratory certifications, and shipping logs.</p>
        </div>
        
        <div class="trace-portal" style="box-shadow: 0 10px 45px rgba(27,48,34,0.02); border: 1px solid var(--color-border); background-color: var(--color-white); padding: var(--spacing-md);">
          <div class="trace-input-wrap">
            <input type="text" class="trace-input" id="trace-code-input" placeholder="e.g. TT-TBP-041" value="TT-TBP-041">
            <button class="btn btn-primary" id="trace-search-btn">Verify Batch Sourcing</button>
          </div>
          
          <div id="trace-result-viewport">
            <!-- Loaded by JS on interaction -->
          </div>
        </div>
        <div class="text-center" style="margin-top: 20px;">
          <p style="font-size: 0.8rem; color: var(--color-text-light);">Active demo codes: <strong style="color: var(--color-spice);">TT-TBP-041</strong> (Tellicherry Pepper) or <strong style="color: var(--color-spice);">TT-GCD-082</strong> (Green Cardamom).</p>
        </div>
      </div>
    </section>

    <!-- Trust & Compliance Section -->
    <section class="section-padding" style="background-color: var(--color-white); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div class="grid-2" style="align-items:center;">
          <div>
            <h4>Trust & Compliance</h4>
            <h2>Engineered for the UK regulatory standard.</h2>
            <p class="lead">We treat compliance not as a legal hurdle, but as an essential metric of quality. Food safety is scientifically verified.</p>
            <p>Tropic Treasure operates in full alignment with the Hazard Analysis Critical Control Point (HACCP) system. All shipments undergo comprehensive laboratory clearance at UK ports of entry. We maintain active registrations with the UK Food Standards Agency (FSA) and supply wholesale partners with full documentation, including Material Safety Data Sheets (MSDS), certificates of analysis, and technical spec sheets.</p>
            
            <div style="display:flex; flex-direction:column; gap:12px; margin-top:20px;">
              <div style="display:flex; gap:12px; align-items:center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-spice)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span style="font-size:0.9rem; font-weight:500;">HPLC Verified Chemical Active Potency</span>
              </div>
              <div style="display:flex; gap:12px; align-items:center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-spice)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span style="font-size:0.9rem; font-weight:500;">UK Border Force and DEFRA Clearance Ready</span>
              </div>
              <div style="display:flex; gap:12px; align-items:center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-spice)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span style="font-size:0.9rem; font-weight:500;">100% Recyclable High-Barrier Packaging</span>
              </div>
            </div>
          </div>
          
          <div>
            <div class="image-frame">
              <img src="images/lab_testing.png" alt="Compliance Laboratory Sourcing">
              <div class="img-caption">Every batch is evaluated via high-performance liquid chromatography (HPLC) to verify active curcumin, piperine, or volatile oil indices.</div>
            </div>
          </div>
        </div>
        
        <div class="compliance-grid">
          <div class="compliance-card">
            <div class="compliance-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h4>HACCP-Aligned</h4>
            <p>Hazard analysis at every critical point.</p>
          </div>
          
          <div class="compliance-card">
            <div class="compliance-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h4>Lab-Tested Batches</h4>
            <p>Independent residue and microbial panels.</p>
          </div>
          
          <div class="compliance-card">
            <div class="compliance-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <h4>Import-Ready Docs</h4>
            <p>COA, phytosanitary, MOI on every shipment.</p>
          </div>
          
          <div class="compliance-card">
            <div class="compliance-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7-3-3v6l3-3z"/></svg>
            </div>
            <h4>UK Food Standards</h4>
            <p>FSA-compliant labelling and allergen control.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Global initialization of first trace batch search rendering
setTimeout(() => {
  if (AppState.currentView === "home" || AppState.currentView === "track") {
    performTraceabilityLookup("TT-TBP-041");
  }
}, 500);


