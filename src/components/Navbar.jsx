import React, { useState } from 'react';
import Home from './Home';
import Form from './Form';
import { Link, Route, Routes } from 'react-router-dom';
import MyPdf from '../PdfFile/MyPdf';
import CustomJob from '../customJob/CustomJob';
import Layout from '@/layout/Layout';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="text-black font-bold text-xl">
              <span className="bg-gradient-to-r from-black to-stone-500 bg-clip-text text-transparent">Console</span>
              <span className="bg-gradient-to-r from-violet-500 to-violet-700 bg-clip-text text-transparent">Resume</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</Link>
                <Link to="/customJob" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Custom Job</Link>
                <Link to="/layout" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Resume</Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-2">
              <div className="flex flex-col space-y-2">
                <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/customJob" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" onClick={() => setMenuOpen(false)}>Custom Job</Link>
                <Link to="/layout" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" onClick={() => setMenuOpen(false)}>Resume</Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Form />} />
          <Route path="/customJob" element={<CustomJob />} />
          <Route path="/pdf" element={<MyPdf />} />
          <Route path="/layout" element={<Layout />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} ConsoleResume. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Navbar;
