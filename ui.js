// ui.js
// ------------------------------------------------------------
// Spoiler log generator with fixed items placed in the sphere
// where they become accessible.
// ------------------------------------------------------------

function printSpoiler(mapping) {
  const spheres = mapping._spheres;
  let out = "=== SPOILER LOG ===\n\n";

  // Build sphere inventories
  const sphereInventories = [];
  let inv = new Set();

  for (let s = 0; s < spheres.length; s++) {
    sphereInventories[s] = new Set(inv);
    for (const entry of spheres[s]) {
      inv.add(entry.item);
    }
  }

  // Assign fixed items to spheres
  const fixedBySphere = spheres.map(() => []);
  const fixedLocations = window.randomizerTable.filter(e => !e.addresses?.length);

  for (const loc of fixedLocations) {
    const req = loc.requirements;

    let assigned = false;
    for (let s = 0; s < sphereInventories.length; s++) {
      if (canAccess(req, { items: sphereInventories[s], gems: 9999 })) {
        fixedBySphere[s].push({
          location: loc.location,
          item: loc.item
        });
        assigned = true;
        break;
      }
    }

    if (!assigned) {
      fixedBySphere[0].push({
        location: loc.location,
        item: loc.item
      });
    }
  }

  // Print spheres
  for (let s = 0; s < spheres.length; s++) {
    out += `--- Sphere ${s} ---\n`;

    for (const entry of spheres[s]) {
      out += `${entry.location} → ${entry.item}\n`;
    }

    for (const entry of fixedBySphere[s]) {
      out += `${entry.location} → ${entry.item} [Fixed]\n`;
    }

    out += "\n";
  }

  document.getElementById("spoiler").textContent = out;
}