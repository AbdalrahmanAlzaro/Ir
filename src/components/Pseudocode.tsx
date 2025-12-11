import { FileText, Copy, Check } from "lucide-react";
import { useState } from "react";

const Pseudocode = () => {
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FileText className="text-indigo-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">
              Pseudocode Implementation
            </h2>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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
        <p className="text-gray-600">
          Below is the detailed pseudocode for the Soundex algorithm
          implementation, including all helper functions and the main program
          flow.
        </p>
      </div>

      {/* Algorithm Complexity */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <h3 className="font-semibold text-gray-900 mb-3">
          Algorithm Complexity
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Time Complexity</p>
            <p className="font-mono text-lg font-bold text-blue-600">O(n)</p>
            <p className="text-sm text-gray-600 mt-1">
              where n is the length of the name
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Space Complexity</p>
            <p className="font-mono text-lg font-bold text-green-600">O(1)</p>
            <p className="text-sm text-gray-600 mt-1">
              constant space for the code
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Output Length</p>
            <p className="font-mono text-lg font-bold text-purple-600">
              Fixed 4
            </p>
            <p className="text-sm text-gray-600 mt-1">always 4 characters</p>
          </div>
        </div>
      </div>

      {/* Pseudocode Display */}
      <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
        <pre className="text-gray-100 font-mono text-sm leading-relaxed whitespace-pre">
          {pseudocode}
        </pre>
      </div>

      {/* Key Points */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-5 rounded-lg border border-green-200">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="text-green-600 mr-2">✓</span>
            Algorithm Steps
          </h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span>
                Clean and normalize input (uppercase, remove non-letters)
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span>Retain the first letter of the name</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span>Map each letter to its Soundex digit</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <span>Remove consecutive duplicate codes</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">5.</span>
              <span>Skip vowels and special letters (H, W, Y)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">6.</span>
              <span>Pad or truncate to 4 characters</span>
            </li>
          </ol>
        </div>

        <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="text-purple-600 mr-2">→</span>
            Data Structures Used
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>
                <strong>String:</strong> Store and manipulate the input name and
                resulting code
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>
                <strong>Array:</strong> Store the list of names for batch
                processing
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>
                <strong>Dictionary/Map:</strong> Group names by their Soundex
                codes
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>
                <strong>Character:</strong> Individual letter processing and
                mapping
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Implementation Notes */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
        <h3 className="font-semibold text-gray-900 mb-3">
          Implementation Notes
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">→</span>
            <span>
              The algorithm processes characters sequentially, making it
              suitable for streaming implementations
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">→</span>
            <span>
              Character mapping uses a switch/case structure for O(1) lookup
              performance
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">→</span>
            <span>
              The previousCode variable tracks the last added digit to prevent
              consecutive duplicates
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">→</span>
            <span>
              Names with identical codes are guaranteed to sound similar in
              English
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pseudocode;
