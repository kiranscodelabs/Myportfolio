import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 🛡️ Import your custom instance instead of raw axios
import API from '../services/api'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // Senior tip: Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ CHANGE: Use API.post('/auth/login') 
      // This automatically uses your Render URL + adds JSON headers
      const res = await API.post('/auth/login', formData);
      
      // ✅ Store the token
      localStorage.setItem('token', res.data.token);
      
      // ✅ Navigate
      navigate('/dashboard'); 
    } catch (err) {
      // Improved error handling
      const errorMessage = err.response?.data?.message || 'Connection to server failed';
      alert(`AUTH_ERROR: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-tighter italic">ADMIN_LOGIN</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              placeholder="admin@kiran.dev"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm font-bold uppercase tracking-widest">Secret Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-lg transition-all duration-300 uppercase tracking-widest shadow-lg shadow-blue-900/40 disabled:opacity-50"
          >
            {loading ? 'VERIFYING...' : 'Secure Entry'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;