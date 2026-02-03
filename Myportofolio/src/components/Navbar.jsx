import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <span className="font-bold text-slate-900 tracking-tighter text-lg">Kiran.dev</span>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden sm:flex items-center gap-6 border-r border-slate-200 pr-8">
            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors"><Github size={22} /></a>
            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors"><Linkedin size={22} /></a>
          </div>
          <a href="mailto:contact@kiran.dev" className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-100 transition-all active:scale-95">
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}