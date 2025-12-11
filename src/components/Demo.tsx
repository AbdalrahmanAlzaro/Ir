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
  Trash2,
  RefreshCw,
  CheckCircle2,
  Info,
  Search,
  ArrowRight,
  Lightbulb,
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
  const [activeExample, setActiveExample] = useState<number | null>(null);

  const trainingExamples = [
    {
      name: "Robert",
      explanation:
        "Common English name. Will group with similar sounding names like Rupert and Rubin.",
      similar: ["Rupert", "Rubin", "Roberta"],
      color: "from-blue-400 to-blue-600",
      icon: "👤",
    },
    {
      name: "Smith",
      explanation:
        "Very common surname. Groups with variations like Smythe, Smyth, and Schmidt.",
      similar: ["Smythe", "Smyth", "Schmidt"],
      color: "from-purple-400 to-purple-600",
      icon: "👔",
    },
    {
      name: "Johnson",
      explanation:
        "Patronymic surname. Will match with Jonson, Jonsen, and similar spellings.",
      similar: ["Jonson", "Jonsen", "Johnsen"],
      color: "from-green-400 to-green-600",
      icon: "📝",
    },
    {
      name: "Mohammed",
      explanation:
        "International name with many spelling variations that Soundex can group together.",
      similar: ["Muhammad", "Mohamed", "Mohammad"],
      color: "from-orange-400 to-orange-600",
      icon: "🌍",
    },
    {
      name: "Catherine",
      explanation:
        "Name with multiple common spellings. Soundex groups phonetically similar variations.",
      similar: ["Katherine", "Kathryn", "Catharine"],
      color: "from-pink-400 to-pink-600",
      icon: "💎",
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
    setActiveExample(index);
    setTimeout(() => setActiveExample(null), 3000);
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
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <Play className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Interactive Demo
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Test with your own names
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowTraining(!showTraining)}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg font-semibold text-sm sm:text-base"
          >
            <BookOpen size={18} />
            <span>{showTraining ? "Hide" : "Show"} Training</span>
          </button>
        </div>
      </div>

      {/* Training Section */}
      {showTraining && (
        <div className="animate-fade-in bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border-2 border-purple-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <div className="p-1.5 sm:p-2 bg-purple-600 rounded-lg">
              <Sparkles className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Training Examples
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Click any example to load it
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {trainingExamples.map((example, index) => (
              <div
                key={index}
                onClick={() => handleTrainingExample(index)}
                className={`
                  bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border-2 cursor-pointer
                  transform transition-all duration-300
                  ${
                    activeExample === index
                      ? "border-purple-500 scale-105 shadow-2xl"
                      : "border-purple-200 hover:border-purple-400 hover:scale-105"
                  }
                `}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-2xl sm:text-3xl">{example.icon}</span>
                    <h4 className="font-black text-base sm:text-lg md:text-xl text-gray-900 break-words">
                      {example.name}
                    </h4>
                  </div>
                  <ChevronRight
                    className={`text-purple-600 transition-transform flex-shrink-0 ${
                      activeExample === index ? "translate-x-2" : ""
                    }`}
                    size={20}
                  />
                </div>
                <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm md:text-base">
                  {example.explanation}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="text-purple-600" size={14} />
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">
                      Similar names:
                    </p>
                  </div>
                  {example.similar.map((name, i) => (
                    <div
                      key={i}
                      className="flex items-center bg-purple-50 rounded-lg p-2"
                    >
                      <ArrowRight
                        className="text-purple-500 mr-2 flex-shrink-0"
                        size={14}
                      />
                      <span className="text-xs sm:text-sm font-medium text-gray-700 break-words">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg">
              <FileText className="text-white" size={20} />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Enter Names
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={currentName}
                onChange={(e) => setCurrentName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddName()}
                placeholder="Type a name..."
                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-blue-500 focus:outline-none text-sm sm:text-base shadow-sm"
              />
              <Search
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
            <button
              onClick={handleAddName}
              disabled={!currentName.trim()}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg font-semibold flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <Plus size={18} />
              <span>Add</span>
            </button>
          </div>

          {names.length > 0 && (
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-inner border-2 border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="text-green-600" size={18} />
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    {names.length} {names.length === 1 ? "name" : "names"} added
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 text-xs sm:text-sm font-semibold"
                >
                  <Trash2 size={14} />
                  <span>Clear All</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {names.map((name, index) => (
                  <div
                    key={index}
                    className="group flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-blue-200 hover:border-blue-400 transition-all shadow-sm text-sm sm:text-base"
                  >
                    <span className="font-semibold break-all">{name}</span>
                    <button
                      onClick={() => handleRemoveName(index)}
                      className="hover:bg-blue-200 rounded-full p-1 transition-colors group-hover:scale-110"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <button
              onClick={handleProcess}
              disabled={names.length === 0}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg font-bold flex items-center justify-center space-x-2 text-sm sm:text-base md:text-lg"
            >
              <Play size={18} className="sm:w-[22px] sm:h-[22px]" />
              <span>Process</span>
            </button>
            <button
              onClick={handleLoadExample}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg font-bold flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <Sparkles size={18} />
              <span>Example</span>
            </button>
            <button
              onClick={handleReset}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg sm:rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105 shadow-lg font-bold flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <RefreshCw size={18} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {groups.length > 0 && (
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-green-600 rounded-lg">
                  <Users className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    Grouped Results
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {groups.length} {groups.length === 1 ? "group" : "groups"}{" "}
                    found
                  </p>
                </div>
              </div>
              <button
                onClick={exportResults}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg font-semibold text-sm sm:text-base"
              >
                <Download size={18} />
                <span>Export</span>
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {groups.map((group, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-lg">
                        <span className="text-2xl sm:text-3xl font-mono font-black">
                          {group.code}
                        </span>
                      </div>
                      <div className="bg-green-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-green-300">
                        <span className="font-bold text-green-700 text-xs sm:text-sm md:text-base">
                          {group.names.length}{" "}
                          {group.names.length === 1 ? "name" : "names"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Info size={16} />
                      <span className="text-xs sm:text-sm">
                        Click for details
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {group.names.map((name, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedName(name)}
                        className="group bg-gradient-to-r from-white to-green-50 border-2 border-green-300 hover:border-green-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-gray-900 transition-all hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
                      >
                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                          <span className="break-all">{name}</span>
                          <Search
                            className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            size={14}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detailed Steps Modal */}
      {selectedName && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-3xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                    Processing Steps
                  </h3>
                  <p className="text-indigo-100 text-xs sm:text-sm mt-1 break-all">
                    Analyzing: {selectedName}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedName(null)}
                  className="p-1.5 sm:p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors flex-shrink-0"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {(() => {
              const result = getDetailedSteps(selectedName);
              return (
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 border-blue-200 shadow-md">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                      <CheckCircle2 className="text-blue-600" size={20} />
                      <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                        Final Soundex Code
                      </p>
                    </div>
                    <p className="text-3xl sm:text-4xl md:text-5xl font-mono font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent break-all">
                      {result.code}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                      <div className="p-1.5 sm:p-2 bg-indigo-600 rounded-lg">
                        <FileText className="text-white" size={18} />
                      </div>
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                        Step-by-Step Process
                      </h4>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      {result.steps.map((step, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 sm:space-x-4 bg-gradient-to-r from-gray-50 to-indigo-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-all"
                        >
                          <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-md">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 font-mono leading-relaxed flex-1 text-xs sm:text-sm md:text-base break-words">
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
      <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-r-xl sm:rounded-r-2xl p-4 sm:p-6 md:p-8 shadow-lg">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-yellow-500 rounded-lg">
              <Lightbulb className="text-white" size={20} />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
              Pro Tips
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                icon: CheckCircle2,
                text: "Names with the same Soundex code sound similar when pronounced",
              },
              {
                icon: Search,
                text: "Click on any name in the results to see detailed processing steps",
              },
              {
                icon: BookOpen,
                text: "Try the training examples to understand how different names are grouped",
              },
              {
                icon: Info,
                text: "The algorithm works best with English names and pronunciation",
              },
            ].map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-2 sm:space-x-3 bg-white rounded-lg p-3 sm:p-4 shadow-md"
                >
                  <Icon className="text-yellow-600 flex-shrink-0" size={16} />
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                    {tip.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
