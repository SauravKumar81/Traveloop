import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_URL || '/api';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${apiBase}/auth/google`;
  };

  const handleAppleLogin = () => {
    window.alert('Apple login is coming soon.');
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex items-center justify-center relative overflow-hidden p-gutter">
      {/* Background Elements */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-primary-container/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-[150px]"></div>
      </div>

      <main className="w-full max-w-[440px] z-10 relative">
        <div className="bg-surface/70 backdrop-blur-[24px] border border-white/5 rounded-xl p-lg shadow-2xl space-y-lg">
          
          {/* Brand & Header Section */}
          <div className="flex flex-col items-center text-center space-y-md">
            <div className="relative group cursor-pointer" onClick={() => navigate('/')}>
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary-container to-secondary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative h-20 w-20 rounded-full bg-surface-container-high border border-outline-variant/30 overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>travel_explore</span>
              </div>
            </div>
            <div className="space-y-xs">
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Traveloop</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Sign in to your premium travel workspace</p>
            </div>
          </div>

          {/* Authentication Form */}
          <form className="space-y-gutter" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg flex items-start gap-2">
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-base">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1" htmlFor="email">Email or Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>alternate_email</span>
                </div>
                <input 
                  id="email" 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError(); }}
                  className="block w-full pl-[44px] pr-md py-sm bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-on-surface placeholder:text-outline/50 font-body-md focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 outline-none" 
                  placeholder="alex@example.com" 
                />
              </div>
            </div>

            <div className="space-y-base">
              <div className="flex justify-between items-center px-1">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Password</label>
                <a href="#" className="font-label-sm text-label-sm text-primary hover:text-primary-fixed-dim transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>
                </div>
                <input 
                  id="password" 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError(); }}
                  className="block w-full pl-[44px] pr-md py-sm bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-on-surface placeholder:text-outline/50 font-body-md focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 outline-none" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <div className="flex items-center space-x-base ml-1">
              <input 
                id="remember" 
                type="checkbox" 
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-outline-variant bg-surface-container-highest text-primary-container focus:ring-primary focus:ring-offset-surface outline-none cursor-pointer" 
              />
              <label className="font-label-sm text-label-sm text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Stay signed in for 30 days</label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-sm px-gutter bg-gradient-to-r from-primary-container to-inverse-primary hover:opacity-90 active:scale-[0.98] transition-all duration-200 text-on-primary font-headline-lg-mobile text-headline-lg-mobile rounded-lg shadow-lg shadow-primary-container/20 flex items-center justify-center space-x-base group"
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
              <span>{isLoading ? 'Logging In...' : 'Log In'}</span>
              {!isLoading && <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>}
            </button>
          </form>

          {/* Footer Actions */}
          <div className="pt-md border-t border-outline-variant/20 flex flex-col items-center space-y-md">
            <p className="font-body-md text-body-md text-on-surface-variant">
              New to Traveloop?{' '}
              <Link to="/register" className="text-secondary font-label-md hover:underline decoration-secondary/30 transition-all">Create an account</Link>
            </p>

            <div className="flex items-center space-x-md w-full opacity-60">
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">or continue with</span>
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
            </div>

            <div className="grid grid-cols-2 gap-md w-full">
              <button type="button" onClick={handleGoogleLogin} className="flex items-center justify-center space-x-base py-base px-md rounded-lg bg-surface/40 hover:bg-surface-variant/50 border border-outline-variant/20 transition-colors group">
                <svg className="w-5 h-5 text-on-surface opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                <span className="font-label-sm text-label-sm text-on-surface">Google</span>
              </button>
              <button type="button" onClick={handleAppleLogin} className="flex items-center justify-center space-x-base py-base px-md rounded-lg bg-surface/40 hover:bg-surface-variant/50 border border-outline-variant/20 transition-colors">
                <span className="material-symbols-outlined text-on-surface text-[20px]">apple</span>
                <span className="font-label-sm text-label-sm text-on-surface">Apple</span>
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Help */}
        <div className="mt-lg flex justify-between items-center px-sm opacity-40 hover:opacity-80 transition-opacity">
          <div className="flex space-x-md">
            <a href="#" className="font-label-sm text-label-sm text-on-surface hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="font-label-sm text-label-sm text-on-surface hover:text-primary transition-colors">Terms of Service</a>
          </div>
          <button className="flex items-center space-x-xs font-label-sm text-label-sm text-on-surface hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[16px]">help</span>
            <span>Support</span>
          </button>
        </div>
      </main>
    </div>
  );
}

