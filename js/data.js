// Tropic Treasure - Structured Sourcing, Product and Journal Database

const PRODUCTS_DB = [
  {
    id: "tellicherry-pepper",
    name: "Tellicherry Black Pepper",
    scientificName: "Piper nigrum",
    origin: "Wayanad, Kerala, India",
    category: "Dehydrated Ingredients",
    image: "images/tellicherry_peppercorns_pouch.jpg",
    caption: "Premium Tellicherry TGSEB (Tellicherry Garbled Special Extra Bold) peppercorns, measuring over 4.75mm, showcasing high piperine density and complex citrus notes.",
    tagline: "The world's most sought-after peppercorn, ripened fully on the vine for maximum piperine content.",
    price: "£12.50",
    unit: "150g Glass Jar",
    discount: "-10%",
    rating: 5,
    reviewsCount: 18,
    originalPrice: "£13.88",
    pdfUrl: "pdf/black_peppercorn_final_copy.pdf",
    bullets: [
      "Single-origin Kerala sourcing",
      "Vine-ripened to absolute maturity",
      "Third-party laboratory tested for pesticides and heavy metals",
      "UK food safety compliant & batch traceable"
    ],
    specs: {
      "Botanical Name": "Piper nigrum L.",
      "Grade": "TGSEB (Tellicherry Garbled Special Extra Bold)",
      "Harvest Region": "Wayanad Hills, Kerala (750m elevation)",
      "Sourcing Sytem": "Direct-from-farm community contracts",
      "Average Size": "4.75mm - 5.00mm",
      "Moisture Content": "11.2% (UK Standard: < 12.0%)",
      "Piperine Percentage": "5.82% (Peak active pungency)",
      "Volatile Oil Content": "2.85% v/w",
      "Aflatoxins": "Undetected (LOD 0.1 ppb)",
      "Microbiological Profile": "Fully pasteurized, salmonella-negative"
    },
    traceabilityCode: "TT-TBP-041",
    sourcingStory: "Grown in the high-elevation bio-diverse forest gardens of Wayanad, our black pepper vines climb tall teak and silver oak trees. Unlike industrial pepper harvests that pluck green berries, our partner farmers harvest only when berries show orange-red hues of complete ripeness, unlocking deep, complex aromatic oils.",
    usage: "Best cracked fresh using a ceramic grinder to release volatile oils immediately before serving. Ideal for red meats, premium reductions, and fine artisanal cheeses.",
    packaging: "Packed in high-barrier recyclable violet glass jars to prevent UV degradation of active piperine compounds.",
    shipping: "Dispatched from our London compliance warehouse via carbon-neutral delivery within 48 hours."
  },
  {
    id: "malabar-cardamom",
    name: "Green Cardamom",
    scientificName: "Elettaria cardamomum",
    origin: "Idukki, Kerala, India",
    category: "Herbal Wellness",
    image: "images/pouch_cardamom.png",
    caption: "Freshly harvested green cardamom pods held in the hands of our lead agricultural supervisor in Kumily, Kerala, representing generations of horticultural skill.",
    tagline: "Sun-dried bold green cardamom, hand-sorted for rich volatile oil concentration.",
    price: "£14.00",
    unit: "100g Glass Jar",
    discount: "-7%",
    rating: 5,
    reviewsCount: 14,
    originalPrice: "£15.05",
    pdfUrl: "pdf/Cardamom_final_copy.pdf",
    bullets: [
      "8mm jumbo grade sorting",
      "No chemical coloring agents used",
      "HPLC-verified volatile oil concentration",
      "Sourced from rain-fed smallholdings"
    ],
    specs: {
      "Botanical Name": "Elettaria cardamomum Maton",
      "Grade": "Jumbo Bold (8mm+)",
      "Harvest Region": "Cardamom Hills, Idukki, Kerala (900m-1100m elevation)",
      "Sourcing Sytem": "Direct farmgate purchasing, fair trade premium paid",
      "Moisture Content": "9.5% (Optimal stability)",
      "Volatile Oil Content": "4.20% v/w (Mainly 1,8-cineole & alpha-terpinyl acetate)",
      "Sulfite Treatment": "0% (Completely sulfur-free dried)",
      "Pesticide Residues": "Compliant with EU/UK MRL databases",
      "Aflatoxins B1+B2+G1+G2": "Undetected"
    },
    traceabilityCode: "TT-GCD-082",
    sourcingStory: "The moist, misty slopes of Idukki's cloud forests receive over 3,000mm of rain annually, creating the perfect canopy environment for the cardamom shrub. The pods are hand-plucked at the exact moment of seed maturity and transferred immediately to solar-hybrid drying chambers to seal in their sweet, eucalyptus-like volatility.",
    usage: "Lightly crush pods to expose black seeds inside. Simmer in hot water for herbal infusions, brew with specialty coffee, or infuse into premium bakery recipes.",
    packaging: "Recycled amber glass with airtight aluminum sealing lid to prevent oxidation of delicate volatile monoterpenes.",
    shipping: "Distributed from our UK logistics center, compliant with DEFRA regulations."
  },
  {
    id: "cochin-ginger",
    name: "Premium Ginger Powder",
    scientificName: "Zingiber officinale",
    origin: "Cochin, Kerala, India",
    category: "Dehydrated Ingredients",
    image: "images/pouch_ginger.png",
    caption: "Laboratory verification of gingerol concentration in our Cochin ginger powder, ensuring high physiological activity and warming notes.",
    tagline: "Sun-dried Cochin ginger root, ground to an ultra-fine 80 mesh for optimal dissolution.",
    price: "£9.80",
    unit: "125g Resealable Pouch",
    discount: "-5%",
    rating: 4.8,
    reviewsCount: 9,
    originalPrice: "£10.32",
    pdfUrl: "pdf/ginger_powder_final_copy.pdf",
    bullets: [
      "Traditional Cochin ginger variety",
      "No anti-caking agents or fillers",
      "High [6]-gingerol content for natural potency",
      "Pristine laboratory verified purity"
    ],
    specs: {
      "Botanical Name": "Zingiber officinale Roscoe",
      "Grade": "Micro-milled (80 Mesh)",
      "Harvest Region": "Perumbavoor, Cochin, Kerala",
      "Sourcing Sytem": "Women's farming cooperative contract",
      "Moisture Content": "7.8% (Highly shelf-stable)",
      "Active [6]-Gingerol": "2.12% w/w (Verified via HPLC)",
      "Fiber Content": "Less than 3.5%",
      "Starch Content": "Natural, unmodified",
      "Microbiological Safety": "Certified Steam-Sterilized (SS)"
    },
    traceabilityCode: "TT-GGP-019",
    sourcingStory: "Cochin ginger is globally renowned for its low fiber content and high aromatic warmth. Our ginger is peeled and dried using natural sunlight on clean bamboo mats, then ground in a state-of-the-art cold-milling facility in Cochin to prevent heat-induced loss of volatile gingerol compounds.",
    usage: "Highly dissolvable, perfect for functional wellness drinks, golden lattes, medicinal teas, and fine baking applications.",
    packaging: "Puncture-resistant high-barrier compostable paper pouch with resealable zipper.",
    shipping: "UK nationwide shipping within 2-3 business days."
  },
  {
    id: "kollam-cashews",
    name: "Cashew Kernels (W180)",
    scientificName: "Anacardium occidentale",
    origin: "Kollam, Kerala, India",
    category: "Lifestyle & Craft",
    image: "images/pouch_cashew_beige.png",
    caption: "Neatly prepared and vacuum-packed W180 Cashews in our UK-bound warehouse, ensuring absolute freshness and prevention of moisture absorption.",
    tagline: "Jumbo White W180 Cashews - the largest and creamiest kernels globally.",
    price: "£18.50",
    unit: "400g Kraft Tub",
    discount: "-12%",
    rating: 5,
    reviewsCount: 22,
    originalPrice: "£21.00",
    pdfUrl: "pdf/Cashew_Beige_copy.pdf",
    bullets: [
      "Grade W180 - King of Cashews (180 nuts per pound)",
      "100% whole kernels, unsalted and unroasted",
      "Strict vacuum packing to prevent rancidity",
      "Ethical processing with fair-wage verification"
    ],
    specs: {
      "Botanical Name": "Anacardium occidentale L.",
      "Grade": "W180 (Super Jumbo)",
      "Harvest Region": "Kollam Hills, Kerala",
      "Processing Standard": "HACCP Certified, manual shell cracking",
      "Moisture Content": "4.5% (Ensures signature crunch)",
      "Free Fatty Acids (FFA)": "0.15% max (Pristine oil stability)",
      "Broken Count": "< 1% (Rigorous screening)",
      "Sourcing Ethos": "Verified Fair-Wage processing centers"
    },
    traceabilityCode: "TT-CSW-074",
    sourcingStory: "Kollam has been the cashew capital of the world for over a century. Our cashews are grown by family smallholders in the sandy coastal hills, hand-harvested, and shelled by skilled artisans in a cooperative that guarantees fair wages, safe working conditions, and complete healthcare coverage for female processors.",
    usage: "Enjoy raw as a highly nutritious snack, or blend with warm water to create a luxurious, dairy-free vegan cream base.",
    packaging: "Packed in carbon-dioxide flushed reusable paperboard tubs to preserve crispness and natural sweet fats.",
    shipping: "Hand-delivered or posted from our London hub."
  },
  {
    id: "ceylon-cinnamon",
    name: "Ceylon Cinnamon",
    scientificName: "Cinnamomum verum",
    origin: "Nilambur Hills, Kerala, India",
    category: "Dehydrated Ingredients",
    image: "images/pouch_cinnamon.png",
    caption: "Premium Ceylon Cinnamon quills (C5 grade), hand-harvested and air-dried to preserve delicate sweet oils.",
    tagline: "True Ceylon Cinnamon quills, organic, delicate and sweet with low coumarin content.",
    price: "£11.00",
    unit: "100g Resealable Pouch",
    discount: "-8%",
    rating: 4.9,
    reviewsCount: 11,
    originalPrice: "£11.95",
    pdfUrl: null,
    bullets: [
      "True Cinnamomum verum quills",
      "Low coumarin content for daily use",
      "Sourced from organic certified plantations",
      "Delicate, sweet, and aromatic flavor profile"
    ],
    specs: {
      "Botanical Name": "Cinnamomum verum J.Presl",
      "Grade": "C5 Premium Quills",
      "Harvest Region": "Nilambur Hills, Kerala",
      "Sourcing Sytem": "Direct farmgate buying contracts",
      "Moisture Content": "10.5% max",
      "Volatile Oil Content": "1.80% v/w (Mainly cinnamaldehyde)",
      "Coumarin Level": "< 0.005% (Extremely low)",
      "Pesticide Residues": "Undetected (EU/UK compliant)",
      "Aflatoxins": "Undetected"
    },
    traceabilityCode: "TT-CIN-032",
    sourcingStory: "Sourced directly from rain-fed family plantations in Nilambur, our true Ceylon cinnamon is peeled by hand using traditional brass rods, creating paper-thin quills. It is then dried in shade-houses to preserve its sweet, low-coumarin essential oils.",
    usage: "Grate fresh into premium baking, simmer in milk/coffee, or grind into spice blends.",
    packaging: "Puncture-resistant high-barrier compostable paper pouch with resealable zipper.",
    shipping: "UK nationwide shipping within 2-3 business days."
  },
  {
    id: "teakwood-grinder",
    name: "Handcrafted Teakwood Grinder",
    scientificName: "Tectona grandis (Teak)",
    origin: "Nilambur, Kerala, India",
    category: "Lifestyle & Craft",
    image: "images/hero_plantation.png",
    caption: "Our handcrafted Nilambur Teakwood Grinder shown in our plantation studio. Each piece features unique grain flows and a premium ceramic mechanism.",
    tagline: "Indestructible Nilambur teakwood housing with adjustable Danish ceramic mechanism.",
    price: "£35.00",
    unit: "Single 8-inch Grinder",
    discount: null,
    rating: 4.7,
    reviewsCount: 5,
    originalPrice: null,
    pdfUrl: null,
    bullets: [
      "Sustainably harvested estate teakwood",
      "Corrosion-resistant adjustable ceramic mechanism",
      "No chemical lacquers - finished with organic flaxseed oil",
      "Designed for Tellicherry peppercorns"
    ],
    specs: {
      "Material Sourcing": "Nilambur Teak Forest estates (FSC certified)",
      "Craftsmanship": "Hand-lathed by master woodturners in Kerala",
      "Grinder Mechanism": "CrushGrind® Ceramic (Denmark, lifetime warranty)",
      "Height": "20.5 cm (8 inches)",
      "Finish": "Cold-pressed local organic linseed and beeswax",
      "Metal Parts": "Marine-grade stainless steel spindle",
      "Assembly Location": "Sourcing Workshop, Cochin, Kerala"
    },
    traceabilityCode: "TT-WGR-005",
    sourcingStory: "Nilambur is famous for hosting the world's oldest teak plantations. The wood is naturally rich in silica and defensive oils, making it resistant to moisture and kitchen steam. Each grinder is lathed from a single piece of seasoned heartwood by traditional woodworkers, ensuring that no two grinders look alike.",
    usage: "Adjust the bottom dial to switch from ultra-fine powder (ideal for sauces) to coarse cracked pepper (ideal for dry rubs). Clean with a dry brush.",
    packaging: "Wrapped in local handloom cotton cloth and nested in a rigid stone-white paper presentation box.",
    shipping: "Shipped globally from London, gift wrap options available."
  }
];

