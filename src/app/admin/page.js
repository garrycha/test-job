'use client';

import { useState, useEffect } from "react";

const components = ["Birthdate", "About Me", "Address", "Phone Number"];

export default function AdminPage() {
  const [pageConfig, setPageConfig] = useState(() => {
    // Load initial configuration from localStorage or use defaults
    const savedConfig = localStorage.getItem("pageConfig");
    return savedConfig
      ? JSON.parse(savedConfig)
      : {
          page2: ["Birthdate"],
          page3: ["Address"],
        };
  });

  const handleComponentChange = (page, component) => {
    setPageConfig((prevConfig) => {
      const updatedPage = prevConfig[page].includes(component)
        ? prevConfig[page].filter((item) => item !== component)
        : [...prevConfig[page], component];

      return {
        ...prevConfig,
        [page]: updatedPage.length > 0 ? updatedPage : prevConfig[page],
      };
    });
  };

  const handleSave = () => {
    localStorage.setItem("pageConfig", JSON.stringify(pageConfig));
    alert("Configuration saved!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage which components appear on each page</p>
        </div>

        <div className="space-y-6">
          {["page2", "page3"].map((page) => (
            <div key={page} className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{`${page} Components`}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {components.map((component) => (
                  <label 
                    key={component} 
                    className={`flex items-center p-3 rounded-md border transition-colors cursor-pointer ${
                      pageConfig[page].includes(component)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={pageConfig[page].includes(component)}
                      onChange={() => handleComponentChange(page, component)}
                    />
                    <span className="ml-3 text-gray-700">{component}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}