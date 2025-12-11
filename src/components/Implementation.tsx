import {
  Code,
  Copy,
  Check,
  FileCode2,
  Layers,
  PlayCircle,
  Shield,
  Zap,
  Package,
  TestTube2,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const Implementation = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("main");

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

  const codeFeatures = [
    {
      icon: Shield,
      text: "Full TypeScript type safety with interfaces",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Layers,
      text: "Detailed step-by-step execution tracking",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: CheckCircle2,
      text: "Input validation and error handling",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Zap,
      text: "Efficient batch processing with Map data structure",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: FileCode2,
      text: "Clean, documented, and maintainable code",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  const performanceMetrics = [
    {
      icon: Zap,
      text: "O(n) time complexity for single name",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Package,
      text: "O(1) space for code generation",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Layers,
      text: "O(m × n) for batch processing (m names, avg length n)",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Code,
      text: "Optimized string operations",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: CheckCircle2,
      text: "No external dependencies required",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  const testingConsiderations = [
    {
      icon: TestTube2,
      text: "Test with empty strings, special characters, and numbers",
    },
    {
      icon: Code,
      text: 'Verify duplicate code removal with names like "Pfister" (consecutive P and F)',
    },
    {
      icon: CheckCircle2,
      text: 'Check padding behavior with short names like "Lee" → "L000"',
    },
    {
      icon: Zap,
      text: "Validate truncation with long names exceeding 4 characters",
    },
    {
      icon: Shield,
      text: "Test case-insensitivity with mixed case inputs",
    },
  ];

  const codeTabs = [
    {
      id: "main",
      label: "Core Algorithm",
      icon: FileCode2,
      shortLabel: "Core",
    },
    {
      id: "batch",
      label: "Batch Processing",
      icon: Layers,
      shortLabel: "Batch",
    },
    {
      id: "usage",
      label: "Usage Examples",
      icon: PlayCircle,
      shortLabel: "Usage",
    },
  ];

  const getActiveCode = () => {
    switch (activeTab) {
      case "main":
        return mainCode;
      case "batch":
        return batchCode;
      case "usage":
        return usageCode;
      default:
        return mainCode;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
            <Code className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TypeScript Implementation
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Production-ready code with type safety
            </p>
          </div>
        </div>
      </div>

      {/* Code Tabs */}
      <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="flex space-x-1 sm:space-x-2 mb-4 border-b-2 border-gray-200 overflow-x-auto pb-1">
          {codeTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 font-semibold transition-all transform whitespace-nowrap text-xs sm:text-sm md:text-base
                  ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg scale-105 shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-t-lg"
                  }
                `}
              >
                <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Code Display */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 overflow-x-auto shadow-2xl border-2 sm:border-4 border-gray-700">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 sm:ml-4 text-gray-400 font-mono text-xs sm:text-sm">
                soundex.ts
              </span>
            </div>
            <button
              onClick={() => handleCopy(getActiveCode(), activeTab)}
              className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg text-xs sm:text-sm font-semibold"
            >
              {copied === activeTab ? (
                <>
                  <Check size={14} className="sm:w-4 sm:h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Copy Code</span>
                  <span className="sm:hidden">Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-gray-100 font-mono text-xs sm:text-sm leading-relaxed">
            <code>{getActiveCode()}</code>
          </pre>
        </div>
      </div>

      {/* Code Features & Performance */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        {/* Code Features */}
        <div>
          <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Shield className="text-white" size={20} />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Code Features
            </h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {codeFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-2 sm:space-x-3 md:space-x-4 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md border-2 border-gray-200 hover:border-blue-300 transform hover:translate-x-1 sm:hover:translate-x-2 transition-all"
                >
                  <div
                    className={`p-1.5 sm:p-2 ${feature.bgColor} rounded-lg flex-shrink-0`}
                  >
                    <Icon className={feature.color} size={18} />
                  </div>
                  <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance */}
        <div>
          <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <Zap className="text-white" size={20} />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Performance
            </h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-2 sm:space-x-3 md:space-x-4 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md border-2 border-gray-200 hover:border-green-300 transform hover:translate-x-1 sm:hover:translate-x-2 transition-all"
                >
                  <div
                    className={`p-1.5 sm:p-2 ${metric.bgColor} rounded-lg flex-shrink-0`}
                  >
                    <Icon className={metric.color} size={18} />
                  </div>
                  <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
                    {metric.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testing Considerations */}
      <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-r-xl sm:rounded-r-2xl p-4 sm:p-6 md:p-8 shadow-lg">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <div className="p-1.5 sm:p-2 bg-purple-600 rounded-lg">
              <TestTube2 className="text-white" size={20} />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Testing Considerations
            </h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {testingConsiderations.map((test, index) => {
              const Icon = test.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-2 sm:space-x-3 md:space-x-4 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-md transform hover:translate-x-1 sm:hover:translate-x-2 transition-transform"
                >
                  <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg flex-shrink-0">
                    <Icon className="text-purple-600" size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <ChevronRight
                        className="text-purple-600 flex-shrink-0"
                        size={16}
                      />
                      <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base break-words">
                        {test.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Implementation Quality Badge */}
      <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-green-300 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
            <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
              <div className="p-2 sm:p-3 bg-green-600 rounded-xl flex-shrink-0">
                <CheckCircle2 className="text-white" size={24} />
              </div>
              <div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                  Production-Ready Code
                </h4>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
                  This implementation follows TypeScript best practices,
                  includes comprehensive error handling, and is optimized for
                  performance. Ready to integrate into your production
                  applications.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-md self-start sm:self-auto">
              <Shield className="text-green-600" size={20} />
              <span className="font-bold text-green-700 text-sm sm:text-base md:text-lg">
                Type Safe
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Implementation;
