/**
 * Soundex Algorithm Implementation
 *
 * The Soundex algorithm is a phonetic algorithm for indexing names by sound.
 * It groups names that sound alike but are spelled differently.
 */

export interface SoundexResult {
  original: string;
  code: string;
  steps: string[];
}

export interface NameGroup {
  code: string;
  names: string[];
}

/**
 * Convert a single character to its Soundex digit
 */
const getCharCode = (char: string): string => {
  const upperChar = char.toUpperCase();

  // Group 1: B, F, P, V
  if ("BFPV".includes(upperChar)) return "1";

  // Group 2: C, G, J, K, Q, S, X, Z
  if ("CGJKQSXZ".includes(upperChar)) return "2";

  // Group 3: D, T
  if ("DT".includes(upperChar)) return "3";

  // Group 4: L
  if (upperChar === "L") return "4";

  // Group 5: M, N
  if ("MN".includes(upperChar)) return "5";

  // Group 6: R
  if (upperChar === "R") return "6";

  // Vowels and other letters
  return "0";
};

/**
 * Generate Soundex code for a given name with detailed steps
 */
export const generateSoundex = (name: string): SoundexResult => {
  const steps: string[] = [];

  // Step 1: Clean and validate input
  const cleaned = name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
  if (!cleaned) {
    return {
      original: name,
      code: "",
      steps: ["Invalid input: no alphabetic characters"],
    };
  }

  steps.push(`Original name: ${name}`);
  steps.push(`Cleaned and uppercase: ${cleaned}`);

  // Step 2: Keep the first letter
  const firstLetter = cleaned[0];
  steps.push(`First letter retained: ${firstLetter}`);

  // Step 3: Convert remaining letters to digits
  let code = firstLetter;
  let prevCode = getCharCode(firstLetter);
  steps.push(`First letter code mapping: ${prevCode}`);

  const digitMapping: string[] = [];

  for (let i = 1; i < cleaned.length; i++) {
    const char = cleaned[i];
    const charCode = getCharCode(char);

    digitMapping.push(`${char} → ${charCode}`);

    // Step 4: Ignore vowels and 'H', 'W', 'Y'
    if (charCode === "0") {
      steps.push(`${char} is a vowel/ignored letter, skipped`);
      prevCode = "0";
      continue;
    }

    // Step 5: Skip consecutive duplicates
    if (charCode === prevCode) {
      steps.push(`${char} produces duplicate code ${charCode}, skipped`);
      continue;
    }

    code += charCode;
    steps.push(`${char} added as ${charCode}, current code: ${code}`);
    prevCode = charCode;
  }

  steps.push(`Character mappings: ${digitMapping.join(", ")}`);

  // Step 6: Pad or truncate to exactly 4 characters
  const originalCode = code;
  if (code.length < 4) {
    code = code.padEnd(4, "0");
    steps.push(`Padded with zeros: ${originalCode} → ${code}`);
  } else if (code.length > 4) {
    code = code.substring(0, 4);
    steps.push(`Truncated to 4 characters: ${originalCode} → ${code}`);
  } else {
    steps.push(`Already 4 characters: ${code}`);
  }

  steps.push(`Final Soundex code: ${code}`);

  return {
    original: name,
    code,
    steps,
  };
};

/**
 * Process multiple names and group them by Soundex code
 */
export const processSoundexBatch = (names: string[]): NameGroup[] => {
  const groupMap = new Map<string, string[]>();

  names.forEach((name) => {
    const result = generateSoundex(name);
    if (result.code) {
      if (!groupMap.has(result.code)) {
        groupMap.set(result.code, []);
      }
      groupMap.get(result.code)!.push(name);
    }
  });

  return Array.from(groupMap.entries())
    .map(([code, names]) => ({ code, names }))
    .sort((a, b) => b.names.length - a.names.length); // Sort by group size
};

/**
 * Get Soundex encoding reference table
 */
export const getSoundexTable = () => {
  return [
    { code: "1", letters: "B, F, P, V", description: "Labial consonants" },
    {
      code: "2",
      letters: "C, G, J, K, Q, S, X, Z",
      description: "Sibilants and velars",
    },
    { code: "3", letters: "D, T", description: "Dental consonants" },
    { code: "4", letters: "L", description: "Liquid consonant" },
    { code: "5", letters: "M, N", description: "Nasal consonants" },
    { code: "6", letters: "R", description: "Rhotic consonant" },
    {
      code: "0",
      letters: "A, E, I, O, U, H, W, Y",
      description: "Vowels and ignored letters",
    },
  ];
};

/**
 * Calculate similarity between two names based on Soundex
 */
export const areSimilar = (name1: string, name2: string): boolean => {
  const code1 = generateSoundex(name1).code;
  const code2 = generateSoundex(name2).code;
  return code1 === code2 && code1 !== "";
};
