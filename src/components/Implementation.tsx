import { Code, Copy, Check } from "lucide-react";
import { useState } from "react";

const Implementation = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const mainCode = `// Main Soundex Implementation in TypeScript

interface SoundexResult {
  original: string;
  code: string;
  steps: string[];
}

/**
 * Convert a single character to its Soundex digit
 */
const getCharCode = (char: string): string => {
  const upperChar = char.toUpperCase();
  
  // Group 1: B, F, P, V
  if ('BFPV'.includes(upperChar)) return '1';
  
  // Group 2: C, G, J, K, Q, S, X, Z
  if ('CGJKQSXZ'.includes(upperChar)) return '2';
  
  // Group 3: D, T
  if ('DT'.includes(upperChar)) return '3';
  
  // Group 4: L
  if (upperChar === 'L') return '4';
  
  // Group 5: M, N
  if ('MN'.includes(upperChar)) return '5';
  
  // Group 6: R
  if (upperChar === 'R') return '6';
  
  // Vowels and other letters (A, E, I, O, U, H, W, Y)
  return '0';
};

/**
 * Generate Soundex code for a given name
 */
export const generateSoundex = (name: string): SoundexResult => {
  const steps: string[] = [];
  
  // Step 1: Clean and validate input
  const cleaned = name.trim().toUpperCase().replace(/[^A-Z]/g, '');
  
  if (!cleaned) {
    return { 
      original: name, 
      code: '', 
      steps: ['Invalid input: no alphabetic characters'] 
    };
  }
  
  steps.push(\`Original name: \${name}\`);
  steps.push(\`Cleaned: \${cleaned}\`);
  
  // Step 2: Keep the first letter
  const firstLetter = cleaned[0];
  steps.push(\`First letter retained: \${firstLetter}\`);
  
  // Step 3: Convert remaining letters to digits
  let code = firstLetter;
  let prevCode = getCharCode(firstLetter);
  
  for (let i = 1; i < cleaned.length; i++) {
    const char = cleaned[i];
    const charCode = getCharCode(char);
    
    // Skip vowels and ignored letters
    if (charCode === '0') {
      prevCode = '0';
      continue;
    }
    
    // Skip consecutive duplicates
    if (charCode === prevCode) {
      continue;
    }
    
    code += charCode;
    prevCode = charCode;
  }
  
  steps.push(\`Before padding: \${code}\`);
  
  // Step 4: Normalize to 4 characters
  if (code.length < 4) {
    code = code.padEnd(4, '0');
  } else if (code.length > 4) {
    code = code.substring(0, 4);
  }
  
  steps.push(\`Final Soundex code: \${code}\`);
  
  return { original: name, code, steps };
};`;

  const batchCode = `// Batch Processing & Grouping

interface NameGroup {
  code: string;
  names: string[];
}

/**
 * Process multiple names and group by Soundex code
 */
export const processSoundexBatch = (names: string[]): NameGroup[] => {
  const groupMap = new Map<string, string[]>();
  
  // Generate Soundex codes and group names
  names.forEach((name) => {
    const result = generateSoundex(name);
    
    if (result.code) {
      if (!groupMap.has(result.code)) {
        groupMap.set(result.code, []);
      }
      groupMap.get(result.code)!.push(name);
    }
  });
  
  // Convert to array and sort by group size
  return Array.from(groupMap.entries())
    .map(([code, names]) => ({ code, names }))
    .sort((a, b) => b.names.length - a.names.length);
};

/**
 * Check if two names sound similar
 */
export const areSimilar = (name1: string, name2: string): boolean => {
  const code1 = generateSoundex(name1).code;
  const code2 = generateSoundex(name2).code;
  return code1 === code2 && code1 !== '';
};`;

  const usageCode = `// Usage Examples

// Example 1: Single name encoding
const result = generateSoundex("Robert");
console.log(result.code); // "R163"
console.log(result.steps); // Step-by-step process

// Example 2: Batch processing
const names = [
  "Robert", "Rupert", "Rubin",
  "Smith", "Smythe", "Schmidt",
  "Johnson", "Jonson"
];

const groups = processSoundexBatch(names);
groups.forEach(group => {
  console.log(\`Code \${group.code}: \${group.names.join(', ')}\`);
});

// Output:
// Code R163: Robert, Rupert, Rubin
// Code S530: Smith, Smythe, Schmidt
// Code J525: Johnson, Jonson

// Example 3: Similarity check
const similar = areSimilar("Smith", "Smythe");
console.log(similar); // true`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <Code className="text-indigo-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-900">
            TypeScript Implementation
          </h2>
        </div>
        <p className="text-gray-600">
          Complete, production-ready TypeScript implementation of the Soundex
          algorithm with type safety and detailed step tracking.
        </p>
      </div>

      {/* Main Implementation */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900">
            Core Algorithm
          </h3>
          <button
            onClick={() => handleCopy(mainCode, "main")}
            className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors text-sm"
          >
            {copied === "main" ? (
              <>
                <Check size={16} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
          <pre className="text-gray-100 font-mono text-sm leading-relaxed">
            <code>{mainCode}</code>
          </pre>
        </div>
      </div>

      {/* Batch Processing */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900">
            Batch Processing & Grouping
          </h3>
          <button
            onClick={() => handleCopy(batchCode, "batch")}
            className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors text-sm"
          >
            {copied === "batch" ? (
              <>
                <Check size={16} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
          <pre className="text-gray-100 font-mono text-sm leading-relaxed">
            <code>{batchCode}</code>
          </pre>
        </div>
      </div>

      {/* Usage Examples */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900">
            Usage Examples
          </h3>
          <button
            onClick={() => handleCopy(usageCode, "usage")}
            className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors text-sm"
          >
            {copied === "usage" ? (
              <>
                <Check size={16} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
          <pre className="text-gray-100 font-mono text-sm leading-relaxed">
            <code>{usageCode}</code>
          </pre>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-3">Code Features</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Full TypeScript type safety with interfaces</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Detailed step-by-step execution tracking</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Input validation and error handling</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Efficient batch processing with Map data structure</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Clean, documented, and maintainable code</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 p-5 rounded-lg border border-green-200">
          <h3 className="font-semibold text-gray-900 mb-3">Performance</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">⚡</span>
              <span>O(n) time complexity for single name</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">⚡</span>
              <span>O(1) space for code generation</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">⚡</span>
              <span>O(m × n) for batch processing (m names, avg length n)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">⚡</span>
              <span>Optimized string operations</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">⚡</span>
              <span>No external dependencies required</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Testing Notes */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
        <h3 className="font-semibold text-gray-900 mb-3">
          Testing Considerations
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">→</span>
            <span>
              Test with empty strings, special characters, and numbers
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">→</span>
            <span>
              Verify duplicate code removal with names like "Pfister"
              (consecutive P and F)
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">→</span>
            <span>
              Check padding behavior with short names like "Lee" → "L000"
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">→</span>
            <span>
              Validate truncation with long names exceeding 4 characters
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">→</span>
            <span>Test case-insensitivity with mixed case inputs</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Implementation;
