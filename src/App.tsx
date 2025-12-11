import { useState } from "react";
import { BookOpen, Code, Play, FileText } from "lucide-react";
import Documentation from "./components/Documentation";
import Implementation from "./components/Implementation";
import Demo from "./components/Demo";
import Pseudocode from "./components/Pseudocode";

function App() {
  const [activeTab, setActiveTab] = useState<
    "docs" | "pseudo" | "code" | "demo"
  >("docs");

  const tabs = [
    { id: "docs" as const, label: "Documentation", icon: BookOpen },
    { id: "pseudo" as const, label: "Pseudocode", icon: FileText },
    { id: "code" as const, label: "Implementation", icon: Code },
    { id: "demo" as const, label: "Interactive Demo", icon: Play },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Soundex Algorithm Implementation
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Information Retrieval Systems - Assignment 2
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-all
                    ${
                      activeTab === tab.id
                        ? "text-blue-600 border-b-3 border-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {activeTab === "docs" && <Documentation />}
          {activeTab === "pseudo" && <Pseudocode />}
          {activeTab === "code" && <Implementation />}
          {activeTab === "demo" && <Demo />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            © 2024 Information Retrieval Systems Assignment - Soundex Algorithm
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
