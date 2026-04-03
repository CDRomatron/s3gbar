// logic.js
// ------------------------------------------------------------
// Requirement evaluation engine
// Supports:
// - string requirements
// - { and: [...] }
// - { or: [...] }
// - nested logic
// - cycle protection
// ------------------------------------------------------------

function canAccess(req, inventory, visited = new Set()) {
  if (!req) return true;

  // Prevent infinite recursion
  const key = JSON.stringify(req);
  if (visited.has(key)) return false;
  visited.add(key);

  // Simple string requirement
  if (typeof req === "string") {
    return inventory.items.has(req);
  }

  // AND array
  if (Array.isArray(req)) {
    return req.every(r => canAccess(r, inventory, new Set(visited)));
  }

  // AND object
  if (req.and) {
    return req.and.every(r => canAccess(r, inventory, new Set(visited)));
  }

  // OR object
  if (req.or) {
    return req.or.some(r => canAccess(r, inventory, new Set(visited)));
  }

  console.warn("Unknown requirement format:", req);
  return false;
}