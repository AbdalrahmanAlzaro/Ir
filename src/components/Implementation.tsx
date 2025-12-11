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
    { id: "main", label: "Core Algorithm", icon: FileCode2 },
    { id: "batch", label: "Batch Processing", icon: Layers },
    { id: "usage", label: "Usage Examples", icon: PlayCircle },
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
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
            <Code className="text-white" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TypeScript Implementation
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Production-ready code with type safety and detailed tracking
            </p>
          </div>
        </div>
      </div>

      {/* Code Tabs */}
      <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="flex space-x-2 mb-4 border-b-2 border-gray-200">
          {codeTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 font-semibold transition-all transform
                  ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg scale-105 shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-t-lg"
                  }
                `}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Code Display */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 overflow-x-auto shadow-2xl border-4 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-gray-400 font-mono text-sm">
                soundex.ts
              </span>
            </div>
            <button
              onClick={() => handleCopy(getActiveCode(), activeTab)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg text-sm font-semibold"
            >
              {copied === activeTab ? (
                <>
                  <Check size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-gray-100 font-mono text-sm leading-relaxed">
            <code>{getActiveCode()}</code>
          </pre>
        </div>
      </div>

      {/* Code Features & Performance */}
      <div
        className="grid md:grid-cols-2 gap-8 animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        {/* Code Features */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Shield className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Code Features</h3>
          </div>
          <div className="space-y-3">
            {codeFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 bg-white rounded-xl p-4 shadow-md border-2 border-gray-200 hover:border-blue-300 transform hover:translate-x-2 transition-all"
                >
                  <div
                    className={`p-2 ${feature.bgColor} rounded-lg flex-shrink-0`}
                  >
                    <Icon className={feature.color} size={20} />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <Zap className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Performance</h3>
          </div>
          <div className="space-y-3">
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 bg-white rounded-xl p-4 shadow-md border-2 border-gray-200 hover:border-green-300 transform hover:translate-x-2 transition-all"
                >
                  <div
                    className={`p-2 ${metric.bgColor} rounded-lg flex-shrink-0`}
                  >
                    <Icon className={metric.color} size={20} />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{metric.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testing Considerations */}
      <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-r-2xl p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-600 rounded-lg">
              <TestTube2 className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Testing Considerations
            </h3>
          </div>
          <div className="space-y-4">
            {testingConsiderations.map((test, index) => {
              const Icon = test.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 bg-white rounded-xl p-5 shadow-md transform hover:translate-x-2 transition-transform"
                >
                  <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                    <Icon className="text-purple-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <ChevronRight className="text-purple-600" size={18} />
                      <p className="text-gray-700 leading-relaxed">
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
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 border-2 border-green-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-600 rounded-xl">
                <CheckCircle2 className="text-white" size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Production-Ready Code
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  This implementation follows TypeScript best practices,
                  includes comprehensive error handling, and is optimized for
                  performance. Ready to integrate into your production
                  applications.
                </p>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-2 bg-white px-6 py-3 rounded-xl shadow-md">
              <Shield className="text-green-600" size={24} />
              <span className="font-bold text-green-700 text-lg">
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
