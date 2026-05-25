function shuffleArray(arr) {
	const copy = [...arr];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
}

function generateMapVanilla(){
	
	return ["FL","YS","BB","TG","RH","BS","KH","MM","CS","PL","RC","CR"]
}

function generateMapOriginal(placeCRAtEnd) {

	levels = ["","","","","","","","","","","",""]
	
	//place MM first
	
	doubleLevels = ["MM","PL","RC"]
	singleLevels = []
	
	if (placeCRAtEnd) {
		levels[11] = "CR"
		singleLevels = ["FL","YS","BB","TG","RH","BS","KH","CS"]
	}
	else
	{
		singleLevels = ["FL","YS","BB","TG","RH","BS","KH","CS","CR"]
	}
	
	//doubleLevels = shuffleArray(doubleLevels)
	levels[7] = doubleLevels[0]
	levels[9] = doubleLevels[1]
	levels[10] = doubleLevels[2]
	
	singleLevels = shuffleArray(singleLevels)
	levels[0] = singleLevels[0]
	levels[1] = singleLevels[1]
	levels[2] = singleLevels[2]
	levels[3] = singleLevels[3]
	levels[4] = singleLevels[4]
	levels[5] = singleLevels[5]
	levels[6] = singleLevels[6]
	levels[8] = singleLevels[7]
	
	if (!placeCRAtEnd) {
		levels[11] = singleLevels[8]
	}
	
	return levels
	
}

function generateMapMixed() {
	
	
	
}

function getLevelIDs(levelCode) {

	if(levelCode == "FL")
		return ["4B","4C","4D","4E","4F","50","51","52"]
	if(levelCode == "YS")
		return ["53","54","55","56","57","58","59","5A"]
	if(levelCode == "BB")
		return ["5B","5C","5D","5E","5F","60","61","62"]
	if(levelCode == "TG")
		return ["63","64","65","66","67","68","69","6A"]
	if(levelCode == "RH")
		return ["6B","6C","6D","6E","6F","70","71","72"]
	if(levelCode == "BS")
		return ["73","74","76","77","78","79","7A"]
	if(levelCode == "KH")
		return ["7B","7C","7E","7F","80","81","82"]
	if(levelCode == "MM")
		return ["83","84","85","86","87","88","89","8A"]
	if(levelCode == "CS")
		return ["8B","8C","8D","8E","8F","90","91","92"]
	if(levelCode == "PL")
		return ["93","94","95","96","97","98","99","9A"]
	if(levelCode == "RC")
		return ["9B","9C","9D","9E","9F","A0",]
	if(levelCode == "CR")
		return ["A1","A2","A3","A4","A5","A6"]
	return null
	
}

