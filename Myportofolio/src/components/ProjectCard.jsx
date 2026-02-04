import React from 'react';
import { Code2, ExternalLink, Github } from 'lucide-react'; 

export default function ProjectCard({ title, description, tags, image, githubUrl, liveUrl }) {
  const displayTags = Array.isArray(tags) ? tags : [];

  return (
    <div className="group bg-white border border-slate-200 rounded-[2.5rem] hover:border-blue-500 transition-all shadow-sm hover:shadow-2xl hover:-translate-y-2 duration-500 flex flex-col h-full overflow-hidden">
      
      {/* 🖼️ IMAGE SECTION - Clean preview */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-50 border-b border-slate-100">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-200">
            <Code2 size={48} strokeWidth={1} />
          </div>
        )}
      </div>

      {/* 📝 CONTENT SECTION */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          
          {/* 🔗 ACTION LINKS - Separated and distinct */}
          <div className="flex gap-2 shrink-0 ml-4">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noreferrer" 
                 className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all" 
                 title="Github Source">
                <Github size={18} />
              </a>
            )}
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noreferrer" 
                 className="p-2 bg-blue-50 text-blue-400 hover:text-blue-600 hover:bg-blue-100 rounded-xl transition-all"
                 title="Live Demo">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3 font-medium">
          {description}
        </p>
        
        {/* 🏷️ TAGS SECTION */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {displayTags.length > 0 ? (
            displayTags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-bold rounded-lg border border-slate-100 uppercase tracking-widest group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-[10px] text-slate-300 italic uppercase">UNTITLED_STACK</span>
          )}
        </div>
      </div>
    </div>
  );
}