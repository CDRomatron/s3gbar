function extractItemName(raw) {
  if (!raw) return null;

  for (const name of Object.keys(window.itemData)) {
    if (raw.includes(name)) {
      return name;
    }
  }

  return null;
}

function bytesToHex(data) {
    return Array.from(data)
        .map(b => b.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();
}

class Helper {
    constructor(b0, b1, b2) {
        this.b0 = b0;
        this.b1 = b1;
        this.b2 = b2;
    }
}

const Helpers = [
    new Helper(0,1,40),
    new Helper(0,2,11),
    new Helper(0,3,4),
    new Helper(3,68,69),
    new Helper(1,64,5),
    new Helper(2,6,54),
    new Helper(1,73,7),
    new Helper(1,44,8),
    new Helper(1,24,9),
    new Helper(2,10,31),
    new Helper(3,76,10),
    new Helper(0,12,24),
    new Helper(1,59,13),
    new Helper(1,71,14),
    new Helper(0,15,17),
    new Helper(2,16,33),
    new Helper(3,39,26),
    new Helper(2,18,9),
    new Helper(1,49,19),
    new Helper(1,28,20),
    new Helper(1,35,21),
    new Helper(2,22,46),
    new Helper(2,23,50),
    new Helper(3,48,18),
    new Helper(1,51,25),
    new Helper(0,26,27),
    new Helper(3,66,56),
    new Helper(2,28,53),
    new Helper(1,43,29),
    new Helper(2,30,47),
    new Helper(1,29,31),
    new Helper(1,60,32),
    new Helper(2,33,45),
    new Helper(0,34,39),
    new Helper(0,35,38),
    new Helper(2,36,77),
    new Helper(2,37,17),
    new Helper(3,3,12),
    new Helper(3,20,21),
    new Helper(3,16,255),
    new Helper(0,41,59),
    new Helper(0,42,53),
    new Helper(2,43,65),
    new Helper(1,62,44),
    new Helper(1,1,45),
    new Helper(1,72,46),
    new Helper(1,42,47),
    new Helper(2,48,36),
    new Helper(1,74,49),
    new Helper(0,50,51),
    new Helper(3,34,67),
    new Helper(2,52,41),
    new Helper(3,19,14),
    new Helper(1,70,54),
    new Helper(2,55,58),
    new Helper(1,63,56),
    new Helper(1,61,57),
    new Helper(2,58,32),
    new Helper(3,27,37),
    new Helper(1,0,60),
    new Helper(2,61,55),
    new Helper(0,62,64),
    new Helper(2,63,57),
    new Helper(3,4,52),
    new Helper(1,75,65),
    new Helper(2,66,11),
    new Helper(0,67,69),
    new Helper(2,68,25),
    new Helper(3,38,30),
    new Helper(2,70,40),
    new Helper(1,23,71),
    new Helper(2,72,13),
    new Helper(1,22,73),
    new Helper(0,74,75),
    new Helper(3,15,7),
    new Helper(1,8,76),
    new Helper(0,77,79),
    new Helper(1,2,78),
    new Helper(3,79,78),
    new Helper(3,6,5)
];

function extractBits(value, count, offset) {
    return ((1 << count) - 1) & (value >> offset);
}

function buildEncodingMap() {
    const map = new Map();

    function traverse(index, path = []) {
        const helper = Helpers[index];

        // LEFT (bit = 0)
        if (extractBits(helper.b0, 1, 0) === 1) {
            map.set(helper.b1, [...path, 0]);
        } else {
            traverse(helper.b1, [...path, 0]);
        }

        // RIGHT (bit = 1)
        if (extractBits(helper.b0, 1, 1) === 1) {
            map.set(helper.b2, [...path, 1]);
        } else {
            traverse(helper.b2, [...path, 1]);
        }
    }

    traverse(0);
    return map;
}

function packBits(bits) {
    const output = [];
    let curByte = 0;
    let bitPos = 7;

    for (const bit of bits) {
        if (bit === 1) {
            curByte |= (1 << bitPos);
        }

        bitPos--;

        if (bitPos < 0) {
            output.push(curByte);
            curByte = 0;
            bitPos = 7;
        }
    }

    if (bitPos !== 7) {
        output.push(curByte);
    }

    return Uint8Array.from(output);
}

function compress(input) {
    const encodingMap = buildEncodingMap();
    const bits = [];

    for (const b of input) {
        const code = encodingMap.get(b);

        if (!code) {
            throw new Error(`No encoding for byte ${b}`);
        }

        bits.push(...code);
    }

    return packBits(bits);
}

const CharToIndex = {
    ' ': 0, '!': 1, '#': 2, '%': 3, "'": 4,
    '[': 5, ']': 6, '*': 7, '+': 8, ',': 9,
    '-': 10, '.': 11, '/': 12, '0': 13, '1': 14,
    '2': 15, '3': 16, '4': 17, '5': 18, '6': 19,
    '7': 20, '8': 21, '9': 22, ':': 23, '?': 24,
    'A': 25, 'B': 26, 'C': 27, 'D': 28, 'E': 29,
    'F': 30, 'G': 31, 'H': 32, 'I': 33, 'J': 34,
    'K': 35, 'L': 36, 'M': 37, 'N': 38, 'O': 39,
    'P': 40, 'Q': 41, 'R': 42, 'S': 43, 'T': 44,
    'U': 45, 'V': 46, 'W': 47, 'X': 48, 'Y': 49,
    'Z': 50, 'a': 51, 'b': 52, 'c': 53, 'd': 54,
    'e': 55, 'f': 56, 'g': 57, 'h': 58, 'i': 59,
    'j': 60, 'k': 61, 'l': 62, 'm': 63, 'n': 64,
    'o': 65, 'p': 66, 'q': 67, 'r': 68, 's': 69,
    't': 70, 'u': 71, 'v': 72, 'w': 73, 'x': 74,
    'y': 75, 'z': 76, '™': 77, 'Ç': 78, 'Ñ': 79
};

function encodeString(input) {
    const encodingMap = buildEncodingMap();
    const bits = [];

    for (const char of input) {
        const index = CharToIndex[char];

        if (index === undefined) {
            throw new Error(`Unsupported character: ${char}`);
        }

        const code = encodingMap.get(index);

        if (!code) {
            throw new Error(`No encoding for index: ${index}`);
        }

        bits.push(...code);
    }

    return packBits(bits);
}

function buildTexts() {
		textToAlter =  [{"name": "title", "address": 0x1F897E, "len": 11, "text": "RANDOMIZER!"}];
		seedText = ("           " + window.seed.toString()).slice(-11)
		textToAlter.push({"name": "selectgame", "address": 0x1F89CD, "len": 11, "text": seedText});
		return textToAlter;
}

async function patchRom() {
  const status = document.getElementById("patchStatus");

  if (!loadedRomBytes) {
    status.textContent = "No ROM loaded.";
    return;
  }

  if (!window.lastGeneratedSeed) {
    status.textContent = "Generate a seed first.";
    return;
  }

  const seed = window.lastGeneratedSeed;
  const placed = [];
  const spheres = Array.from(seed._spheres);
  
	for(const sphere of spheres) {
		for(const loc of sphere) {
			placed.push(loc);
		}
	}

  const table = window.randomizerTable;
  const original = loadedRomBytes;
  const patched = new Uint8Array(original);

  // Build ID → itemData lookup
  const itemDataById = {};
  for (const [name, info] of Object.entries(window.itemData)) {
    itemDataById[info.id] = info;
  }

  for (const loc of table) {
    if (!loc.addresses || loc.addresses.length === 0) continue;

    const normalName = loc.item;
	const randomizedRaw = placed.filter(obj => {
		return obj.location == loc.location;
	})[0].item;

	const randomizedName = extractItemName(randomizedRaw);

	if (!randomizedName) {
	  console.error("Could not extract item name from:", randomizedRaw);
	  continue;
	}

	const normalItemId = window.itemData[normalName]?.id;
	const randomizedItemId = window.itemData[randomizedName]?.id;

	if (normalItemId == null) {
	  console.error("Missing ID for NORMAL item:", normalName);
	  continue;
	}
	if (randomizedItemId == null) {
	  console.error("Missing ID for RANDOMIZED item:", randomizedName);
	  continue;
	}

    const normalInfo = itemDataById[normalItemId];
    const randomInfo = itemDataById[randomizedItemId];

    if (!normalInfo || !randomInfo) {
      console.error("Missing itemData entry for IDs:", normalItemId, randomizedItemId);
      continue;
    }

    const normalRom = normalInfo.rom;
    const randomRom = randomInfo.rom;

    if (normalRom + 2 >= patched.length || randomRom + 2 >= patched.length) {
      console.error("ROM address out of range:", normalRom, randomRom);
      continue;
    }

    // Read original type byte (third byte)
    const originalTypeByte = original[normalRom + 2];

    // Write ONLY the type byte to the randomized item's ROM entry
    patched[randomRom + 2] = originalTypeByte;
    // Write randomized item ID to all location addresses
    for (let addr of loc.addresses) {
		console.log("writing " + randomizedItemId.toString(16) + " to " + addr);
      if (typeof addr === "string") addr = parseInt(addr, 16);
      if (addr >= 0 && addr < patched.length) {
        patched[addr] = randomizedItemId & 0xFF;
      }
    }
  }
  
  const textToAlter = buildTexts();
  
  for (let textReplace of textToAlter) {
	  const encoded = encodeString(textReplace.text);
	  for (let i = 0; i < encoded.length; i++) {
		patched[textReplace.address+i] = encoded[i];
		console.log("writing " + encoded[i].toString(16) + " to " + textReplace.address+i.toString(16) + " " + textReplace.text);
	  }
  }

  const blob = new Blob([patched], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = window.seed + ".gba";
  a.click();

  URL.revokeObjectURL(url);

  status.textContent = "ROM patched and downloaded.";
}