function addRequirements(levels, table) {
	
	
	let newTable = structuredClone(table);
	
	const newRequirementsYSBB = [
		"Fairy Spell Book"
	];
	
	const newRequirementsTG = [
		"Fairy Spell Book",
		"Super Breath Mint",
		"Yeti Lamp"
	];
	
	const newRequirementsRH = [
		"Fairy Spell Book"
	];
	
	const newRequirementsBS = [
		"Fairy Spell Book",
		"Ice Fairy Scroll",
		"Super Breath Mint"
	];
	
	const newRequirementsKH = [
		"Fairy Spell Book",
		"Hot Banana Pepper",
		"Magic Spinning Top",
		"Yeti Lamp",
		"Ice Fairy Scroll",
		"Super Breath Mint"
		
	];
	
	const newRequirementsMM = [
		"Fairy Spell Book",
		"Hot Banana Pepper",
		"Magic Spinning Top",
		"Yeti Lamp"
	];
	
	const newRequirementsCS = [
		"Fairy Spell Book",
		"Hot Banana Pepper",
		"Magic Spinning Top",
		"Yeti Lamp",
		"Mini Dynamo"
	];
	
	const newRequirementsPLRCCR = [
		"Magic Spinning Top",
		"Mini Dynamo"
	];
	
	//require quick escape if the first level doesn't have enough gems (hacky fix)
	if (levels[0] != "FL" && levels[0] != "CS" && levels[0] != "PL" && levels[0] != "RC") {
		newTable.forEach(entry => {
		  if (entry.id == 46) {

			if (!entry.requirements) {
			  entry.requirements = { and: [] };
			}

			if (!Array.isArray(entry.requirements.and)) {
			  entry.requirements.and = [];
			}
				entry.requirements.and.push("Fairy Spell Book");
			}
		});
	}
	
	newTable.forEach(entry => {
	  if (getLevelIDs(levels[1]).includes(entry.id)) {

		if (!entry.requirements) {
		  entry.requirements = { and: [] };
		}

		if (!Array.isArray(entry.requirements.and)) {
		  entry.requirements.and = [];
		}

		newRequirementsYSBB.forEach(req => {
		  if (!entry.requirements.and.includes(req)) {
			entry.requirements.and.push(req);
		  }
		});
	  }
	});
	
	newTable.forEach(entry => {
	  if (getLevelIDs(levels[2]).includes(entry.id)) {

		if (!entry.requirements) {
		  entry.requirements = { and: [] };
		}

		if (!Array.isArray(entry.requirements.and)) {
		  entry.requirements.and = [];
		}

		newRequirementsYSBB.forEach(req => {
		  if (!entry.requirements.and.includes(req)) {
			entry.requirements.and.push(req);
		  }
		});
	  }
	});
	
	newTable.forEach(entry => {
	  if (getLevelIDs(levels[3]).includes(entry.id)) {

		if (!entry.requirements) {
		  entry.requirements = { and: [] };
		}

		if (!Array.isArray(entry.requirements.and)) {
		  entry.requirements.and = [];
		}

		newRequirementsTG.forEach(req => {
		  if (!entry.requirements.and.includes(req)) {
			entry.requirements.and.push(req);
		  }
		});
	  }
	});
	
	newTable.forEach(entry => {
	  if (getLevelIDs(levels[4]).includes(entry.id)) {

		if (!entry.requirements) {
		  entry.requirements = { and: [] };
		}

		if (!Array.isArray(entry.requirements.and)) {
		  entry.requirements.and = [];
		}

		newRequirementsRH.forEach(req => {
		  if (!entry.requirements.and.includes(req)) {
			entry.requirements.and.push(req);
		  }
		});
	  }
	});
	
	newTable.forEach(entry => {
	  if (getLevelIDs(levels[5]).includes(entry.id)) {

		if (!entry.requirements) {
		  entry.requirements = { and: [] };
		}

		if (!Array.isArray(entry.requirements.and)) {
		  entry.requirements.and = [];
		}

		newRequirementsBS.forEach(req => {
		  if (!entry.requirements.and.includes(req)) {
			entry.requirements.and.push(req);
		  }
		});
	  }
	});
	
	newTable.forEach(entry => {
	  if (getLevelIDs(levels[6]).includes(entry.id)) {

		if (!entry.requirements) {
		  entry.requirements = { and: [] };
		}

		if (!Array.isArray(entry.requirements.and)) {
		  entry.requirements.and = [];
		}

		newRequirementsKH.forEach(req => {
		  if (!entry.requirements.and.includes(req)) {
			entry.requirements.and.push(req);
		  }
		});
	  }
	});
	
	newTable.forEach(entry => {
	  if (getLevelIDs(levels[7]).includes(entry.id)) {

		if (!entry.requirements) {
		  entry.requirements = { and: [] };
		}

		if (!Array.isArray(entry.requirements.and)) {
		  entry.requirements.and = [];
		}

		newRequirementsMM.forEach(req => {
		  if (!entry.requirements.and.includes(req)) {
			entry.requirements.and.push(req);
		  }
		});
	  }
	});
	
	newTable.forEach(entry => {
	  if (getLevelIDs(levels[8]).includes(entry.id)) {

		if (!entry.requirements) {
		  entry.requirements = { and: [] };
		}

		if (!Array.isArray(entry.requirements.and)) {
		  entry.requirements.and = [];
		}

		newRequirementsCS.forEach(req => {
		  if (!entry.requirements.and.includes(req)) {
			entry.requirements.and.push(req);
		  }
		});
	  }
	});
	
	newTable.forEach(entry => {
	  if (getLevelIDs(levels[9]).includes(entry.id)) {

		if (!entry.requirements) {
		  entry.requirements = { and: [] };
		}

		if (!Array.isArray(entry.requirements.and)) {
		  entry.requirements.and = [];
		}

		newRequirementsPLRCCR.forEach(req => {
		  if (!entry.requirements.and.includes(req)) {
			entry.requirements.and.push(req);
		  }
		});
	  }
	});
	
	newTable.forEach(entry => {
	  if (getLevelIDs(levels[10]).includes(entry.id)) {

		if (!entry.requirements) {
		  entry.requirements = { and: [] };
		}

		if (!Array.isArray(entry.requirements.and)) {
		  entry.requirements.and = [];
		}

		newRequirementsPLRCCR.forEach(req => {
		  if (!entry.requirements.and.includes(req)) {
			entry.requirements.and.push(req);
		  }
		});
	  }
	});
	
	newTable.forEach(entry => {
	  if (getLevelIDs(levels[11]).includes(entry.id)) {

		if (!entry.requirements) {
		  entry.requirements = { and: [] };
		}

		if (!Array.isArray(entry.requirements.and)) {
		  entry.requirements.and = [];
		}

		newRequirementsPLRCCR.forEach(req => {
		  if (!entry.requirements.and.includes(req)) {
			entry.requirements.and.push(req);
		  }
		});
	  }
	});
	
	return newTable
}