const GLOSSARY_DB = [
  {
    name: "Tellicherry Black Pepper",
    type: "Spice / Whole",
    botanical: "Piper nigrum",
    marker: "Piperine (5.8%)",
    role: "Culinary & Bio-enhancer",
    region: "Wayanad, Kerala",
    description: "Hand-harvested only when vine-ripened to a deep red color. Superior density and citrus undertone."
  },
  {
    name: "Green Cardamom",
    type: "Spice / Pods",
    botanical: "Elettaria cardamomum",
    marker: "1,8-cineole (4.2%)",
    role: "Aromatherapy & Digestion",
    region: "Idukki, Kerala",
    description: "Grown in high-altitude shade gardens, hand-harvested and dried immediately under precise temperature controls."
  },
  {
    name: "Cochin Ginger Root",
    type: "Rhizome / Powder",
    botanical: "Zingiber officinale",
    marker: "[6]-Gingerol (2.1%)",
    role: "Anti-inflammatory & Culinary",
    region: "Perumbavoor, Kerala",
    description: "Sun-dried on clean mats and cold-milled to preserve active gingerol compounds. Exceptionally low fiber content."
  },
  {
    name: "Lemongrass Oil",
    type: "Essential Oil",
    botanical: "Cymbopogon citratus",
    marker: "Citral (75.5%)",
    role: "Aromatherapy & Antiseptic",
    region: "Marayoor, Kerala",
    description: "Steam-distilled from fresh sugarcane-type grass blades, offering intense citrus clarity and calming properties."
  },
  {
    name: "Lakadong Turmeric",
    type: "Rhizome / Powder",
    botanical: "Curcuma longa",
    marker: "Curcumin (7.5%)",
    role: "Anti-inflammatory & Wellness",
    region: "Northeastern Hills / Kerala Sourced",
    description: "Premium high-curcumin variety sourced with full documentation and heavy metal laboratory screening."
  },
  {
    name: "Nutmeg & Mace",
    type: "Seed & Aril",
    botanical: "Myristica fragrans",
    marker: "Myristicin (1.2%)",
    role: "Spice / Botanical extract",
    region: "Angamaly, Kerala",
    description: "Dual crop yielding a warm, sweet seed kernel (Nutmeg) and a brilliant crimson lacy covering (Mace)."
  }
];

