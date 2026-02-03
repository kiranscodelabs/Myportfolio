import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { fetchProjects } from '../services/projectService';

export default function PortfolioHome() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const data = await fetchProjects();
        // 🛡️ Ensure data is an array
        if (data && Array.isArray(data)) {
          setProjects(data);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Database synchronization failed.");
      } finally {
        setLoading(false);
      }
    };
    getProjectData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900 font-sans antialiased">
      <Navbar /> 
      <Hero />

      {/* Tech Stack Marquee */}
      <div className="bg-white border-y border-slate-100 py-8 mb-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          {['MongoDB', 'Express', 'React', 'NodeJS', 'Tailwind', 'Next.js', 'AWS'].map((tech) => (
            <span key={tech} className="text-lg font-black text-slate-400 hover:text-blue-600 cursor-default uppercase tracking-tighter">
              {tech}
            </span>
          ))}
        </div>
      </div> 
      
      {/* Main Projects Section */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Featured Projects</h2>
            <p className="text-slate-500 font-medium mt-2">Full-stack engineering work fetched via REST API.</p>
          </div>
          <div className="hidden md:block h-px bg-slate-200 flex-1 ml-12 mb-3"></div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Database...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 p-8 rounded-2xl text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 text-sm font-bold text-red-700 underline">Retry</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((p) => (
                <ProjectCard 
                  key={p._id} 
                  title={p.title}
                  description={p.description}
                  tags={p.tags}
                  image={p.image}        // ✅ Pass the S3 Image URL
                  githubUrl={p.githubUrl} // ✅ Pass the GitHub Link
                  liveUrl={p.liveUrl}     // ✅ Pass the Live Link
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                <p className="text-slate-400 italic">No projects found in the database archive.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-slate-100 pb-10">
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">K</div>
                <span className="font-black text-slate-900">Kiran.dev</span>
              </div>
              <p className="text-slate-500 text-sm mt-3">Production-grade MERN applications.</p>
            </div>
            <div className="flex flex-col items-center">
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-3">Explore</h4>
                <ul className="text-slate-500 text-sm space-y-1 cursor-pointer">
                  <li onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Home</li>
                  <li>Tech Stack</li>
                </ul>
            </div>
            <div className="flex flex-col items-center md:items-end">
                <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-3">Contact</h4>
                <p className="text-slate-500 text-sm">📍 Bengaluru, India</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs font-bold bg-slate-50 px-2 py-1 rounded cursor-pointer hover:bg-slate-200">Github</span>
                  <span className="text-xs font-bold bg-slate-50 px-2 py-1 rounded cursor-pointer hover:bg-slate-200">LinkedIn</span>
                </div>
            </div>
          </div>
          <p className="text-slate-400 text-[10px] font-bold mt-6 uppercase tracking-widest">
            © {new Date().getFullYear()} KIRAN • BUILT WITH MERN
          </p>
        </div>
      </footer>
    </div>
  );
}