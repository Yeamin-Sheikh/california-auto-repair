# California auto repair eCommerce

A responsive eCommerce site and repair booking portal for **United Auto Experts**, an automotive repair shop in Los Angeles, California.

## Business information

- **Business name:** United Auto Experts
- **Location:** 5022 W Pico Blvd, Los Angeles, CA 90019
- **Phone:** (323) 933-5555
- **Certifications:** California Bureau of Automotive Repair (BAR) STAR Certified, ASE Master Technicians
- **Tax configuration:** 9.5% Los Angeles County sales tax

## Key features

- **Service reservation engine:** Schedule maintenance bays for brake repairs, STAR smog inspections, synthetic oil changes, and computerized alignment.
- **Auto parts store:** Order OEM replacement parts (Brembo ceramic pads, Mobil 1 oil kits, Bosch wiper blades, NGK plugs) for local counter pickup or California delivery.
- **Interactive cart system:** Handles item quantities, cart persistence via localStorage, discount vouchers (`CALIF15`), and county tax computation.
- **Repair cost calculator:** Computes repair cost brackets by vehicle type, mileage tier, and mechanical subsystem.
- **Local map and shop specs:** Direct Google Maps navigation link, operating hours, and equipment details.
- **Vector assets and imagery:** Custom automotive SVG sprite set and workshop photography.
- **High-DPI responsive layout:** Optimized for 125% and 150% Windows display scaling and mobile screens.

## Project structure

```
california-auto-repair/
├── assets/
│   ├── images/
│   │   ├── hero.jpg
│   │   └── diagnostic.jpg
│   └── svgs/
│       ├── logo.svg
│       └── icons.svg
├── css/
│   ├── main.css
│   └── components.css
├── js/
│   ├── app.js
│   ├── booking.js
│   ├── cart.js
│   ├── estimator.js
│   └── products.js
├── tests/
│   └── runner.js
├── index.html
├── package.json
└── README.md
```

## Running locally

No build step required. Run with any static HTTP server or Node:

```powershell
# Using Python built-in server
python -m http.server 8000

# Or using Node
npm start
```

Open `http://localhost:8000` in your browser.

## Running tests

Run the automated test suite with Node:

```powershell
npm test
# or
node tests/runner.js
```

## License

MIT License.