window.randomizeOriginal = function randomizeOriginal(table, options = {}) {

	let levels = []
	if (window.entranceOption == 0) {
		levels = generateMapVanilla();
	}
	else {
		levels = generateMapOriginal(false);
	}
	console.log(levels);
	let newTable = addRequirements(levels, table)

	
	
	
	attempt = 0
	
	const placed = [];
	
	const spheres = []
	
	let inventory = { items: new Set() }
	
	const shuffledLocations = newTable.filter(l => l.addresses?.length > 0);
    const fixedLocations = newTable.filter(l => !l.addresses || l.addresses.length === 0);
	
	let sphereCount = 0;
	
	let unfilledLocations = [...shuffledLocations];
    let unclaimedFixed = [...fixedLocations];
    let itemPool = shuffleArray(shuffledLocations.map(l => l.item));
	
	
	function reachableLocations(unFilled, inv) {
        return unFilled.filter(loc => canAccess(loc.requirements, inv));
    }
	
	function reachableFixed(unClaim, inv) {
		return unClaim.filter(loc => canAccess(loc.requirements, inv));
	}
	
	while(itemPool.length > 0) {
		
		let locationAfter = 0;
		sphere = [];
		tempInventory = structuredClone(inventory);
		unFilledAfter = [];
		unClaimedAfter = [];
		itemPoolAfter = []
		
		while(locationAfter == 0 && tempInventory.items.size < 100) {
			
			sphere = [];
			tempInventory = structuredClone(inventory);
			unFilledAfter = unfilledLocations.slice();
			unClaimedAfter = unclaimedFixed.slice();
			itemPoolAfter = shuffleArray(itemPool).slice();
		
			const reachable = reachableLocations(unFilledAfter, tempInventory);
			
			for(const loc of reachable) {
				
				while(itemPoolAfter[0] == "Hero\u0027s Heart Medal" 
					|| itemPoolAfter[0] == "Heart of the Thieves\u0027 Guild"
					|| itemPoolAfter[0] == "Military Cross"
					|| itemPoolAfter[0] == "Sunspot Bloom") {
					itemPoolAfter = shuffleArray(itemPoolAfter);
				}
				if (loc.location.substring(0,2) == "RH" && loc.location.includes("Chest") && itemPoolAfter.indexOf("Hero\u0027s Heart Medal") != -1) {
					const itemIndex = itemPoolAfter.indexOf("Hero\u0027s Heart Medal")
					itemPoolAfter[itemIndex] = itemPoolAfter[0];
					itemPoolAfter[0] = "Hero\u0027s Heart Medal";
				} else if (loc.location == "TG Moneybags" && itemPoolAfter.indexOf("Heart of the Thieves\u0027 Guild") != -1) {
					const itemIndex = itemPoolAfter.indexOf("Heart of the Thieves\u0027 Guild")
					itemPoolAfter[itemIndex] = itemPoolAfter[0];
					itemPoolAfter[0] = "Heart of the Thieves\u0027 Guild";
				}
				 else if (loc.location == "CS Moneybags" && itemPoolAfter.indexOf("Military Cross") != -1) {
					const itemIndex = itemPoolAfter.indexOf("Military Cross")
					itemPoolAfter[itemIndex] = itemPoolAfter[0];
					itemPoolAfter[0] = "Military Cross";
				} else if (loc.location.includes("CS") && itemPoolAfter.indexOf("Sunspot Bloom") != -1) {
					const itemIndex = itemPoolAfter.indexOf("Sunspot Bloom")
					itemPoolAfter[itemIndex] = itemPoolAfter[0];
					itemPoolAfter[0] = "Sunspot Bloom";
				}
				
				
				sphere.push({ location: loc.location, item: itemPoolAfter[0] });
				tempInventory.items.add(itemPoolAfter[0]);
				itemPoolAfter.splice(0,1);
				const index = unFilledAfter.indexOf(loc);
				if (index > -1) { // only splice array when item is found
				  unFilledAfter.splice(index, 1); // 2nd parameter means remove one item only
				}
			}
			
			const staticReachable = reachableFixed(unClaimedAfter, tempInventory);
			
			for(const loc of staticReachable) {
				sphere.push({ location: loc.location, item: loc.item });
				tempInventory.items.add(loc.item);
				const index = unClaimedAfter.indexOf(loc);
				if (index > -1) { // only splice array when item is found
				  unClaimedAfter.splice(index, 1); // 2nd parameter means remove one item only
				}
			}
			
			locationAfter = reachableLocations(unFilledAfter, tempInventory).length + reachableFixed(unClaimedAfter, tempInventory).length;
			attempt++;
			
			if(attempt > 10000) {
				placed._spheres = []
				return placed;
			}
		}
		
		inventory = structuredClone(tempInventory);
		unfilledLocations = unFilledAfter.slice();
		unclaimedFixed = unClaimedAfter.slice();
		itemPool = itemPoolAfter.slice();
		
		testing = reachableLocations(unfilledLocations, inventory).length + reachableFixed(unclaimedFixed, inventory).length;
		if(testing == 0) {
			console.warn("help");
		}
		spheres.push(sphere);
	}
	
	
	placed._spheres = spheres;
    placed._spoiler = generateSpoilerLog(placed, spheres, newTable);
    placed._wayOfTheDragon = generateWayOfTheDragon(spheres, placed, newTable);
	placed._maxSphere = generateMaxSphere(spheres, placed, newTable);
	placed._levels = levels;
	
	console.log(attempt);
	
	return placed;
	
}

