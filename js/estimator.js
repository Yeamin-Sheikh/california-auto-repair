/**
 * Automotive Service Cost Estimator
 * Calculates ballpark estimates based on vehicle mileage bracket and service system.
 */
export function calculateEstimate({ system, mileage, vehicleType = 'standard' }) {
  const baseRates = {
    'brakes': { min: 220, max: 480, label: 'Brake Pads & Rotors' },
    'oil-change': { min: 89, max: 135, label: 'Full Synthetic Service' },
    'transmission': { min: 250, max: 750, label: 'Fluid Flush / Filter Service' },
    'cooling': { min: 180, max: 450, label: 'Radiator & Coolant Flush' },
    'suspension': { min: 350, max: 950, label: 'Shocks, Struts & Bushings' },
    'electrical': { min: 150, max: 600, label: 'Alternator / Starter Diagnostics' },
    'engine-tune': { min: 190, max: 520, label: 'Spark Plugs & Fuel Induction' }
  };

  const selected = baseRates[system] || { min: 120, max: 350, label: 'General Diagnostics' };
  
  let multiplier = 1.0;
  
  // Luxury or European vehicle adjustment
  if (vehicleType === 'luxury') {
    multiplier *= 1.35;
  } else if (vehicleType === 'heavy-truck') {
    multiplier *= 1.25;
  }

  // Mileage wear factor
  const numMileage = Number(mileage) || 0;
  if (numMileage > 100000) {
    multiplier *= 1.2;
  } else if (numMileage > 60000) {
    multiplier *= 1.1;
  }

  const estimatedMin = Math.round(selected.min * multiplier);
  const estimatedMax = Math.round(selected.max * multiplier);

  return {
    systemName: selected.label,
    min: estimatedMin,
    max: estimatedMax,
    average: Math.round((estimatedMin + estimatedMax) / 2),
    multiplier
  };
}
