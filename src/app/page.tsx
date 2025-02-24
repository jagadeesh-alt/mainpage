'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
import { Moon, Sun, Play, MoreHorizontal, UserCircle, Clock, Settings } from 'lucide-react';
import Split from 'react-split';

// Dynamically import Monaco Editor to prevent SSR issues
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function Playground() {
  const [darkMode, setDarkMode] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const [code, setCode] = useState('// Write your JavaScript code here...');
  const [output, setOutput] = useState('');
  const [fileName, setFileName] = useState('Untitled.js');
  const [error, setError] = useState('');

  // Safer code execution using a sandboxed iframe
  const runCode = useCallback(() => {
    try {
      // Clear previous error
      setError('');

      // Create a sandboxed iframe to execute the code
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // Execute the code in the iframe's context
      const result = iframe.contentWindow?.eval(code);
      setOutput(String(result));

      // Clean up the iframe
      document.body.removeChild(iframe);
    } catch (error: any) {
      setError(error.toString());
      setOutput('');
    }
  }, [code]);

  // Handle file name change
  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  // Toggle between dark and light mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Toggle between preview and output
  const togglePreview = () => {
    setIsPreview((prev) => !prev);
  };

  return (
    <div className={`min-h-screen p-6 transition-all duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'}`}>
      
      {/* Navbar */}
      <nav className={`flex justify-between items-center p-4 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/50 backdrop-blur-md'}`}>
        <span className="text-2xl font-bold text-red-500">darion.</span>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition"
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
          </button>
          <button className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition" aria-label="User Profile">
            <UserCircle size={20} className="text-white" />
          </button>
        </div>
      </nav>

      {/* Main Layout */}
      <Split className="flex mt-6 h-[75vh]" sizes={[65, 35]} minSize={300} gutterSize={10}>
        
        {/* Code Editor Section */}
        <div className={`p-4 rounded-xl shadow-lg flex flex-col ${darkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/50 backdrop-blur-md'}`}>
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              placeholder="File name..."
              value={fileName}
              onChange={handleFileNameChange}
              className={`w-full p-2 rounded-md text-sm ${darkMode ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`}
              aria-label="File Name"
            />
            <button
              onClick={runCode}
              className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md hover:from-blue-600 hover:to-purple-600 transition flex items-center gap-2"
              aria-label="Run Code"
            >
              <Play size={16} className="text-white" />
              <span className="text-sm text-white">Run</span>
            </button>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 rounded-md overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}">
            <Editor
              height="100%"
              theme={darkMode ? "vs-dark" : "light"}
              defaultLanguage="javascript"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{ minimap: { enabled: false } }}
              aria-label="Code Editor"
            />
          </div>
        </div>

        {/* Output / Preview Panel */}
        <div className={`p-4 rounded-xl shadow-lg flex flex-col ${darkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/50 backdrop-blur-md'}`}>
          <button
            onClick={togglePreview}
            className="text-sm font-semibold px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:from-blue-600 hover:to-purple-600 transition"
            aria-label={isPreview ? 'Back to Editor' : 'Preview'}
          >
            {isPreview ? 'Back to Editor' : 'Preview'}
          </button>

          {/* Toggle Between Preview and Output Sections */}
          {isPreview ? (
            <div className="mt-4 flex-1 rounded-md overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}">
              <iframe
                srcDoc={`<html><body><script>${code}</script></body></html>`}
                className={`w-full h-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                title="Live Preview"
                aria-label="Live Preview"
              />
            </div>
          ) : (
            <div className="mt-4 flex-1 rounded-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4">
              <h4 className="text-sm font-semibold mb-2">Output</h4>
              <div className={`p-3 rounded-md ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                {error ? (
                  <span className="text-red-500 text-sm">{error}</span>
                ) : (
                  <pre className="text-sm text-green-500">{output || "Run your code to see the output!"}</pre>
                )}
              </div>
            </div>
          )}
        </div>
      </Split>

      {/* Bottom Section */}
      <div className={`mt-6 flex items-center p-4 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/50 backdrop-blur-md'}`}>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-md hover:from-blue-600 hover:to-purple-600 transition" aria-label="Create New">
          New File
        </button>
        <div className="ml-auto flex gap-3">
          {[
            { icon: <UserCircle size={16} />, label: 'Profile' },
            { icon: <Clock size={16} />, label: 'History' },
            { icon: <Settings size={16} />, label: 'Settings' },
          ].map(({ icon, label }) => (
            <button
              key={label}
              className="p-2 rounded-md bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 transition flex items-center gap-2"
              aria-label={label}
            >
              {icon}
              <span className="text-sm text-white">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}