// ------------------------------------------------------------
// SPOILER LOG FORMATTER
// ------------------------------------------------------------
function generateSpoilerLog(placed, spheres) {
  let out = [];

  out.push("=== SPOILER LOG ===\n");

  for (let i = 0; i < spheres.length; i++) {
    out.push(`\n--- Sphere ${i} ---`);
    for (const entry of spheres[i]) {
      out.push(`${entry.location} → ${entry.item}`);
    }
  }

  //out.push("\n=== FULL ITEM PLACEMENT ===");
  //for (const [loc, item] of Object.entries(placed)) {
  //  if (loc.startsWith("_")) continue;
  //  out.push(`${loc} → ${item}`);
  //}

  return out.join("\n");
}

// ------------------------------------------------------------
// REQUIRED ITEMS (ALTTPR-style, MULTI-LOCATION REACHABILITY)
// ------------------------------------------------------------
window.computeRequiredItems = function computeRequiredItems(spheres, placed, newTable) {
  const targetLocation = "CR Ripto";

  const targetEntry = newTable.find(e => e.location === targetLocation);
  if (!targetEntry) return new Set();

  // Flatten spheres into ordered items
  const orderedItems = [];
  for (const sphere of spheres) {
    for (const entry of sphere) {
      orderedItems.push(entry.item);
    }
  }

  function canReachCR(inv) {
    return canAccess(targetEntry.requirements, inv);
  }

  // Step 1: minimal required items for CR Ripto
  let required = new Set();
  const fullSet = new Set(orderedItems);

  for (let i = orderedItems.length - 1; i >= 0; i--) {
    const item = orderedItems[i];

    const testInv = { items: new Set(fullSet), gems: 9999 };
    testInv.items.delete(item);

    if (!canReachCR(testInv)) {
      required.add(item);
    }
  }

  // ------------------------------------------------------------
  // Step 2: recursively find items required to obtain ANY required item
  // (MULTI-LOCATION dependency tracing)
  // ------------------------------------------------------------
  let changed = true;
  while (changed) {
    changed = false;

    for (const reqItem of [...required]) {

      // Find the location that gives this required item
      const reqLoc = newTable.find(e => e.item === reqItem);
      if (!reqLoc) continue;

      for (const candidate of orderedItems) {
        if (required.has(candidate)) continue;

        // Build inventory WITHOUT the candidate
        const testItems = new Set(orderedItems);
        testItems.delete(candidate);

        const testInv = { items: testItems, gems: 9999 };

        // If removing candidate prevents reaching the location that gives reqItem
        if (!canAccess(reqLoc.requirements, testInv)) {
          required.add(candidate);
          changed = true;
        }

        // Also check ALL required locations
        for (const otherReq of [...required]) {
          const otherLoc = newTable.find(e => e.item === otherReq);
          if (!otherLoc) continue;

          if (!canAccess(otherLoc.requirements, testInv)) {
            required.add(candidate);
            changed = true;
          }
        }
      }
    }
  }

  return required;
};

