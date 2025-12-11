import { useState, useEffect } from "react";
import {
  BookOpen,
  Info,
  Lightbulb,
  Target,
  Zap,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { getSoundexTable } from "../utils/soundex";

const Documentation = () => {
  const table = getSoundexTable();
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [exampleName] = useState("ROBERT");
  const [animatedChars, setAnimatedChars] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Interactive example for live algorithm demonstration
  const demoSteps = [
    {
      step: 0,
      title: "Start with the name",
      description: "We'll encode 'ROBERT' step by step",
      highlight: [0, 1, 2, 3, 4, 5],
      result: "ROBERT",
      code: "",
      color: "from-blue-400 to-blue-600",
    },
    {
      step: 1,
      title: "Keep first letter",
      description: "The first letter 'R' is always retained",
      highlight: [0],
      result: "R_____",
      code: "R",
      color: "from-green-400 to-green-600",
    },
    {
      step: 2,
      title: "Convert O → 0 (vowel, skip)",
      description: "Vowels are ignored after the first position",
      highlight: [1],
      result: "R_____",
      code: "R",
      color: "from-gray-400 to-gray-600",
    },
    {
      step: 3,
      title: "Convert B → 1",
      description: "B belongs to group 1 (B,F,P,V)",
      highlight: [2],
      result: "R1____",
      code: "R1",
      color: "from-purple-400 to-purple-600",
    },
    {
      step: 4,
      title: "Convert E → 0 (vowel, skip)",
      description: "Another vowel to ignore",
      highlight: [3],
      result: "R1____",
      code: "R1",
      color: "from-gray-400 to-gray-600",
    },
    {
      step: 5,
      title: "Convert R → 6",
      description: "R belongs to group 6",
      highlight: [4],
      result: "R16___",
      code: "R16",
      color: "from-orange-400 to-orange-600",
    },
    {
      step: 6,
      title: "Convert T → 3",
      description: "T belongs to group 3 (D,T)",
      highlight: [5],
      result: "R163__",
      code: "R163",
      color: "from-pink-400 to-pink-600",
    },
    {
      step: 7,
      title: "✨ Final code: R163",
      description: "Already 4 characters - perfect!",
      highlight: [],
      result: "R163",
      code: "R163",
      color: "from-emerald-400 to-emerald-600",
    },
  ];

  const algorithmSteps = [
    {
      number: 1,
      title: "Retain First Letter",
      description: "Keep the first letter of the name as-is (uppercase)",
      icon: "📝",
      color: "from-blue-400 to-blue-600",
      example: "ROBERT → R",
    },
    {
      number: 2,
      title: "Map Letters to Digits",
      description: "Convert remaining letters using phonetic groups",
      icon: "🔢",
      color: "from-purple-400 to-purple-600",
      example: "B→1, R→6, T→3",
    },
    {
      number: 3,
      title: "Remove Duplicates",
      description: "Eliminate consecutive duplicate codes",
      icon: "🔄",
      color: "from-green-400 to-green-600",
      example: "R1163 → R163",
    },
    {
      number: 4,
      title: "Ignore Vowels",
      description: "Skip A, E, I, O, U, H, W, Y after first position",
      icon: "⏭️",
      color: "from-yellow-400 to-yellow-600",
      example: "O, E ignored",
    },
    {
      number: 5,
      title: "Normalize Length",
      description: "Pad with zeros or truncate to exactly 4 characters",
      icon: "✂️",
      color: "from-red-400 to-red-600",
      example: "R163 (perfect!)",
    },
  ];

  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= demoSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isPlaying, demoSteps.length]);

  useEffect(() => {
    setAnimatedChars(demoSteps[activeStep].highlight);
  }, [activeStep, demoSteps]);

  const handleReset = () => {
    setActiveStep(0);
    setIsPlaying(false);
  };

  const handleStepClick = (step: number) => {
    setActiveStep(step);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-10">
      {/* Introduction with Animation */}
      <section className="opacity-0 animate-fade-in">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl shadow-lg transform hover:rotate-12 transition-transform duration-300">
            <BookOpen className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Introduction to Soundex
          </h2>
        </div>
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-l-4 border-blue-500 p-8 rounded-r-xl shadow-lg transform hover:scale-[1.01] transition-all duration-300">
          <p className="text-gray-700 leading-relaxed text-lg">
            The{" "}
            <span className="font-bold text-blue-700 text-xl">
              Soundex algorithm
            </span>{" "}
            is a phonetic algorithm developed by Robert C. Russell and Margaret
            King Odell in the early 1900s. It indexes names by their sound when
            pronounced in English, making it useful for matching names that
            sound similar but have different spellings.
          </p>
        </div>
      </section>

      {/* Interactive Live Demo */}
      <section
        className="opacity-0 animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl shadow-lg animate-pulse">
            <Sparkles className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎬 Live Algorithm Animation
          </h2>
        </div>

        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border-2 border-purple-300 rounded-2xl p-8 shadow-2xl">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-8 py-4 rounded-xl font-bold flex items-center space-x-2 transition-all transform hover:scale-110 shadow-lg ${
                  isPlaying
                    ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                    : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                } text-white`}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                <span className="text-lg">{isPlaying ? "Pause" : "Play"}</span>
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-bold flex items-center space-x-2 transition-all transform hover:scale-110 shadow-lg"
              >
                <RotateCcw size={24} />
                <span className="text-lg">Reset</span>
              </button>
            </div>
            <div className="text-lg font-bold text-gray-700 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-purple-200">
              Step {activeStep + 1} / {demoSteps.length}
            </div>
          </div>

          {/* Visual Name Display */}
          <div className="bg-white rounded-2xl p-10 mb-8 shadow-2xl">
            <p className="text-center text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
              Original Name
            </p>
            <div className="flex justify-center items-center space-x-4 mb-8">
              {exampleName.split("").map((char, index) => (
                <div
                  key={index}
                  className={`
                    w-20 h-24 flex items-center justify-center text-4xl font-black rounded-xl
                    transition-all duration-700 transform
                    ${
                      animatedChars.includes(index)
                        ? `bg-gradient-to-br ${demoSteps[activeStep].color} text-white scale-125 shadow-2xl rotate-6`
                        : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 scale-100 hover:scale-110"
                    }
                  `}
                  style={{
                    animation: animatedChars.includes(index)
                      ? "bounce 0.6s ease-in-out"
                      : "none",
                  }}
                >
                  {char}
                </div>
              ))}
            </div>

            {/* Arrow */}
            <div className="flex justify-center my-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full shadow-lg animate-bounce">
                <ArrowRight size={40} className="text-white" />
              </div>
            </div>

            <p className="text-center text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
              Soundex Code
            </p>
            {/* Result Display */}
            <div className="flex justify-center items-center space-x-4">
              {demoSteps[activeStep].result.split("").map((char, index) => (
                <div
                  key={index}
                  className={`
                    w-20 h-24 flex items-center justify-center text-4xl font-black rounded-xl
                    transition-all duration-700 transform
                    ${
                      char !== "_"
                        ? "bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-2xl scale-110"
                        : "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-400 scale-90"
                    }
                  `}
                >
                  {char}
                </div>
              ))}
            </div>
          </div>

          {/* Step Description */}
          <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-xl p-8 border-l-4 border-indigo-600 shadow-lg">
            <h3 className="text-2xl font-black text-gray-900 mb-3 flex items-center">
              <div className="bg-indigo-600 p-2 rounded-lg mr-3">
                <CheckCircle2 className="text-white" size={28} />
              </div>
              {demoSteps[activeStep].title}
            </h3>
            <p className="text-gray-700 text-xl leading-relaxed mb-4">
              {demoSteps[activeStep].description}
            </p>
            {demoSteps[activeStep].code && (
              <div className="bg-white rounded-xl p-6 inline-block shadow-lg border-2 border-indigo-200">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Current Code:{" "}
                </span>
                <span className="text-4xl font-mono font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {demoSteps[activeStep].code}
                </span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 transition-all duration-700 shadow-lg"
                style={{
                  width: `${((activeStep + 1) / demoSteps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="mt-6 flex justify-center space-x-2 flex-wrap gap-2">
            {demoSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`
                  w-12 h-12 rounded-full font-bold text-lg transition-all transform
                  ${
                    index === activeStep
                      ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-125 shadow-lg"
                      : index < activeStep
                      ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white scale-100 hover:scale-110"
                      : "bg-gray-200 text-gray-500 scale-100 hover:scale-110"
                  }
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithm Steps with Cards */}
      <section
        className="opacity-0 animate-fade-in"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl shadow-lg">
            <Zap className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Algorithm Steps
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithmSteps.map((step, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`
                bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200
                transform transition-all duration-500 cursor-pointer
                ${
                  hoveredCard === index
                    ? "scale-110 shadow-2xl border-transparent"
                    : "scale-100 hover:scale-105"
                }
              `}
            >
              <div
                className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4
                  bg-gradient-to-br ${step.color} shadow-lg transform
                  ${hoveredCard === index ? "rotate-12 scale-110" : "rotate-0"}
                  transition-transform duration-500
                `}
              >
                {step.icon}
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-lg
                    bg-gradient-to-br ${step.color}
                  `}
                >
                  {step.number}
                </div>
                <h3 className="text-xl font-black text-gray-900">
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-3 leading-relaxed">
                {step.description}
              </p>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3">
                <p className="text-sm font-mono font-semibold text-gray-700">
                  {step.example}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Purpose - Enhanced Cards */}
      <section
        className="opacity-0 animate-fade-in"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-400 to-teal-600 rounded-xl shadow-lg">
            <Target className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Purpose & Applications
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 shadow-lg transform hover:scale-105 transition-all duration-300">
            <h3 className="font-black text-gray-900 mb-4 text-2xl flex items-center">
              <span className="text-3xl mr-3">🎯</span>
              Use Cases
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start transform hover:translate-x-2 transition-transform">
                <span className="text-green-600 mr-3 text-2xl">✓</span>
                <span className="text-lg">
                  Genealogical research and census records
                </span>
              </li>
              <li className="flex items-start transform hover:translate-x-2 transition-transform">
                <span className="text-green-600 mr-3 text-2xl">✓</span>
                <span className="text-lg">
                  Database search and name matching
                </span>
              </li>
              <li className="flex items-start transform hover:translate-x-2 transition-transform">
                <span className="text-green-600 mr-3 text-2xl">✓</span>
                <span className="text-lg">Spell correction systems</span>
              </li>
              <li className="flex items-start transform hover:translate-x-2 transition-transform">
                <span className="text-green-600 mr-3 text-2xl">✓</span>
                <span className="text-lg">
                  Information retrieval and indexing
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200 shadow-lg transform hover:scale-105 transition-all duration-300">
            <h3 className="font-black text-gray-900 mb-4 text-2xl flex items-center">
              <span className="text-3xl mr-3">⚡</span>
              Benefits
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start transform hover:translate-x-2 transition-transform">
                <span className="text-purple-600 mr-3 text-2xl">✓</span>
                <span className="text-lg">
                  Handles spelling variations and errors
                </span>
              </li>
              <li className="flex items-start transform hover:translate-x-2 transition-transform">
                <span className="text-purple-600 mr-3 text-2xl">✓</span>
                <span className="text-lg">
                  Simple and computationally efficient
                </span>
              </li>
              <li className="flex items-start transform hover:translate-x-2 transition-transform">
                <span className="text-purple-600 mr-3 text-2xl">✓</span>
                <span className="text-lg">Language-independent encoding</span>
              </li>
              <li className="flex items-start transform hover:translate-x-2 transition-transform">
                <span className="text-purple-600 mr-3 text-2xl">✓</span>
                <span className="text-lg">
                  Fixed-length output (4 characters)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Encoding Table - Enhanced */}
      <section
        className="opacity-0 animate-fade-in"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl shadow-lg">
            <Info className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Soundex Encoding Table
          </h2>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-2xl">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <th className="px-8 py-5 text-left font-black text-lg">Code</th>
                <th className="px-8 py-5 text-left font-black text-lg">
                  Letters
                </th>
                <th className="px-8 py-5 text-left font-black text-lg">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, index) => (
                <tr
                  key={row.code}
                  className={`
                    transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50
                    ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  `}
                >
                  <td className="px-8 py-5 font-mono font-black text-2xl text-indigo-600">
                    {row.code}
                  </td>
                  <td className="px-8 py-5 font-bold text-gray-900 text-lg">
                    {row.letters}
                  </td>
                  <td className="px-8 py-5 text-gray-700 text-lg">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Examples - Enhanced */}
      <section
        className="opacity-0 animate-fade-in"
        style={{ animationDelay: "1s" }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl shadow-lg">
            <Lightbulb className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Quick Examples
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Robert",
              code: "R163",
              similar: ["Rupert", "Rubin"],
              color: "from-blue-400 to-blue-600",
            },
            {
              name: "Smith",
              code: "S530",
              similar: ["Smythe", "Schmidt"],
              color: "from-purple-400 to-purple-600",
            },
            {
              name: "Johnson",
              code: "J525",
              similar: ["Jonson", "Jonsen"],
              color: "from-green-400 to-green-600",
            },
          ].map((example) => (
            <div
              key={example.name}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200 shadow-lg transform hover:scale-110 hover:rotate-2 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-black text-gray-900 text-2xl">
                  {example.name}
                </span>
                <span
                  className={`font-mono bg-gradient-to-r ${example.color} text-white px-4 py-2 rounded-xl font-black text-lg shadow-lg`}
                >
                  {example.code}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-3">
                Matches with:
              </p>
              <div className="space-y-2">
                {example.similar.map((name) => (
                  <div
                    key={name}
                    className="text-lg text-gray-700 flex items-center bg-white rounded-lg p-3 shadow transform hover:translate-x-2 transition-transform"
                  >
                    <ChevronRight className="text-yellow-600 mr-2" size={20} />
                    <span className="font-semibold">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Limitations - Enhanced */}
      <section
        className="opacity-0 animate-fade-in"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 p-8 rounded-r-2xl shadow-lg">
          <h3 className="font-black text-gray-900 mb-4 text-2xl flex items-center">
            <span className="text-red-600 mr-3 text-4xl">⚠️</span>
            Important Limitations
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start transform hover:translate-x-2 transition-transform">
              <span className="text-red-600 mr-3 text-xl">•</span>
              <span className="text-lg">
                Designed primarily for English names and pronunciation
              </span>
            </li>
            <li className="flex items-start transform hover:translate-x-2 transition-transform">
              <span className="text-red-600 mr-3 text-xl">•</span>
              <span className="text-lg">
                Not suitable for non-English phonetic patterns
              </span>
            </li>
            <li className="flex items-start transform hover:translate-x-2 transition-transform">
              <span className="text-red-600 mr-3 text-xl">•</span>
              <span className="text-lg">
                May group unrelated names with similar phonetics
              </span>
            </li>
            <li className="flex items-start transform hover:translate-x-2 transition-transform">
              <span className="text-red-600 mr-3 text-xl">•</span>
              <span className="text-lg">
                Fixed 4-character length limits precision for longer names
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
