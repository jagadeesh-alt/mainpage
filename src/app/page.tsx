'use client';

import { useState } from 'react';
import { Moon, UserCircle, Play, MoreHorizontal, Clock, Settings } from 'lucide-react';
import Editor from '@monaco-editor/react';

export default function Page() {
  const [darkMode, setDarkMode] = useState(true);
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className={`min-h-screen p-6 transition-all duration-300 ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
      {/* Navbar */}
      <div className={`flex justify-between items-center p-4 rounded-xl shadow ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <span className="text-2xl font-bold text-red-500">darion.</span>
        <div className="flex space-x-4">
          {['Categories', 'Models', 'Test'].map((item) => (
            <button key={item} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-300 hover:bg-gray-400'}`}>
              {item}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-800 transition">
            <Moon size={20} />
          </button>
          <button className="p-2 rounded-full bg-yellow-500">
            <UserCircle size={24} />
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Code Editor Section */}
        <div className={`col-span-2 p-5 rounded-xl shadow-md transition ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="flex items-center gap-3 mb-4">
            <input 
              type="text" 
              placeholder="File name..." 
              className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
            />
            <button className="p-2 rounded-lg hover:bg-gray-700 transition">
              <MoreHorizontal size={20} />
            </button>
            <button className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition">
              <Play size={20} />
            </button>
          </div>

          {/* Monaco Editor */}
          <div className="rounded-lg overflow-hidden border border-gray-700">
            <Editor 
              height="300px"
              theme={darkMode ? "vs-dark" : "light"}
              defaultLanguage="javascript"
              defaultValue="// Write your code here..."
              options={{ minimap: { enabled: false } }}
            />
          </div>
        </div>

        {/* Preview Panel */}
        <div className={`p-5 rounded-xl shadow-md transition ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <button 
            onClick={() => setIsPreview(!isPreview)}
            className="text-lg font-semibold px-4 py-2 bg-white text-black rounded-full shadow-md w-full"
          >
            {isPreview ? 'Back to Editor' : 'Preview'}
          </button>

          {/* Toggle Between Preview and Default Sections */}
          {isPreview ? (
            // 🟢 New Preview Section
            <div className="mt-4 p-4 rounded-lg bg-gray-800 border border-gray-700 min-h-[200px] flex items-center justify-center text-white text-lg">
              <p>📌 This is the live preview output!</p>
            </div>
          ) : (
            // 🟢 Original Output, Suggestions, Corrections Sections
            <>
              <div className="mt-4 p-4 rounded-xl border border-gray-700 bg-gray-800">
                <h4 className="text-sm font-semibold text-white">Suggestions</h4>
                <div className="mt-2 p-4 rounded-lg bg-gray-900 min-h-[100px]"></div>
              </div>
              <div className="mt-4 p-4 rounded-xl border border-gray-700 bg-gray-800">
                <h4 className="text-sm font-semibold text-white">Corrections</h4>
                <div className="mt-2 p-4 rounded-lg bg-gray-900 min-h-[100px]"></div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className={`mt-6 flex items-center p-4 rounded-xl shadow-md transition ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Creation Button */}
        <button className="px-6 py-2 bg-blue-500 text-white text-sm rounded-full font-medium hover:bg-blue-600 transition">
          Creation
        </button>

        {/* Profile, History, Settings */}
        <div className="ml-auto flex space-x-4">
          {[{ icon: <UserCircle size={18} />, label: 'Profile' }, { icon: <Clock size={18} />, label: 'History' }, { icon: <Settings size={18} />, label: 'Settings' }].map(({ icon, label }) => (
            <button key={label} className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-500 transition group relative">
              {icon}
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
