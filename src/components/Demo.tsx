import { useState } from "react";
import {
  Play,
  Plus,
  X,
  FileText,
  Users,
  Sparkles,
  Download,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import {
  generateSoundex,
  processSoundexBatch,
  type NameGroup,
} from "../utils/soundex";

const Demo = () => {
  const [names, setNames] = useState<string[]>([]);
  const [currentName, setCurrentName] = useState("");
  const [groups, setGroups] = useState<NameGroup[]>([]);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [showTraining, setShowTraining] = useState(false);
  const [trainingStep, setTrainingStep] = useState(0);

  const trainingExamples = [
    {
      name: "Robert",
      explanation:
        "Common English name. Will group with similar sounding names like Rupert and Rubin.",
      similar: ["Rupert", "Rubin", "Roberta"],
    },
    {
      name: "Smith",
      explanation:
        "Very common surname. Groups with variations like Smythe, Smyth, and Schmidt.",
      similar: ["Smythe", "Smyth", "Schmidt"],
    },
    {
      name: "Johnson",
      explanation:
        "Patronymic surname. Will match with Jonson, Jonsen, and similar spellings.",
      similar: ["Jonson", "Jonsen", "Johnsen"],
    },
    {
      name: "Mohammed",
      explanation:
        "International name with many spelling variations that Soundex can group together.",
      similar: ["Muhammad", "Mohamed", "Mohammad"],
    },
    {
      name: "Catherine",
      explanation:
        "Name with multiple common spellings. Soundex groups phonetically similar variations.",
      similar: ["Katherine", "Kathryn", "Catharine"],
    },
  ];

  const handleAddName = () => {
    if (currentName.trim() && !names.includes(currentName.trim())) {
      setNames([...names, currentName.trim()]);
      setCurrentName("");
    }
  };

  const handleRemoveName = (index: number) => {
    setNames(names.filter((_, i) => i !== index));
    setGroups([]);
    setSelectedName(null);
  };

  const handleProcess = () => {
    if (names.length > 0) {
      const result = processSoundexBatch(names);
      setGroups(result);
    }
  };

  const handleReset = () => {
    setNames([]);
    setGroups([]);
    setSelectedName(null);
    setCurrentName("");
  };

  const handleLoadExample = () => {
    const exampleNames = [
      "Robert",
      "Rupert",
      "Rubin",
      "Smith",
      "Smythe",
      "Schmidt",
      "Johnson",
      "Jonson",
      "Catherine",
      "Katherine",
      "Ashcraft",
      "Ashcroft",
      "Peterson",
      "Petersen",
      "Lee",
      "Leigh",
    ];
    setNames(exampleNames);
    setGroups([]);
    setSelectedName(null);
  };

  const handleTrainingExample = (index: number) => {
    const example = trainingExamples[index];
    setNames([example.name, ...example.similar]);
    setShowTraining(false);
    setGroups([]);
  };

  const exportResults = () => {
    const output = groups
      .map(
        (group) =>
          `Soundex Code: ${group.code}\nNames (${
            group.names.length
          }): ${group.names.join(", ")}\n`
      )
      .join("\n");

    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "soundex-results.txt";
    a.click();
  };

  const getDetailedSteps = (name: string) => {
    return generateSoundex(name);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Play className="text-indigo-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-900">
            Interactive Soundex Demo
          </h2>
        </div>
        <button
          onClick={() => setShowTraining(!showTraining)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <BookOpen size={18} />
          <span>{showTraining ? "Hide" : "Show"} Training</span>
        </button>
      </div>

      {/* Training Section */}
      {showTraining && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="text-purple-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">
              Training Examples
            </h3>
          </div>
          <p className="text-gray-700 mb-4">
            Learn how Soundex works with these interactive examples. Click any
            example to load it into the demo.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainingExamples.map((example, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border-2 border-purple-200 hover:border-purple-400 cursor-pointer transition-all"
                onClick={() => handleTrainingExample(index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-lg text-purple-900">
                    {example.name}
                  </h4>
                  <ChevronRight className="text-purple-600" size={20} />
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {example.explanation}
                </p>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-700">
                    Similar names:
                  </p>
                  {example.similar.map((name, i) => (
                    <div
                      key={i}
                      className="text-xs text-gray-600 flex items-center"
                    >
                      <span className="text-purple-500 mr-1">→</span>
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="mr-2 text-blue-600" size={20} />
          Enter Names
        </h3>

        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddName()}
            placeholder="Enter a name..."
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={handleAddName}
            disabled={!currentName.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Add</span>
          </button>
        </div>

        {names.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {names.map((name, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full"
              >
                <span className="font-medium">{name}</span>
                <button
                  onClick={() => handleRemoveName(index)}
                  className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex space-x-2">
          <button
            onClick={handleProcess}
            disabled={names.length === 0}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center space-x-2"
          >
            <Play size={20} />
            <span>Process Names</span>
          </button>
          <button
            onClick={handleLoadExample}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Load Example
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results Section */}
      {groups.length > 0 && (
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="mr-2 text-green-600" size={20} />
              Grouped Results ({groups.length} groups)
            </h3>
            <button
              onClick={exportResults}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>

          <div className="space-y-4">
            {groups.map((group, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-mono font-bold text-green-700 bg-green-100 px-4 py-2 rounded-lg">
                      {group.code}
                    </span>
                    <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                      {group.names.length}{" "}
                      {group.names.length === 1 ? "name" : "names"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.names.map((name, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedName(name)}
                      className="bg-white border-2 border-green-300 hover:border-green-500 px-4 py-2 rounded-lg font-medium text-gray-900 transition-all hover:shadow-md"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Steps Modal */}
      {selectedName && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Soundex Processing Steps: {selectedName}
              </h3>
              <button
                onClick={() => setSelectedName(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {(() => {
              const result = getDetailedSteps(selectedName);
              return (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      Final Soundex Code:
                    </p>
                    <p className="text-3xl font-mono font-bold text-blue-700">
                      {result.code}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Step-by-Step Process:
                    </h4>
                    <div className="space-y-2">
                      {result.steps.map((step, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg"
                        >
                          <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          <p className="text-gray-700 text-sm font-mono">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
        <h3 className="font-semibold text-gray-900 mb-2">💡 Tips:</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>
            • Names with the same Soundex code sound similar when pronounced
          </li>
          <li>
            • Click on any name in the results to see detailed processing steps
          </li>
          <li>
            • Try the training examples to understand how different names are
            grouped
          </li>
          <li>
            • The algorithm works best with English names and pronunciation
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Demo;