// ------------------------------------------------------------
// Max sphere
// ------------------------------------------------------------
function generateMaxSphere(spheres, placed, newTable) {
  const targetLocation = "CR Ripto";

  // ------------------------------------------------------------
  // 1. Find the sphere index containing CR Ripto
  // ------------------------------------------------------------
  let targetSphere = -1;
  for (let i = 0; i < spheres.length; i++) {
    if (spheres[i].some(e => e.location === targetLocation)) {
      targetSphere = i;
      break;
    }
  }
  if (targetSphere === -1) {
    return "ERROR: CR Ripto not found in spheres.";
  }

  // ------------------------------------------------------------
  // 2. Build a map: item → { sphere, location }
  // ------------------------------------------------------------
  const itemPlacement = new Map();
  for (let i = 0; i <= targetSphere; i++) {
    for (const entry of spheres[i]) {
      itemPlacement.set(entry.item, { sphere: i, location: entry.location });
    }
  }

  // ------------------------------------------------------------
  // 3. Flatten logic requirements for each location
  // ------------------------------------------------------------
  function flatten(req) {
    if (!req) return [];
    if (typeof req === "string") return [req];
    if (req.and) return req.and.flatMap(flatten);
    if (req.or) return req.or.flatMap(flatten);
    return [];
  }

  const requirementMap = {};
  for (const loc of newTable) {
    requirementMap[loc.location] = flatten(loc.requirements);
  }

  // ------------------------------------------------------------
  // 4. Backward dependency walk
  // ------------------------------------------------------------
  const requiredItems = new Set();

  // Start with the item at CR Ripto
  const riptoEntry = spheres[targetSphere].find(e => e.location === targetLocation);
  requiredItems.add(riptoEntry.item);

  let changed = true;
  while (changed) {
    changed = false;

    for (const item of Array.from(requiredItems)) {
      const placement = itemPlacement.get(item);
      if (!placement) continue;

      const reqs = requirementMap[placement.location] || [];
      for (const r of reqs) {
        if (!requiredItems.has(r)) {
          requiredItems.add(r);
          changed = true;
        }
      }
    }
  }

  // ------------------------------------------------------------
  // 5. Build output in sphere order
  // ------------------------------------------------------------
  let out = 0;

  for (let i = 0; i <= targetSphere; i++) {
    for (const entry of spheres[i]) {
      if (!requiredItems.has(entry.item)) continue;

      out = i;

      //const reqs = requirementMap[entry.location] || [];
      //for (const r of reqs) {
      //  out.push(`  Requires: ${r}`);
      //}
    }
  }

  return out;
}