const JOURNAL_DB = [
  {
    id: "tellicherry-difference",
    title: "What makes Tellicherry pepper different",
    category: "Spice Quality",
    excerpt: "Berry size, piperine concentration and the harvest decision that costs growers a fortnight.",
    author: "Dr. Elizabeth Vance, Sourcing Botanist",
    date: "May 15, 2026",
    readTime: "6 min read",
    caption: "Ripening peppercorns transition from bright green to deep crimson on the vine, signifying maximum chemical complexity.",
    image: "images/macro_pepper.png",
    content: `
      <p class="drop-cap">T</p><p>he culinary world throw around the word "Tellicherry" with casual frequency. Yet, in modern industrial retail, true Tellicherry Garbled Special Extra Bold (TGSEB) pepper represents less than 2% of the global crop. Understanding this difference is not merely a matter of gourmet snobbery—it is an exercise in basic organic chemistry.</p>
      <h3>The Vine-Ripening Threshold</h3>
      <p>Standard commodity black pepper is stripped from the vine while entirely green and immature. It is then quickly boiled and machine-dried. This process yields a hot, generic bite but strips away the essential oil matrix. In contrast, our Wayanad farmers leave the berries on the vine until they begin to transition to yellow and deep red. This extended growth phase allows the piperine content to reach its peak density (5.8% compared to the standard 3-4% in commodity pepper) and enables the development of complex terpene structures.</p>
      <blockquote>
        "Peppercorns are like wine grapes. Harvest them too early, and you have simple acidity. Wait for maturity, and you capture the soul of the terroir."
      </blockquote>
      <h3>The Grading Calibration</h3>
      <p>To qualify as TGSEB, the dried peppercorns must pass through screens that sort for size. Only peppercorns measuring 4.75 millimeters in diameter or larger are selected. A larger, fully matured peppercorn has a perfectly balanced ratio of skin-to-seed, yielding a rounder, more complex heat with distinct notes of citrus and wood rather than a flat, nose-singeing burn.</p>
    `
  },
  {
    id: "slow-rise-moringa",
    title: "Moringa: the slow rise of a UK staple",
    category: "Wellness",
    excerpt: "From village leaf to clinically reviewed adaptogen — a brief history of Moringa oleifera.",
    author: "Fiona Cunningham, Wellness Researcher",
    date: "May 08, 2026",
    readTime: "8 min read",
    caption: "Moringa oleifera leaves drying under controlled solar domes to preserve fragile amino acids.",
    image: "images/hero_plantation.png",
    content: `
      <p class="drop-cap">M</p><p>oringa oleifera has transitioned from a backyard remedy in rural Kerala to one of the UK’s most sought-after nutritional supplements. Yet, behind its rise is a complex botanical profile that warrants scientific attention rather than generic wellness slogans.</p>
      <h3>Nutritional Profile</h3>
      <p>The leaves of the Moringa tree contain high concentrations of vitamins A, C, and E, alongside a complete profile of essential amino acids. The challenge lies in drying the leaf. If exposed to open sun or excessive heat, the proteins denature and the vitamins oxidise. By utilizing low-temperature solar dome dryers, we maintain the bright green color of the powder, which acts as a visual indicator of chlorophyll and nutrient retention.</p>
    `
  },
  {
    id: "kerala-heritage-estates",
    title: "A short history of Kerala's spice estates",
    category: "Heritage",
    excerpt: "From Roman trade routes to the modern estate system. Two thousand years of continuity.",
    author: "Anjali Menon, Agronomist",
    date: "May 02, 2026",
    readTime: "11 min read",
    caption: "Historical stone-carved trade markers found near old Muziris shipping ports.",
    image: "images/farmer_hands.png",
    content: `
      <p class="drop-cap">K</p><p>erala has been the spice garden of the ancient world for over three thousand years. Roman galleons, Phoenician traders, and Arab dhows braved the monsoon oceans to reach ports like Muziris, drawn by the unique quality of spices grown in the moist, warm soils of the Malabar Coast.</p>
      <h3>Polyculture Agroforestry</h3>
      <p>Historically, spices were not grown in clear-cut monomorphic fields. Traditional Kerala spices are cultivated in multi-layered agroforestry systems. Here, cardamom shrubs grow in the damp shade of tall fruit and timber trees, preserving groundwater channels and supporting a rich variety of bird and insect life that keeps pests in check naturally.</p>
    `
  },
  {
    id: "understanding-traceability",
    title: "Inside the UK spice import standard",
    category: "Compliance",
    excerpt: "Aflatoxin caps, ETO bans, and what they mean for the brands stocking your shelf.",
    author: "Marcus Thorne, Supply Director",
    date: "April 28, 2026",
    readTime: "7 min read",
    caption: "Our direct shipping containers are sealed at origin in Cochin and only opened in our UK compliance facility.",
    image: "images/trade_warehouse.png",
    content: `
      <p class="drop-cap">T</p><p>he average jar of spice on a supermarket shelf has traveled through six intermediaries. By the time it is labeled, the name of the farmer who grew it is entirely lost. Blended sourcing exists to achieve absolute price minimization, but it hides severe risks.</p>
      <h3>Chemical Regulations and Bans</h3>
      <p>The UK Food Standards Agency enforces strict limits on aflatoxins and microbiological counts. To sterilize blended batches of poor quality, commercial packers frequently turn to ethylene oxide (ETO) fumigation. ETO is classified as a carcinogen and is banned in the UK. At Tropic Treasure, we prevent contamination at the source through clean harvesting and steam pasteurization, avoiding chemical treatments entirely.</p>
    `
  },
  {
    id: "case-against-air-drying",
    title: "The case against air-drying",
    category: "Process",
    excerpt: "Why we sun-cure at low temperature — and what it costs us in throughput.",
    author: "KP Raghavan, Operations Director",
    date: "April 15, 2026",
    readTime: "5 min read",
    caption: "Specially calibrated solar-dehydration frames that control airflow and humidity.",
    image: "images/lab_testing.png",
    content: `
      <p class="drop-cap">A</p><p>ir drying spices in open, humid environments invites microbial hazards. Under the moist conditions of Kerala's high ranges, slow air-drying creates an ideal environment for mold growth, leading to high aflatoxin levels that fail UK borders.</p>
      <h3>Solar-Dome Dehydration</h3>
      <p>Tropic Treasure utilizes precision solar-dome drying. These domes maintain a constant temperature of 45-50°C and optimize airflow to dry spices within 48 hours. While this reduces our total volume throughput compared to industrial high-heat ovens, it prevents both microbial growth and the loss of heat-sensitive volatile oils.</p>
    `
  },
  {
    id: "essential-oils-understood",
    title: "Essential oils, properly understood",
    category: "Botanicals",
    excerpt: "What the term means, what it doesn't, and how to read a GC-MS report.",
    author: "Dr. Elizabeth Vance, Sourcing Botanist",
    date: "March 24, 2026",
    readTime: "9 min read",
    caption: "Vapor distillation equipment extracting pure botanical oils at our Cochin facility.",
    image: "images/macro_turmeric.png",
    content: `
      <p class="drop-cap">E</p><p>ssential oils are highly concentrated volatile secondary metabolites extracted from plants. In retail, synthetic fragrances are frequently labeled as natural extracts, misleading buyers who seek therapeutic or culinary integrity.</p>
      <h3>The GC-MS Ledger</h3>
      <p>To verify the purity of an oil, we perform Gas Chromatography-Mass Spectrometry (GC-MS) analysis. A GC-MS report maps every single chemical compound in the oil, revealing any synthetic adulterants or diluent carrier oils. We publish these logs for every batch, ensuring transparency you can verify.</p>
    `
  }
];

