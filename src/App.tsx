import { useState } from "react";
import {
  BookOpen,
  Code,
  Play,
  FileText,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import Documentation from "./components/Documentation";
import Implementation from "./components/Implementation";
import Demo from "./components/Demo";
import Pseudocode from "./components/Pseudocode";

function App() {
  const [activeTab, setActiveTab] = useState<
    "docs" | "pseudo" | "code" | "demo"
  >("docs");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    {
      id: "docs" as const,
      label: "Documentation",
      icon: BookOpen,
      color: "blue",
    },
    {
      id: "pseudo" as const,
      label: "Pseudocode",
      icon: FileText,
      color: "indigo",
    },
    {
      id: "code" as const,
      label: "Implementation",
      icon: Code,
      color: "purple",
    },
    {
      id: "demo" as const,
      label: "Interactive Demo",
      icon: Play,
      color: "pink",
    },
  ];

  const handleTabChange = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    // Scroll to top on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg hidden sm:block">
                <GraduationCap className="text-white" size={32} />
              </div>
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg sm:hidden">
                <GraduationCap className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Soundex Algorithm
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                  Information Retrieval Systems
                </p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="text-gray-700" size={24} />
              ) : (
                <Menu className="text-gray-700" size={24} />
              )}
            </button>

            {/* Desktop Info */}
            <div className="hidden lg:block text-right">
              <p className="text-sm text-gray-600">
                Student Name: عبد الرحمن هاني الزرو
              </p>
              <p className="text-sm text-gray-600">University ID: 2038501</p>
            </div>
          </div>

          {/* Mobile Student Info - Always Visible */}
          <div className="lg:hidden mt-3 pt-3 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2.5 border border-blue-200">
              <p className="text-xs font-semibold text-gray-700">
                عبد الرحمن هاني الزرو
              </p>
              <p className="text-xs text-gray-600">ID: 2038501</p>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 py-4">
              {/* Student Info on Mobile */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border-2 border-blue-200">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Student: عبد الرحمن هاني الزرو
                </p>
                <p className="text-sm text-gray-600">University ID: 2038501</p>
              </div>

              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-all
                        ${
                          activeTab === tab.id
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Desktop Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b sticky top-[88px] sm:top-[96px] z-30 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    flex items-center space-x-2 px-6 py-4 text-sm font-semibold transition-all transform
                    ${
                      activeTab === tab.id
                        ? "text-blue-600 border-b-4 border-blue-600 bg-blue-50 scale-105"
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

      {/* Tablet Navigation (Horizontal Scroll) */}
      <nav className="bg-white shadow-sm border-b sticky top-[88px] sm:top-[96px] z-30 lg:hidden block">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 px-4 py-3 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap
                    ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                  `}
                >
                  <Icon size={16} />
                  <span className="text-xs sm:text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
          {activeTab === "docs" && <Documentation />}
          {activeTab === "pseudo" && <Pseudocode />}
          {activeTab === "code" && <Implementation />}
          {activeTab === "demo" && <Demo />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="text-center space-y-3">
            {/* Student Info - Visible on Mobile */}
            <div className="lg:hidden bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border-2 border-blue-200">
              <p className="text-sm font-semibold text-gray-700">
                عبد الرحمن هاني الزرو
              </p>
              <p className="text-xs text-gray-600">University ID: 2038501</p>
            </div>

            <p className="text-xs sm:text-sm text-gray-600">
              © 2024 Information Retrieval Systems Assignment
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Soundex Algorithm Implementation - The Hashemite University
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
