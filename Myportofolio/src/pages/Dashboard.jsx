import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      // Senior Tip: If token expires, redirect to login
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
      
      // 🛡️ PRODUCTION FIX: Convert "React, Node" string to an array or clean string
      // Most MERN backends expect an array. If yours handles strings, this still removes extra spaces.
      const cleanedTags = formData.techStack.split(',').map(tag => tag.trim()).filter(tag => tag !== "");
      
      // If your backend handles JSON strings in FormData:
      data.append('tags', JSON.stringify(cleanedTags)); 
      // OR if your backend handles repeated keys:
      // cleanedTags.forEach(tag => data.append('tags[]', tag));

      data.append('githubUrl', formData.githubLink || ''); 
      data.append('liveUrl', formData.liveLink || '');
      
      if (imageFile) {
        data.append('image', imageFile); 
      }

      await API.post('/projects', data);

      alert('🚀 PRODUCTION_DEPLOYMENT_SUCCESSFUL');
      
      setFormData({ title: '', description: '', techStack: '', githubLink: '', liveLink: '' });
      setImageFile(null);
      fetchDashboardProjects();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Check Server Middleware Order";
      alert(`DEPLOYMENT_FAILED: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ IRREVERSIBLE_ACTION: REMOVE FROM DATABASE?")) return;

    try {
      await API.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p._id !== id));
      alert('🗑️ PROJECT_TERMINATED');
    } catch (err) {
      alert('TERMINATION_FAILED: Check Authorization');
    }
  };

  // --- UI REMAINS EXACTLY AS YOU DESIGNED ---
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        <aside className="w-full lg:w-96 bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-2xl h-fit sticky top-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-black italic tracking-tighter text-xl uppercase">Project_Uploader</h2>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20 font-mono">v3.1_STABLE</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
               <label className="text-[10px] text-slate-500 font-bold ml-1 uppercase">Title (Required)</label>
               <input required className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:border-blue-500 outline-none transition-all" placeholder="Project Name" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="space-y-1">
               <label className="text-[10px] text-slate-500 font-bold ml-1 uppercase">S3_Feature_Image</label>
               <input type="file" accept="image/*" className="w-full bg-slate-950 border border-slate-800 p-2 rounded-xl text-xs file:bg-blue-600 file:border-none file:text-white file:rounded-lg file:px-3 file:py-1 file:mr-4 file:cursor-pointer" onChange={(e) => setImageFile(e.target.files[0])} />
            </div>

            <div className="space-y-1">
               <label className="text-[10px] text-slate-500 font-bold ml-1 uppercase">Tech_Stack (Commas)</label>
               <input className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:border-blue-500 outline-none transition-all" placeholder="React, Node, AWS" value={formData.techStack} onChange={(e) => setFormData({...formData, techStack: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-3">
               <input className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm" placeholder="Github (Optional)" value={formData.githubLink} onChange={(e) => setFormData({...formData, githubLink: e.target.value})} />
               <input className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm" placeholder="Live (Optional)" value={formData.liveLink} onChange={(e) => setFormData({...formData, liveLink: e.target.value})} />
            </div>

            <div className="space-y-1">
               <label className="text-[10px] text-slate-500 font-bold ml-1 uppercase">Description</label>
               <textarea required className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl h-24 focus:border-blue-500 outline-none transition-all resize-none" placeholder="Architecture details..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
            
            <button type="submit" disabled={loading} className="w-full bg-blue-600 p-4 rounded-xl font-black text-white uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-wait">
              {loading ? 'SYNCING_TO_S3...' : 'PUSH_TO_PRODUCTION'}
            </button>
          </form>
        </aside>

        <section className="flex-1">
          <h2 className="text-slate-500 font-bold mb-6 tracking-widest uppercase flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Database_Inventory ({projects.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl text-slate-600 font-mono">
                NO_PROJECTS_FOUND_IN_ARCHIVE
              </div>
            )}
            
            {projects.map((p) => (
              <div key={p._id} className="bg-slate-900/30 border border-slate-800 p-4 rounded-2xl flex flex-col group hover:border-slate-600 transition-all">
                <div className="relative overflow-hidden rounded-xl mb-3 h-40 bg-slate-950 border border-slate-800">
                  {p.image ? (
                    <img src={p.image} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-700 text-[10px] font-mono">NO_IMAGE_UPLOADED</div>
                  )}
                </div>
                
                <h3 className="text-white font-bold text-lg">{p.title}</h3>
                
                <div className="flex flex-wrap gap-1 mt-2 mb-4">
                  {/* Senior Tip: Ensure p.tags is treated as array even if it's missing */}
                  {(Array.isArray(p.tags) ? p.tags : []).map((t, i) => (
                    <span key={i} className="text-[9px] bg-slate-800/80 px-2 py-1 rounded text-slate-400 uppercase font-bold tracking-tighter border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-[9px] text-slate-600 font-mono">UID: {p._id.slice(-6)}</span>
                  <button onClick={() => handleDelete(p._id)} className="text-red-500 text-[10px] font-black hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all uppercase tracking-tighter">
                    TERMINATE
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