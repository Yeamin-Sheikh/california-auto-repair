/**
 * Auto Services & Replacement Parts Catalog
 * Real shop: United Auto Experts, 5022 W Pico Blvd, Los Angeles, CA 90019
 */
export const servicesData = [
  {
    id: 'srv-diag',
    title: 'Computer Diagnostic & OBD-II Scan',
    category: 'Diagnostics',
    price: 89.99,
    duration: '45 mins',
    icon: 'icon-engine',
    description: 'Comprehensive powertrain, sensor, and ECU fault code scan with live California emissions readiness report.'
  },
  {
    id: 'srv-oil',
    title: 'Mobil 1 Synthetic Oil & Filter Service',
    category: 'Maintenance',
    price: 119.95,
    duration: '30 mins',
    icon: 'icon-oil',
    description: 'Up to 5 quarts of premium Mobil 1 full synthetic motor oil, OEM spin-on filter, and 28-point courtesy safety check.'
  },
  {
    id: 'srv-brakes',
    title: 'Ceramic Brake Service & Rotor Truing',
    category: 'Brakes',
    price: 289.00,
    duration: '90 mins',
    icon: 'icon-brakes',
    description: 'Brembo or Akebono low-dust ceramic brake pads, caliper lubrication, hardware renewal, and precision rotor resurfacing.'
  },
  {
    id: 'srv-smog',
    title: 'California STAR Smog Check & Cert',
    category: 'Diagnostics',
    price: 59.75,
    duration: '25 mins',
    icon: 'icon-shield-check',
    description: 'Official California Bureau of Automotive Repair (BAR) certified smog inspection with instant DMV transmission.'
  },
  {
    id: 'srv-ac',
    title: 'A/C Evacuation, Leak Test & Recharge',
    category: 'Climate',
    price: 149.00,
    duration: '60 mins',
    icon: 'icon-wrench',
    description: 'Vacuum leak testing, compressor clutch check, UV dye leak check, and eco-certified R-134a or R-1234yf refrigerant charge.'
  },
  {
    id: 'srv-align',
    title: '4-Wheel Computerized Laser Alignment',
    category: 'Wheels',
    price: 129.99,
    duration: '50 mins',
    icon: 'icon-tire',
    description: 'Hunter digital laser 3D suspension alignment to factory camber, caster, and toe specifications for even tire wear.'
  }
];

export const productsData = [
  {
    id: 'part-brembo-pads',
    title: 'Brembo Ceramic Front Brake Pads',
    category: 'brakes',
    price: 84.99,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Best Seller',
    icon: 'icon-brakes',
    image: 'part-brembo.jpg',
    sku: 'BRM-P06024N',
    specs: 'Direct OEM fit, chamfered edge, zero noise, fits Audi, BMW, Honda, Toyota',
    inStock: true
  },
  {
    id: 'part-mobil1-kit',
    title: 'Mobil 1 0W-20 Synthetic Oil + Filter Kit',
    category: 'fluids',
    price: 54.50,
    rating: 5.0,
    reviewsCount: 310,
    badge: 'Popular',
    icon: 'icon-oil',
    image: 'part-mobil1.jpg',
    sku: 'MOB-0W20-5QT',
    specs: '5 Quarts full synthetic with Mobil 1 Extended Performance M1-110A filter',
    inStock: true
  },
  {
    id: 'part-bosch-wipers',
    title: 'Bosch ICON ClearMax 365 Wiper Blades',
    category: 'accessories',
    price: 46.95,
    rating: 4.8,
    reviewsCount: 98,
    badge: 'California Rain',
    icon: 'icon-wrench',
    image: 'part-bosch.jpg',
    sku: 'BSH-26A20A-SET',
    specs: 'Dual beam spring design with patented ClearMax 365 rubber technology',
    inStock: true
  },
  {
    id: 'part-ngk-plugs',
    title: 'NGK Laser Iridium Spark Plugs (Pack of 4)',
    category: 'engine',
    price: 49.99,
    rating: 4.9,
    reviewsCount: 84,
    badge: 'High Performance',
    icon: 'icon-spark-plug',
    image: 'part-ngk.jpg',
    sku: 'NGK-94460-4PK',
    specs: 'Laser-welded iridium center electrode tip, 100,000 mile service life',
    inStock: true
  },
  {
    id: 'part-optima-battery',
    title: 'Optima YellowTop Deep-Cycle AGM Battery',
    category: 'electrical',
    price: 249.99,
    rating: 4.9,
    reviewsCount: 63,
    badge: 'Heavy Duty',
    icon: 'icon-battery',
    image: 'part-optima.jpg',
    sku: 'OPT-D34-750CCA',
    specs: '12V 750 Cold Cranking Amps, SpiralCell technology, vibration resistant',
    inStock: true
  },
  {
    id: 'part-michelin-tire',
    title: 'Michelin Pilot Sport 4S 245/40ZR19',
    category: 'wheels',
    price: 289.95,
    rating: 5.0,
    reviewsCount: 220,
    badge: 'Track & Street',
    icon: 'icon-tire',
    image: 'part-michelin.jpg',
    sku: 'MCH-PS4S-2454019',
    specs: 'Ultra-high performance summer compound, 300 AA A traction rating',
    inStock: true
  }
];

export const reviewsData = [
  {
    id: 1,
    name: 'Marcus Vance',
    location: 'Culver City, Los Angeles',
    rating: 5,
    date: '3 days ago',
    text: 'United Auto Experts diagnosed my Check Engine warning in under 30 minutes. Clear digital inspection report with photos sent right to my phone. Cleanest shop in LA!'
  },
  {
    id: 2,
    name: 'Elena Rostova',
    location: 'Mid-Wilshire, Los Angeles',
    rating: 5,
    date: '1 week ago',
    text: 'Ordered the Brembo brake pad replacement and booked installation through the site. Seamless process and zero squeaking afterwards. Highly recommended!'
  },
  {
    id: 3,
    name: 'David Chen',
    location: 'Pasadena, CA',
    rating: 5,
    date: '2 weeks ago',
    text: 'STAR smog certification was passed fast. Fair pricing, no surprise fees, and they honor online booking slots without delay.'
  }
];
