import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { register, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      clearError();
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'docs_upload_preset_tutorial';
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Upload failed');
      return data.secure_url;
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      let avatarUrl = undefined;
      
      if (avatarFile) {
        avatarUrl = await uploadToCloudinary(avatarFile);
      }

      await register(name, email, password, avatarUrl);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by store or uploadToCloudinary
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Top Navigation Anchor */}
      <nav className="sticky top-0 z-50 w-full bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm">
        <div className="flex justify-between items-center px-gutter py-sm w-full max-w-container-max mx-auto">
          <Link to="/" className="flex items-center gap-base">
            <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>travel_explore</span>
            <span className="font-headline-lg text-headline-lg font-bold tracking-tight text-primary-container dark:text-primary-fixed-dim">Traveloop</span>
          </Link>
          <div className="hidden md:flex items-center gap-lg">
            <Link to="/about" className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary">About</Link>
            <Link to="/premium" className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary">Premium</Link>
            <Link to="/support" className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary">Support</Link>
          </div>
          <div className="flex items-center gap-sm">
            <button className="p-2 rounded-lg hover:bg-primary/10 transition-all active:scale-95">
              <span className="material-symbols-outlined text-on-surface-variant">language</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-xl px-gutter relative">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
          
          {/* Left Info Side */}
          <div className="lg:col-span-5 hidden lg:block">
            <h1 className="font-display-lg text-display-lg text-on-surface mb-md">Join the elite circle of travelers.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-[28rem]">
              Unlock a world of planned spontaneity. Manage your itineraries, expenses, and travel journals in one sophisticated platform.
            </p>
            <div className="space-y-md">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">map</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">Smart Itineraries</p>
                  <p className="text-sm text-on-surface-variant opacity-70">AI-powered travel planning.</p>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">Expense Tracking</p>
                  <p className="text-sm text-on-surface-variant opacity-70">Seamless budget management.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Registration Form Area */}
          <div className="lg:col-span-7">
            <div className="bg-surface/70 backdrop-blur-[24px] border border-white/5 p-lg rounded-[2rem] shadow-xl">
              <div className="flex flex-col items-center mb-lg">
                <div className="relative group" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-outline-variant flex flex-col items-center justify-center bg-surface-container-high transition-all hover:bg-surface-container-highest cursor-pointer overflow-hidden mb-sm">
                    <img 
                      alt="Avatar"
                      className={`w-full h-full object-cover transition-opacity ${avatarPreview ? 'opacity-100' : 'opacity-50 group-hover:opacity-70'}`} 
                      src={avatarPreview || "https://lh3.googleusercontent.com/aida-public/AB6AXuDwkmOYgIIvYdt8o8nvjIHPc67Agky2lr8eHDNO0wPnYoD_THbOKYnU7MGQhYkvOo2PVLVk-dBsuaV2v-tjc7l3C26v7whmVE00gTIvwLxzXhYAH03pSTRfURkwuwAcPw3OjWizOzOJye_vsGmzxr_GwJGwEUvyMcPiJuDAKehnl64aB4BHnoqYJQa5R_cl4D33GC0W1HW7fhj9CkkEPfJo-aLlR6bl7bV9rK_4t1eDKon699R9jYMzlSndvmA1U05C2C7VDxHKlj4M"} 
                    />
                    {!avatarPreview && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/40">
                        <span className="material-symbols-outlined text-primary mb-1">add_a_photo</span>
                        <span className="text-[10px] font-label-sm uppercase tracking-wider text-on-primary-container">Upload</span>
                      </div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                  />
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Create Account</h2>
                <p className="text-on-surface-variant font-label-md">Register with Traveloop</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl flex items-start gap-2">
                    <span>{error}</span>
                  </div>
                )}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant block ml-1">Full Name</label>
                    <input 
                      type="text"
                      required
                      value={name}
                      onChange={(e) => { setName(e.target.value); clearError(); }}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-md py-sm text-on-surface placeholder:text-outline/50 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant block ml-1">Email Address</label>
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); clearError(); }}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-md py-sm text-on-surface placeholder:text-outline/50 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" 
                      placeholder="john.doe@example.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface-variant block ml-1">Password</label>
                    <input 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); clearError(); }}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-md py-sm text-on-surface placeholder:text-outline/50 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" 
                      placeholder="••••••••" 
                    />
                  </div>
                </div>

                <div className="pt-sm">
                  <button 
                    type="submit"
                    disabled={isLoading || isUploading}
                    className="w-full bg-gradient-to-r from-primary-container to-inverse-primary text-on-primary py-md rounded-xl font-label-md text-lg shadow-lg shadow-primary-container/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-sm group disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {(isLoading || isUploading) ? <Loader2 className="animate-spin h-5 w-5" /> : null}
                    {isUploading ? 'Uploading Image...' : (isLoading ? 'Creating account...' : 'Register')}
                    {(!isLoading && !isUploading) && <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>}
                  </button>
                </div>
              </form>

              <div className="mt-lg text-center">
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline transition-all">Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Space */}
      <footer className="w-full max-w-container-max mx-auto px-gutter py-lg flex flex-col md:flex-row justify-between items-center border-t border-outline-variant/10">
        <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60 mb-sm md:mb-0">© 2024 Traveloop Premium. All rights reserved.</p>
        <div className="flex gap-lg">
          <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
