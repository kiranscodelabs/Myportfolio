import React from 'react';
import { ArrowRight, Sparkles, GraduationCap } from 'lucide-react';

export default function Hero() {
  return (
    // FIXED: Fluid padding-top that responds to viewport height (vh) 
    // Reduced from fixed pt-24 to clamp(2rem, 8vh, 6rem)
    <section className="max-w-[85rem] mx-auto px-[1.5rem] lg:px-[3rem] pt-[clamp(2rem,8vh,6rem)] pb-[clamp(3rem,10vh,8rem)] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(2rem,5vw,4rem)] items-center">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-7 space-y-[2rem]">
          <div className="inline-flex items-center gap-[0.5rem] px-[1rem] py-[0.375rem] rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[0.625rem] font-bold uppercase tracking-[0.2em]">
            <Sparkles size="0.875rem" /> Full stack developer
          </div>
          
          <h1 className="text-[clamp(2.25rem,5.5vw,4rem)] font-black text-slate-900 leading-[1.1] tracking-tight">
           Software Development Engineer <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500"> | Building Scalable Systems & High-Performance Backends</span>
          </h1> 
          
          <p className="text-[clamp(1rem,1.2vw,1.25rem)] text-slate-600 max-w-[40rem] leading-relaxed">
            Hi, I'm <span className="font-bold text-slate-900 underline decoration-blue-500 decoration-[0.25rem] underline-offset-[0.25rem]">Kiran</span>. 
            I specialize in building scalable full-stack tools with clean code and modern architecture.
          </p>

          <div className="flex flex-wrap items-center gap-[1rem] pt-[1rem]">
            <button className="flex items-center gap-[0.75rem] bg-blue-600 text-white px-[2rem] py-[1rem] rounded-[1.25rem] font-bold text-[1.125rem] hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200 group">
              View My Work 
              <ArrowRight size="1.25rem" className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a 
              href="/resume.pdf" 
              download 
              className="flex items-center gap-[0.75rem] bg-white border-[0.125rem] border-slate-200 text-slate-700 px-[2rem] py-[1rem] rounded-[1.25rem] font-bold text-[1.125rem] hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Right Side: Visual Badge */}    
        <div className="lg:col-span-5 relative group hidden lg:block">
          <div className="absolute -inset-[0.125rem] bg-linear-to-r from-blue-600 to-cyan-400 rounded-[2.5rem] blur opacity-15 group-hover:opacity-30 transition duration-1000"></div>
          
          <div className="relative bg-white border border-slate-200 p-[clamp(1.5rem,3vw,2.5rem)] rounded-[2.5rem] shadow-2xl">
            <div className="space-y-[1.5rem]">
              
              <div className="inline-flex items-center justify-center w-[3rem] h-[3rem] rounded-[1rem] bg-linear-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-100">
                <GraduationCap size="1.5rem" />
              </div>

              <div className="flex flex-col items-start gap-[0.5rem]">
                <h2 className="text-[clamp(1.5rem,2.2vw,2rem)] font-black text-slate-900 leading-[1.1] tracking-tight -ml-[0.05em]">
                  Engineering Graduate
                </h2>
                <p className="text-slate-400 font-bold uppercase tracking-[0.15em] text-[clamp(0.625rem,0.8vw,0.75rem)] leading-none">
                  Skilled & Certified in Software Development
                </p>
              </div>

              <div className="pt-[1.5rem] border-t border-slate-100 grid grid-cols-3 gap-[1rem]">
                {[
                  { label: 'MERN', sub: 'Architecture' },
                  { label: 'Next.js', sub: 'Framework' },
                  { label: 'AWS', sub: 'Deployment' }
                ].map((item, i) => (
                  <div key={i} className={`text-center ${i !== 0 ? 'border-l border-slate-100' : ''}`}>
                    <div className="text-[clamp(0.875rem,1.2vw,1.125rem)] font-black text-slate-900">
                      {item.label}
                    </div>
                    <div className="text-[0.625rem] text-slate-400 font-bold uppercase mt-[0.25rem]">
                      {item.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>  
    </section>
  );
}