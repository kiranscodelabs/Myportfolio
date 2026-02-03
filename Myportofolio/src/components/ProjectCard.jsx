import React from 'react';
import { Code2, ExternalLink, Github } from 'lucide-react'; 

export default function ProjectCard({ title, description, tags, image, githubUrl, liveUrl }) {
  // ✅ Ensures tags is always an array
  const displayTags = Array.isArray(tags) ? tags : [];

  return (
    <div className="group bg-white border border-slate-200 rounded-[2rem] hover:border-blue-500 transition-all shadow-sm hover:shadow-2xl hover:-translate-y-2 duration-500 flex flex-col h-full overflow-hidden">
      
      {/* 🖼️ IMAGE SECTION */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-200">
            <Code2 size={48} strokeWidth={1} />
          </div>
        )}
        
        {/* 🔗 HOVER OVERLAY: Quick Access */}
        <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
           {liveUrl && (
             <a href={liveUrl} target="_blank" rel="noreferrer" className="p-3 bg-white rounded-full text-blue-600 hover:scale-110 transition-transform shadow-xl">
               <ExternalLink size={20} />
             </a>
           )}
           {githubUrl && (
             <a href={githubUrl} target="_blank" rel="noreferrer" className="p-3 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform shadow-xl">
               <Github size={20} />
             </a>
           )}
        </div>
      </div>

      {/* 📝 CONTENT SECTION */}
      <div className="p-7 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
        </div>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {description}
        </p>
        
        {/* 🏷️ TAGS SECTION */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {displayTags.length > 0 ? (
            displayTags.map((individualTag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black rounded-lg border border-slate-100 uppercase tracking-widest group-hover:border-blue-100 group-hover:bg-blue-50 transition-colors"
              >
                {individualTag}
              </span>
            ))
          ) : (
            <span className="text-[10px] text-slate-400 italic font-mono uppercase tracking-tighter">
              NO_TAGS_FOUND
            </span>
          )}
        </div>
      </div>
    </div>
  );
}