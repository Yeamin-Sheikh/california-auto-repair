# California auto repair eCommerce

A responsive eCommerce site and repair booking portal for **United Auto Experts**, an automotive repair shop in Los Angeles, California.

## Business information

- Business name: United Auto Experts
- Location: 5022 W Pico Blvd, Los Angeles, CA 90019
- Phone: (323) 933-5555
- Certifications: California Bureau of Automotive Repair (BAR) STAR Certified, ASE Master Technicians
- Tax configuration: 9.5% Los Angeles County sales tax

## Complete site structure (6 full pages)

1. `index.html`: Main landing page with hero, service highlights, OEM parts showcase, and interactive repair cost estimator.
2. `services.html`: Mechanical service catalog for engine diagnostics, brake overhaul, transmission maintenance, California STAR smog checks, computerized wheel alignment, and air conditioning service.
3. `shop.html`: Online parts store for Brembo ceramic pads, Mobil 1 motor oil, Michelin tires, Bosch wipers, Optima batteries, and NGK spark plugs with real-time cart drawer integration.
4. `about.html`: Shop history, ASE certified technician bios, Hunter alignment lift bay specifications, and state licensing credentials.
5. `booking.html`: Appointment reservation system to select service types, select vehicle year/make/model, choose preferred repair dates, and reserve service bays.
6. `contact.html`: Directions, operating hours, direct phone dispatch, and interactive inquiry form.

Every page contains at least 6 high-resolution content photographs, inlined SVG icons eliminating CORS issues when loaded locally or served over HTTP, an interactive cart drawer, and custom context menus.

## Image assets

- `assets/images/hero.jpg`: Main repair shop bay and mechanics at work
- `assets/images/diagnostic.jpg`: OBD2 computerized diagnostics and ECU scanning
- `assets/images/service-engine.jpg`: Engine overhaul and timing chain service
- `assets/images/service-brakes.jpg`: Precision rotor lathe and ceramic brake install
- `assets/images/service-tires.jpg`: Hunter computerized road-force wheel balancing
- `assets/images/shop-exterior.jpg`: Shop entrance and customer parking on Pico Blvd
- `assets/images/inspection-lift.jpg`: Undercarriage suspension inspection on hydraulic lift
- `assets/images/mechanic-team.jpg`: ASE Master Certified technician crew
- `assets/images/tow-truck.jpg`: Emergency roadside flatbed towing vehicle
- `assets/images/part-brembo.jpg`: Brembo ceramic brake pad set
- `assets/images/part-mobil1.jpg`: Mobil 1 advanced full synthetic motor oil 5W-30
- `assets/images/part-michelin.jpg`: Michelin Defender all-season tire
- `assets/images/part-bosch.jpg`: Bosch Icon beam windshield wiper blades
- `assets/images/part-optima.jpg`: Optima YellowTop high-performance AGM battery
- `assets/images/part-ngk.jpg`: NGK Laser Iridium spark plugs

## Key features

- Service reservation engine: Schedule maintenance bays for brake repairs, STAR smog inspections, synthetic oil changes, and computerized alignment
- Auto parts store: Order OEM replacement parts for local counter pickup or California delivery
- Interactive cart system: Handles item quantities, cart persistence via localStorage, discount vouchers (`CALIF15`), and county tax computation
- Repair cost calculator: Computes repair cost brackets by vehicle type, mileage tier, and mechanical subsystem
- Inlined SVG sprites: Guaranteed zero-CORS icon rendering across all browsers and file protocols
- High-DPI responsive layout: Optimized for 125% and 150% Windows display scaling and mobile screens

## Project structure

```
california-auto-repair/
├── assets/
│   ├── images/
│   │   ├── diagnostic.jpg
│   │   ├── hero.jpg
│   │   ├── inspection-lift.jpg
│   │   ├── mechanic-team.jpg
│   │   ├── part-bosch.jpg
│   │   ├── part-brembo.jpg
│   │   ├── part-michelin.jpg
│   │   ├── part-mobil1.jpg
│   │   ├── part-ngk.jpg
│   │   ├── part-optima.jpg
│   │   ├── service-brakes.jpg
│   │   ├── service-engine.jpg
│   │   ├── service-tires.jpg
│   │   ├── shop-exterior.jpg
│   │   └── tow-truck.jpg
│   └── svgs/
│       ├── icons.svg
│       └── logo.svg
├── css/
│   ├── components.css
│   └── main.css
├── js/
│   ├── app.js
│   ├── booking.js
│   ├── cart.js
│   ├── estimator.js
│   └── products.js
├── tests/
│   ├── runner.js
│   └── verify_pages.py
├── about.html
├── booking.html
├── config.json
├── contact.html
├── index.html
├── package.json
├── README.md
├── services.html
└── shop.html
```

## Running locally

Serve using Python or Node:

```powershell
# Using Python built-in server
python -m http.server 8000

# Or using Node
npm start
```

Open `http://localhost:8000` in Google Chrome.

## Automated verification

Run the automated test suite:

```powershell
# Run business logic tests
node tests/runner.js

# Verify all 6 pages have 6+ pictures and working inlined SVG icons
python tests/verify_pages.py
```

## License

MIT License.
