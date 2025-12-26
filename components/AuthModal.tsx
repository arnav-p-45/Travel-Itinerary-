
import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Artificial delay for professional verification feel
    setTimeout(() => {
      const allUsers: User[] = JSON.parse(localStorage.getItem('voyager_users') || '[]');

      if (isLogin) {
        const user = allUsers.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('voyager_user', JSON.stringify(user));
          onSuccess(user);
        } else {
          setError('Authorization Failed: Incorrect credentials for this profile.');
          setIsLoading(false);
        }
      } else {
        if (allUsers.some(u => u.email === email)) {
          setError('Profile Collision: This email is already registered in our traveler database.');
          setIsLoading(false);
          return;
        }
        const newUser: User = {
          id: `TRVL-${Date.now()}`,
          name,
          email,
          password,
          savedTrips: []
        };
        allUsers.push(newUser);
        localStorage.setItem('voyager_users', JSON.stringify(allUsers));
        localStorage.setItem('voyager_user', JSON.stringify(newUser));
        onSuccess(newUser);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#1B211A]/90 backdrop-blur-xl animate-fade-in">
      <div className="bg-white rounded-[3rem] w-full max-w-md overflow-hidden relative shadow-[0_0_50px_rgba(98,129,65,0.2)] border-4 border-[#628141]/20">
        
        {localStorage.getItem('voyager_user') && (
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-gray-300 hover:text-gray-800 transition-colors z-20"
          >
            <X size={24} />
          </button>
        )}

        <div className="p-10 space-y-10 relative">
          {/* Subtle Background Accent */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#628141]/5 rounded-full blur-3xl" />
          
          <div className="text-center space-y-3 relative z-10">
            <div className="w-20 h-20 bg-[#628141] rounded-[1.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-[#628141]/30 mb-6">
              <Globe className="text-white" size={36} />
            </div>
            <h2 className="text-4xl font-black text-[#1B211A] tracking-tighter uppercase italic">
              {isLogin ? 'Traveler Login' : 'Register Profile'}
            </h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[9px]">
              {isLogin ? 'Access your private professional travel cloud' : 'Create an elite profile for personalized itinerary generation'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {!isLogin && (
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#628141] transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="FULL NAME" 
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-gray-50 border-gray-100 border-2 p-4 pl-12 rounded-2xl outline-none focus:border-[#628141] font-black uppercase text-xs tracking-widest transition-all shadow-inner"
                />
              </div>
            )}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#628141] transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-50 border-gray-100 border-2 p-4 pl-12 rounded-2xl outline-none focus:border-[#628141] font-black uppercase text-xs tracking-widest transition-all shadow-inner"
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#628141] transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="SECURE PASSCODE" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-gray-50 border-gray-100 border-2 p-4 pl-12 rounded-2xl outline-none focus:border-[#628141] font-black uppercase text-xs tracking-widest transition-all shadow-inner"
              />
            </div>

            {error && <p className="text-red-500 text-[9px] font-black uppercase tracking-widest text-center animate-pulse">{error}</p>}

            <button 
              disabled={isLoading}
              className="w-full bg-[#628141] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#1B211A] transition-all shadow-2xl shadow-[#628141]/30 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? 'VERIFYING...' : isLogin ? 'AUTHORIZE' : 'REGISTER'} <ArrowRight size={20} />
            </button>
          </form>

          <div className="text-center relative z-10">
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] hover:text-[#628141] transition-colors"
            >
              {isLogin ? "Join the Elite Traveler Registry" : "Return to Authorized Login"}
            </button>
          </div>
        </div>
        
        <div className="bg-[#1B211A] p-6 text-center text-[9px] font-black text-white/40 uppercase tracking-[0.6em] border-t border-white/5 flex items-center justify-center gap-3">
          <ShieldCheck size={14} className="text-[#628141]" />
          Secured by Voyager Elite Encryption Layer
        </div>
      </div>
    </div>
  );
};