function generateWayOfTheDragon(spheres, placed, newTable) {
  const targetLocation = "CR Ripto";

  // ------------------------------------------------------------
  // 1. Find the sphere index containing CR Ripto
  // ------------------------------------------------------------
  let targetSphere = -1;
  for (let i = 0; i < spheres.length; i++) {
    if (spheres[i].some(e => e.location === targetLocation)) {
      targetSphere = i;
      break;
    }
  }
  if (targetSphere === -1) {
    return "ERROR: CR Ripto not found in spheres.";
  }

  // ------------------------------------------------------------
  // 2. Build a map: item → { sphere, location }
  // ------------------------------------------------------------
  const itemPlacement = new Map();
  for (let i = 0; i <= targetSphere; i++) {
    for (const entry of spheres[i]) {
      itemPlacement.set(entry.item, { sphere: i, location: entry.location });
    }
  }

  // ------------------------------------------------------------
  // 3. Flatten logic requirements for each location
  // ------------------------------------------------------------
  function flatten(req) {
    if (!req) return [];
    if (typeof req === "string") return [req];
    if (req.and) return req.and.flatMap(flatten);
    if (req.or) return req.or.flatMap(flatten);
    return [];
  }

  const requirementMap = {};
  for (const loc of newTable) {
    requirementMap[loc.location] = flatten(loc.requirements);
  }

  // ------------------------------------------------------------
  // 4. Backward dependency walk
  // ------------------------------------------------------------
  const requiredItems = new Set();

  // Start with the item at CR Ripto
  const riptoEntry = spheres[targetSphere].find(e => e.location === targetLocation);
  requiredItems.add(riptoEntry.item);

  let changed = true;
  while (changed) {
    changed = false;

    for (const item of Array.from(requiredItems)) {
      const placement = itemPlacement.get(item);
      if (!placement) continue;

      const reqs = requirementMap[placement.location] || [];
      for (const r of reqs) {
        if (!requiredItems.has(r)) {
          requiredItems.add(r);
          changed = true;
        }
      }
    }
  }

  // ------------------------------------------------------------
  // 5. Build output in sphere order
  // ------------------------------------------------------------
  let out = [
    "=== WAY OF THE DRAGON ===",
    `Goal: Reach ${targetLocation}`,
    ""
  ];

  for (let i = 0; i <= targetSphere; i++) {
    for (const entry of spheres[i]) {
      if (!requiredItems.has(entry.item)) continue;

      out.push(`Sphere ${i}: ${entry.location} → ${entry.item}`);

      //const reqs = requirementMap[entry.location] || [];
      //for (const r of reqs) {
      //  out.push(`  Requires: ${r}`);
      //}
    }
  }

  return out;
}