const TRACEABILITY_LOGS = {
  "TT-TBP-041": {
    product: "Tellicherry Black Pepper",
    batch: "TT-TBP-041",
    farmerGroup: "Wayanad Organic Farmers Collective (Group B-12)",
    harvestDate: "February 2026",
    dryingMethod: "Solar-Dome Clean Dehydration",
    dryingDate: "February 12-14, 2026",
    purityTest: "Passed (100% Piper nigrum, Steam Pasteurization)",
    chemicalProfile: {
      "Piperine Concentration": "5.82% w/w (HPLC Verified)",
      "Volatile Oils": "2.85% v/w",
      "Moisture": "11.20%"
    },
    contaminants: {
      "Pesticide Residues": "Undetected (Checked for 126 chemicals)",
      "Aflatoxins": "Undetected (LOD < 0.1 ppb)",
      "Lead / Heavy Metals": "0.02 ppm (Strictly below UK limits)"
    },
    transitLog: [
      { date: "Feb 22, 2026", status: "Quality Checked & Packed in Cochin Warehouse" },
      { date: "Feb 28, 2026", status: "Loaded onto Container (HL-9201), Port of Cochin" },
      { date: "Mar 24, 2026", status: "Arrived at Port of London, UK Customs Cleared" },
      { date: "Apr 02, 2026", status: "Transferred to London Compliance Center, Batch Released" }
    ],
    documentLink: "#"
  },
  "TT-GCD-082": {
    product: "Green Cardamom",
    batch: "TT-GCD-082",
    farmerGroup: "High Range Cardamom Cultivators Coop, Kumily",
    harvestDate: "January 2026",
    dryingMethod: "Precision Biomass Heated Solar Dryer",
    dryingDate: "January 18-20, 2026",
    purityTest: "Passed (Grade 8mm Jumbo Bold, natural color)",
    chemicalProfile: {
      "Volatile Oil Density": "4.20% v/w (Mainly cineole)",
      "Moisture": "9.50%"
    },
    contaminants: {
      "Pesticide Residues": "Undetected (Compliant with UK MRL)",
      "Aflatoxins": "Undetected",
      "Sulfur Dioxide (SO2)": "0.00% (Completely clean)"
    },
    transitLog: [
      { date: "Feb 05, 2026", status: "Graded & Sorted, Kumily Facility" },
      { date: "Feb 10, 2026", status: "Sealed in Hermetic Bags, Shipped to Cochin Port" },
      { date: "Feb 15, 2026", status: "Departed Cochin Port aboard Vessel 'CMA CGM India'" },
      { date: "Mar 18, 2026", status: "Arrived Port of Southampton, Custom Cleared" },
      { date: "Mar 25, 2026", status: "Arrived at London Logistics Hub, Quality Released" }
    ],
    documentLink: "#"
  },
  "TT-GGP-019": {
    product: "Premium Ginger Powder",
    batch: "TT-GGP-019",
    farmerGroup: "Sree Narayana Women's Coop, Perumbavoor",
    harvestDate: "December 2025",
    dryingMethod: "Peeled and Bamboo-mat Dried",
    dryingDate: "December 15-18, 2025",
    purityTest: "Passed (80 mesh fine grade, steam sterilized)",
    chemicalProfile: {
      "Active [6]-Gingerol": "2.12% w/w",
      "Moisture": "7.80%"
    },
    contaminants: {
      "Pesticide Residues": "Undetected",
      "Aflatoxins": "Undetected",
      "Fiber Residue": "2.80% (Extra low)"
    },
    transitLog: [
      { date: "Jan 03, 2026", status: "Peeled & Sun Dried, Cooperative Center" },
      { date: "Jan 08, 2026", status: "Cold-Milled to 80 Mesh, Cochin Processing" },
      { date: "Jan 15, 2026", status: "Shipped from Cochin aboard Vessel 'MSC Jasmine'" },
      { date: "Feb 18, 2026", status: "Arrived Port of Felixstowe, Custom Clearance" },
      { date: "Feb 25, 2026", status: "Received & Repacked in London Compliance Depot" }
    ],
    documentLink: "#"
  }
};

