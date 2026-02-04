import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, ExternalLink, Trash2, ShieldCheck } from 'lucide-react';
import API from '../services/api'; 

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubLink: '',
    liveLink: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchDashboardProjects = async () => {
    try {
      const { data } = await API.get('/projects');
      const projectList = data.data || data;
      setProjects(Array.isArray(projectList) ? projectList : []);
    } catch (err) {
      console.error("FETCH_ERROR:", err.response?.data || err.message);
      if (err.response?.status === 401) navigate('/admin-secret-access');
    }
  };

  useEffect(() => {
    fetchDashboardProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title || '');
      data.append('description', formData.description || '');
      
      const cleanedTags = formData.techStack
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== "");
      
      data.append('tags', JSON.stringify(cleanedTags)); 
      data.append('githubUrl', formData.githubLink || ''); 
      data.append('liveUrl', formData.liveLink || '');
      
      if (imageFile) {
        data.append('image', imageFile); 
      }

      await API.post('/projects', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('🚀 PRODUCTION_DEPLOYMENT_SUCCESSFUL');
      setFormData({ title: '', description: '', techStack: '', githubLink: '', liveLink: '' });
      setImageFile(null);
      fetchDashboardProjects();
    } catch (err) {
      alert(`DEPLOYMENT_FAILED: ${err.response?.data?.message || "Server Error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ IRREVERSIBLE_ACTION: REMOVE FROM DATABASE?")) return;
    try {
      await API.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert('TERMINATION_FAILED');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Uploader Sidebar */}
        <aside className="w-full lg:w-96 bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-2xl h-fit sticky top-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-black italic tracking-tighter text-xl uppercase flex items-center gap-2">
              <ShieldCheck className="text-blue-500" size={24} /> Admin_Panel
            </h2>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20 font-mono">v3.2_LIVE</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
               <label className="text-[10px] text-slate-500 font-bold ml-1 uppercase">Project Title</label>
               <input required className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:border-blue-500 outline-none transition-all" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="space-y-1">
               <label className="text-[10px] text-slate-500 font-bold ml-1 uppercase">S3_Asset_Upload</label>
               <input type="file" accept="image/*" className="w-full bg-slate-950 border border-slate-800 p-2 rounded-xl text-xs file:bg-blue-600 file:text-white file:border-none file:rounded-lg file:px-3 file:py-1 file:cursor-pointer" onChange={(e) => setImageFile(e.target.files[0])} />
            </div>

            <div className="space-y-1">
               <label className="text-[10px] text-slate-500 font-bold ml-1 uppercase">Tech_Stack (Commas)</label>
               <input className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:border-blue-500 outline-none transition-all" placeholder="React, Node, AWS" value={formData.techStack} onChange={(e) => setFormData({...formData, techStack: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-3">
               <input className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm" placeholder="Github URL" value={formData.githubLink} onChange={(e) => setFormData({...formData, githubLink: e.target.value})} />
               <input className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm" placeholder="Live URL" value={formData.liveLink} onChange={(e) => setFormData({...formData, liveLink: e.target.value})} />
            </div>

            <div className="space-y-1">
               <label className="text-[10px] text-slate-500 font-bold ml-1 uppercase">Project_Description</label>
               <textarea required className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl h-24 focus:border-blue-500 outline-none transition-all resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
            
            <button type="submit" disabled={loading} className="w-full bg-blue-600 p-4 rounded-xl font-black text-white uppercase tracking-widest hover:bg-blue-500 transition-all disabled:opacity-50">
              {loading ? 'UPLOADING...' : 'PUSH_TO_DB'}
            </button>
          </form>
        </aside>

        {/* Inventory List */}
        <section className="flex-1">
          <h2 className="text-slate-500 font-bold mb-6 tracking-widest uppercase flex items-center gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Inventory ({projects.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p._id} className="bg-slate-900/30 border border-slate-800 p-5 rounded-3xl flex flex-col group hover:border-slate-600 transition-all">
                <div className="relative overflow-hidden rounded-2xl mb-4 h-44 bg-slate-950 border border-slate-800">
                  {p.image ? (
                    <img src={p.image} className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-800 text-[10px] font-mono">NULL_ASSET</div>
                  )}
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-bold text-lg">{p.title}</h3>
                  <div className="flex gap-3 text-slate-500">
                    {p.githubUrl && <Github size={16} />}
                    {p.liveUrl && <ExternalLink size={16} className="text-blue-500" />}
                  </div>
                </div>
                
                <p className="text-slate-500 text-xs line-clamp-2 mb-4">{p.description}</p>

                <div className="flex flex-wrap gap-1 mb-6">
                  {(Array.isArray(p.tags) ? p.tags : []).map((t, i) => (
                    <span key={i} className="text-[8px] bg-slate-800/50 px-2 py-1 rounded border border-slate-700 text-slate-400 font-bold uppercase">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-800/50 flex justify-between items-center">
                  <span className="text-[9px] text-slate-600 font-mono italic">REF_{p._id.slice(-6).toUpperCase()}</span>
                  <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-400 flex items-center gap-1 text-[10px] font-black uppercase transition-colors">
                    <Trash2 size={12} /> Terminate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}