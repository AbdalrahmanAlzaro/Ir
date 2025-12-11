import { BookOpen, Info, Lightbulb, Target, Zap } from "lucide-react";
import { getSoundexTable } from "../utils/soundex";

const Documentation = () => {
  const table = getSoundexTable();

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <BookOpen className="text-blue-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-900">
            Introduction to Soundex
          </h2>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <p className="text-gray-700 leading-relaxed">
            The <span className="font-semibold">Soundex algorithm</span> is a
            phonetic algorithm developed by Robert C. Russell and Margaret King
            Odell in the early 1900s. It indexes names by their sound when
            pronounced in English, making it useful for matching names that
            sound similar but have different spellings.
          </p>
        </div>
      </section>

      {/* Purpose */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <Target className="text-green-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-900">
            Purpose & Applications
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-5 rounded-lg border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-2">Use Cases</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Genealogical research and census records</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Database search and name matching</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Spell correction systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Information retrieval and indexing</span>
              </li>
            </ul>
          </div>
          <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-gray-900 mb-2">Benefits</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Handles spelling variations and errors</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Simple and computationally efficient</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Language-independent encoding</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Fixed-length output (4 characters)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Algorithm Overview */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="text-orange-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg border border-orange-200">
          <ol className="space-y-4">
            <li className="flex">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                1
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Retain First Letter
                </h3>
                <p className="text-gray-700 mt-1">
                  Keep the first letter of the name as-is (uppercase).
                </p>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                2
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Map Letters to Digits
                </h3>
                <p className="text-gray-700 mt-1">
                  Convert remaining letters to their corresponding numerical
                  codes based on phonetic groups.
                </p>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                3
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Remove Duplicates
                </h3>
                <p className="text-gray-700 mt-1">
                  Eliminate consecutive duplicate codes (keeping only one).
                </p>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                4
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Ignore Certain Letters
                </h3>
                <p className="text-gray-700 mt-1">
                  Skip vowels (A, E, I, O, U) and the letters H, W, Y after the
                  first position.
                </p>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                5
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Normalize Length
                </h3>
                <p className="text-gray-700 mt-1">
                  Pad with zeros or truncate to ensure the code is exactly 4
                  characters long.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Encoding Table */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <Info className="text-indigo-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-900">
            Soundex Encoding Table
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="px-6 py-4 text-left font-semibold">Code</th>
                <th className="px-6 py-4 text-left font-semibold">Letters</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, index) => (
                <tr
                  key={row.code}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4 font-mono font-bold text-lg text-indigo-600">
                    {row.code}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {row.letters}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Examples */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <Lightbulb className="text-yellow-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-900">Quick Examples</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: "Robert", code: "R163", similar: ["Rupert", "Rubin"] },
            { name: "Smith", code: "S530", similar: ["Smythe", "Schmidt"] },
            { name: "Johnson", code: "J525", similar: ["Jonson", "Jonsen"] },
          ].map((example) => (
            <div
              key={example.name}
              className="bg-yellow-50 p-5 rounded-lg border border-yellow-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-gray-900 text-lg">
                  {example.name}
                </span>
                <span className="font-mono bg-yellow-200 px-3 py-1 rounded font-bold text-yellow-900">
                  {example.code}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Matches with:</p>
              <div className="space-y-1">
                {example.similar.map((name) => (
                  <div
                    key={name}
                    className="text-sm text-gray-700 flex items-center"
                  >
                    <span className="text-yellow-600 mr-2">→</span>
                    {name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Limitations */}
      <section>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="text-red-600 mr-2">⚠</span>
            Important Limitations
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>
                Designed primarily for English names and pronunciation
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>Not suitable for non-English phonetic patterns</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>May group unrelated names with similar phonetics</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>
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