// --- Recipes & Tastymonials Database ---

const RECIPES_INITIAL_DB = [
  {
    id: "stuffed-bell-pepper",
    title: "Stuffed Bell Pepper",
    subtitle: "A colorful, spice-infused vegetarian center-piece",
    category: "DINNER",
    excerpt: "Sweet bell pepper halves stuffed with a fragrant spiced potato and paneer filling, baked to tender perfection.",
    author: "Chef Harish Pillai, Kerala Fusion Kitchen",
    date: "May 20, 2026",
    readTime: "8 min read",
    image: "images/stuffed_bell_pepper.png",
    caption: "Sweet red and yellow bell pepper halves filled with seasoned paneer, fresh cilantro, and warm aromatic spices.",
    prepTime: "15 Minutes",
    cookTime: "25 Minutes",
    difficulty: "Medium",
    description: "This recipe brings together the natural sweetness of bell peppers and the warm comfort of a potato-paneer mash seasoned with our Tellicherry black pepper and fresh garam masala. It represents the perfect fusion of traditional Indian spices and modern European presentation.",
    ingredients: [
      "3 medium Bell Peppers (split lengthwise, deseeded)",
      "3 medium Potatoes (boiled, peeled, and mashed)",
      "1 cup Paneer or Tofu (crumbled)",
      "1 small Red Onion (finely chopped)",
      "2 tablespoons Fresh Cilantro (chopped)",
      "1/2 teaspoon Garam Masala (Tropic Treasure)",
      "1/2 teaspoon Red Chili Powder (Tropic Treasure)",
      "1/2 teaspoon Freshly Cracked Tellicherry Black Pepper (Tropic Treasure)",
      "2 tablespoons Coconut Oil or Ghee",
      "Salt to taste"
    ],
    steps: [
      "Cut the bell peppers in half lengthwise, removing the seeds and membranes while keeping the stems intact for presentation.",
      "Heat coconut oil or ghee in a pan. Add the chopped onions and sauté over medium heat until translucent and lightly golden.",
      "Stir in the mashed potatoes, crumbled paneer, garam masala, red chili powder, salt, and freshly cracked black pepper. Mix thoroughly for 3-4 minutes to allow the spices to bloom.",
      "Remove the pan from heat and fold in the fresh chopped cilantro.",
      "Stuff each bell pepper half generously with the potato-paneer mixture.",
      "Place the stuffed peppers in a baking dish. Bake in a preheated oven at 180°C (350°F) for 20-25 minutes until the peppers are tender and the top is lightly browned. Serve warm."
    ]
  },
  {
    id: "veg-makhani-wrap",
    title: "Veg Makhani Wrap",
    subtitle: "Creamy cardamom-scented vegetable curry wrapped in a warm flatbread",
    category: "LUNCH",
    excerpt: "Fresh garden vegetables simmered in a rich tomato-butter gravy with aromatic cardamom and ginger, rolled into a handheld wrap.",
    author: "Anjali Menon, Sourcing Director & Home Chef",
    date: "May 12, 2026",
    readTime: "10 min read",
    image: "images/veg_makhani_wrap.png",
    caption: "Warm flatbread wraps filled with a thick, creamy vegetable makhani gravy, rolled tightly and sliced diagonally.",
    prepTime: "20 Minutes",
    cookTime: "15 Minutes",
    difficulty: "Easy",
    description: "The secret to a great makhani gravy lies in the aromatics. We use our jumbo green cardamom pods and sun-dried ginger powder to create a rich, complex spice base that cuts through the creaminess of the butter and tomatoes. This wrap is an excellent lunch-box staple.",
    ingredients: [
      "4 tablespoons Butter (or vegan butter)",
      "2 tablespoons Oil",
      "1 Green Chili (finely slit)",
      "1 tablespoon Garlic Paste",
      "1/2 teaspoon Ginger Powder (Tropic Treasure)",
      "3 Green Cardamom Pods (crushed, seeds exposed, Tropic Treasure)",
      "2 tablespoons Kashmiri Red Chili Powder (for color and mild heat)",
      "3 medium Tomatoes (pureed)",
      "1/2 cup Heavy Cream (or coconut cream)",
      "1.5 cups Mixed Vegetables (sliced carrots, green peas, sweet corn, baby corn)",
      "4 Flatbreads or Tortillas",
      "Salt to taste"
    ],
    steps: [
      "Heat butter and oil in a heavy-bottomed pan. Add the crushed green cardamom pods and sauté for 1 minute until fragrant.",
      "Add garlic paste and green chili, sautéing for another minute until cooked.",
      "Pour in the tomato puree, ginger powder, red chili powder, and salt. Cook on medium-low heat until the oil separates from the tomato paste (about 6-8 minutes).",
      "Add the mixed vegetables and simmer for 5 minutes until they are tender-crisp.",
      "Lower the heat and stir in the heavy cream. Let it simmer gently for 2 minutes to thicken the gravy. Remove from heat.",
      "Place a flatbread on a clean surface. Spoon a generous portion of the makhani mixture down the center. Wrap tightly, cut in half, and serve hot."
    ]
  },
  {
    id: "roasted-green-bean",
    title: "Roasted Green Bean Recipe",
    subtitle: "Simple, blistered green beans with cracked black pepper and sea salt",
    category: "SIDE DISH",
    excerpt: "Crispy, oven-blistered green beans tossed with extra virgin olive oil, garlic, and fresh cracked Tellicherry pepper.",
    author: "Dr. Elizabeth Vance, Sourcing Botanist",
    date: "April 29, 2026",
    readTime: "5 min read",
    image: "images/lab_testing.png",
    caption: "Crispy roasted green beans tossed with garlic, coarse sea salt, and extra Tellicherry black pepper.",
    prepTime: "10 Minutes",
    cookTime: "10 Minutes",
    difficulty: "Easy",
    description: "Often the simplest dishes show off the quality of an ingredient best. These blistered green beans rely entirely on the high-volatility citrus notes of our vine-ripened Tellicherry black pepper to lift them into something truly extraordinary.",
    ingredients: [
      "400g Fresh Green Beans (trimmed)",
      "2 tablespoons Extra Virgin Olive Oil",
      "3 Cloves Garlic (thinly sliced)",
      "1 teaspoon Tellicherry Black Pepper (coarsely cracked, Tropic Treasure)",
      "1/2 teaspoon Flaky Sea Salt"
    ],
    steps: [
      "Preheat your oven to 220°C (425°F) or prep a large cast-iron skillet on high heat.",
      "Toss the trimmed green beans with extra virgin olive oil, sliced garlic, and sea salt in a mixing bowl until evenly coated.",
      "Spread the green beans in a single layer on a baking sheet or transfer directly to the hot cast-iron skillet.",
      "Roast for 10-12 minutes, tossing halfway through, until the beans are tender and blistered with light brown spots.",
      "Remove from heat and immediately toss with the coarsely cracked Tellicherry black pepper. Serve immediately while hot and crispy."
    ]
  }
];

