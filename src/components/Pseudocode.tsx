import {
  FileText,
  Copy,
  Check,
  Zap,
  Clock,
  HardDrive,
  Target,
  Code2,
  Database,
  Hash,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const Pseudocode = () => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const pseudocode = `ALGORITHM Soundex(name)
    INPUT: name - A string representing a person's name
    OUTPUT: code - A 4-character Soundex code
    
    // Step 1: Preprocessing
    cleaned ← UPPERCASE(name)
    cleaned ← REMOVE_NON_ALPHABETIC_CHARS(cleaned)
    
    IF LENGTH(cleaned) = 0 THEN
        RETURN empty string
    END IF
    
    // Step 2: Initialize with first letter
    code ← FIRST_CHAR(cleaned)
    previousCode ← GET_SOUNDEX_DIGIT(FIRST_CHAR(cleaned))
    
    // Step 3: Process remaining characters
    FOR i ← 1 TO LENGTH(cleaned) - 1 DO
        currentChar ← cleaned[i]
        currentCode ← GET_SOUNDEX_DIGIT(currentChar)
        
        // Step 4: Skip vowels and special characters
        IF currentCode = '0' THEN
            previousCode ← '0'
            CONTINUE
        END IF
        
        // Step 5: Skip consecutive duplicates
        IF currentCode = previousCode THEN
            CONTINUE
        END IF
        
        // Step 6: Append to code
        code ← code + currentCode
        previousCode ← currentCode
    END FOR
    
    // Step 7: Normalize to 4 characters
    IF LENGTH(code) < 4 THEN
        code ← PAD_RIGHT(code, 4, '0')
    ELSE IF LENGTH(code) > 4 THEN
        code ← SUBSTRING(code, 0, 4)
    END IF
    
    RETURN code
END ALGORITHM


FUNCTION GET_SOUNDEX_DIGIT(char)
    INPUT: char - A single character
    OUTPUT: digit - A soundex digit ('0'-'6')
    
    SWITCH char
        CASE 'B', 'F', 'P', 'V':
            RETURN '1'
        CASE 'C', 'G', 'J', 'K', 'Q', 'S', 'X', 'Z':
            RETURN '2'
        CASE 'D', 'T':
            RETURN '3'
        CASE 'L':
            RETURN '4'
        CASE 'M', 'N':
            RETURN '5'
        CASE 'R':
            RETURN '6'
        DEFAULT:
            RETURN '0'  // Vowels and H, W, Y
    END SWITCH
END FUNCTION


ALGORITHM ProcessNameList(nameList)
    INPUT: nameList - Array of name strings
    OUTPUT: groups - Dictionary mapping Soundex codes to name arrays
    
    groups ← EMPTY_DICTIONARY()
    
    FOR EACH name IN nameList DO
        code ← Soundex(name)
        
        IF code NOT IN groups THEN
            groups[code] ← EMPTY_ARRAY()
        END IF
        
        APPEND(groups[code], name)
    END FOR
    
    RETURN groups
END ALGORITHM


ALGORITHM PrintGroupedNames(groups)
    INPUT: groups - Dictionary mapping Soundex codes to name arrays
    OUTPUT: None (prints to console/screen)
    
    sortedCodes ← SORT_BY_GROUP_SIZE(KEYS(groups))
    
    PRINT "=== Soundex Name Groups ==="
    PRINT ""
    
    FOR EACH code IN sortedCodes DO
        names ← groups[code]
        PRINT "Code:", code
        PRINT "Names:", JOIN(names, ", ")
        PRINT "Count:", LENGTH(names)
        PRINT "---"
    END FOR
END ALGORITHM


// Main Program Flow
ALGORITHM Main()
    PRINT "Enter names (one per line, empty line to finish):"
    
    nameList ← EMPTY_ARRAY()
    
    // Read names from user
    LOOP
        name ← READ_LINE()
        IF name IS EMPTY THEN
            BREAK
        END IF
        APPEND(nameList, name)
    END LOOP
    
    // Process and group names
    groups ← ProcessNameList(nameList)
    
    // Display results
    PrintGroupedNames(groups)
END ALGORITHM`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pseudocode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const algorithmSteps = [
    {
      id: "step1",
      number: 1,
      title: "Clean and Normalize Input",
      description: "Convert to uppercase and remove non-alphabetic characters",
      icon: Target,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      id: "step2",
      number: 2,
      title: "Retain First Letter",
      description: "Keep the first letter of the name as-is",
      icon: Hash,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
    },
    {
      id: "step3",
      number: 3,
      title: "Map Letters to Digits",
      description: "Convert each letter to its Soundex digit code",
      icon: Code2,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
    },
    {
      id: "step4",
      number: 4,
      title: "Remove Duplicates",
      description: "Skip consecutive duplicate codes",
      icon: Zap,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
    },
    {
      id: "step5",
      number: 5,
      title: "Skip Vowels",
      description: "Ignore vowels and special letters (H, W, Y)",
      icon: AlertCircle,
      color: "from-pink-500 to-pink-600",
      bgColor: "from-pink-50 to-pink-100",
    },
    {
      id: "step6",
      number: 6,
      title: "Normalize to 4 Characters",
      description: "Pad with zeros or truncate to exactly 4 characters",
      icon: Database,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100",
    },
  ];

  const dataStructures = [
    {
      name: "String",
      description: "Store and manipulate the input name and resulting code",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      name: "Array",
      description: "Store the list of names for batch processing",
      icon: Database,
      color: "text-purple-600",
    },
    {
      name: "Dictionary/Map",
      description: "Group names by their Soundex codes",
      icon: Hash,
      color: "text-green-600",
    },
    {
      name: "Character",
      description: "Individual letter processing and mapping",
      icon: Code2,
      color: "text-orange-600",
    },
  ];

  const implementationNotes = [
    {
      text: "The algorithm processes characters sequentially, making it suitable for streaming implementations",
      icon: ChevronRight,
    },
    {
      text: "Character mapping uses a switch/case structure for O(1) lookup performance",
      icon: Zap,
    },
    {
      text: "The previousCode variable tracks the last added digit to prevent consecutive duplicates",
      icon: Target,
    },
    {
      text: "Names with identical codes are guaranteed to sound similar in English",
      icon: AlertCircle,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl shadow-lg">
              <FileText className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Pseudocode Implementation
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Detailed algorithm specification
              </p>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg font-semibold text-sm sm:text-base"
          >
            {copied ? (
              <>
                <Check size={18} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Algorithm Complexity */}
      <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <Zap className="text-white" size={20} />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Algorithm Complexity Analysis
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border-2 border-blue-200 transform hover:scale-105 transition-all">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                  <Clock className="text-blue-600" size={20} />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Time Complexity
                </p>
              </div>
              <p className="font-mono text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1 sm:mb-2">
                O(n)
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                where n is the length of the name
              </p>
            </div>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border-2 border-green-200 transform hover:scale-105 transition-all">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                  <HardDrive className="text-green-600" size={20} />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Space Complexity
                </p>
              </div>
              <p className="font-mono text-2xl sm:text-3xl font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-1 sm:mb-2">
                O(1)
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                constant space for the code
              </p>
            </div>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border-2 border-purple-200 transform hover:scale-105 transition-all">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg">
                  <Target className="text-purple-600" size={20} />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Output Length
                </p>
              </div>
              <p className="font-mono text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-1 sm:mb-2">
                Fixed 4
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                always 4 characters
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Steps */}
      <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
            <Target className="text-white" size={20} />
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Algorithm Steps
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {algorithmSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                onMouseEnter={() => setActiveSection(step.id)}
                onMouseLeave={() => setActiveSection(null)}
                className={`
                  bg-gradient-to-br ${
                    step.bgColor
                  } rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 shadow-lg
                  transform transition-all duration-300 cursor-pointer
                  ${
                    activeSection === step.id
                      ? "scale-105 sm:scale-110 shadow-2xl border-transparent"
                      : "scale-100 border-gray-200"
                  }
                `}
              >
                <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div
                    className={`
                      w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center
                      bg-gradient-to-br ${step.color} shadow-md transform
                      ${activeSection === step.id ? "rotate-12 scale-110" : ""}
                      transition-transform duration-300
                    `}
                  >
                    <Icon className="text-white" size={20} />
                  </div>
                  <div
                    className={`
                      w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-sm sm:text-base md:text-lg
                      bg-gradient-to-br ${step.color} text-white shadow-md
                    `}
                  >
                    {step.number}
                  </div>
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-black text-gray-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pseudocode Display */}
      <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg">
            <Code2 className="text-white" size={20} />
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Complete Pseudocode
          </h3>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 overflow-x-auto shadow-2xl border-2 sm:border-4 border-gray-700">
          <pre className="text-gray-100 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre">
            {pseudocode}
          </pre>
        </div>
      </div>

      {/* Data Structures */}
      <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
            <Database className="text-white" size={20} />
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Data Structures Used
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {dataStructures.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border-2 border-gray-200 hover:border-purple-300 transform hover:scale-105 transition-all"
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-gray-100 rounded-lg sm:rounded-xl">
                    <Icon className={item.color} size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {item.name}
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Implementation Notes */}
      <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-r-xl sm:rounded-r-2xl p-4 sm:p-6 md:p-8 shadow-lg">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <div className="p-1.5 sm:p-2 bg-yellow-500 rounded-lg">
              <AlertCircle className="text-white" size={20} />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Implementation Notes
            </h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {implementationNotes.map((note, index) => {
              const Icon = note.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-3 sm:space-x-4 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-md transform hover:translate-x-2 transition-transform"
                >
                  <div className="p-1.5 sm:p-2 bg-yellow-100 rounded-lg flex-shrink-0">
                    <Icon className="text-yellow-600" size={18} />
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                    {note.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-indigo-200">
          <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="p-2 sm:p-3 bg-indigo-600 rounded-lg sm:rounded-xl flex-shrink-0">
              <FileText className="text-white" size={20} />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                Ready for Implementation
              </h4>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                This pseudocode provides a complete specification of the Soundex
                algorithm. It can be directly translated into any programming
                language while maintaining the core logic and efficiency. Use
                the copy button above to include this in your documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pseudocode;