const TESTIMONIALS_INITIAL_DB = [
  {
    id: "t1",
    rating: 5,
    title: "very nice",
    text: "The Tellicherry special bold peppercorns are a revelation. They are actually bold and dry, not dust-filled. You can feel the intense piperine heat and strong citrus notes. Standard supermarket black pepper is totally ruined for me now.",
    author: "Christopher R.",
    product: "Tellicherry Black Pepper",
    location: "London, UK",
    date: "May 18, 2026"
  },
  {
    id: "t2",
    rating: 5,
    title: "good products",
    text: "This green cardamom is fresh and intensely aromatic. The pods are beautifully green, dry, and plump, with no chemical dyes or sulfur treatment. The seeds inside are sticky and black, proving high volatile oil concentration.",
    author: "Dr. David Harrison",
    product: "Green Cardamom",
    location: "Brighton, UK",
    date: "May 14, 2026"
  },
  {
    id: "t3",
    rating: 5,
    title: "Perfect blend of spices",
    text: "Used their Cochin ginger powder in my bakery recipes. Dissolves perfectly, zero fiber strands in the flour mix, and provides a beautiful, clean, warming ginger flavor. Compliant certifications make it easy to recommend.",
    author: "Sarah Jenkins",
    product: "Premium Ginger Powder",
    location: "Edinburgh, UK",
    date: "May 09, 2026"
  },
  {
    id: "t4",
    rating: 5,
    title: "Super creamy cashews",
    text: "The W180 cashews are massive and incredibly sweet. Unroasted and unsalted, they make the most luxurious cashew milk and vegan cream base. It is great to see the direct sourcing coop name published.",
    author: "Clara Hughes",
    product: "Cashew Kernels (W180)",
    location: "Manchester, UK",
    date: "May 03, 2026"
  }
];

// --- Simulated Database (localStorage Sync) ---

function getRecipes() {
  const data = localStorage.getItem("tropic_treasure_recipes");
  if (!data) {
    localStorage.setItem("tropic_treasure_recipes", JSON.stringify(RECIPES_INITIAL_DB));
    return RECIPES_INITIAL_DB;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return RECIPES_INITIAL_DB;
  }
}

function saveRecipe(recipe) {
  const recipes = getRecipes();
  recipes.unshift(recipe); // Add new recipe to the top
  localStorage.setItem("tropic_treasure_recipes", JSON.stringify(recipes));
}

function getTestimonials() {
  const data = localStorage.getItem("tropic_treasure_testimonials");
  if (!data) {
    localStorage.setItem("tropic_treasure_testimonials", JSON.stringify(TESTIMONIALS_INITIAL_DB));
    return TESTIMONIALS_INITIAL_DB;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return TESTIMONIALS_INITIAL_DB;
  }
}

function saveTestimonial(testimonial) {
  const testimonials = getTestimonials();
  testimonials.unshift(testimonial); // Add new testimonial to the top
  localStorage.setItem("tropic_treasure_testimonials", JSON.stringify(testimonials));
}

