
import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Type, 
  Link, 
  Download, 
  Settings2, 
  Trash2, 
  Moon, 
  Sun,
  AlertCircle,
  Share2,
  Sparkles,
  Zap,
  ArrowRight,
  Info,
  X,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { InputType, QRSize, AppState, QRSettings } from './types';

const INITIAL_SETTINGS: QRSettings = {
  fgColor: '#0f172a',
  bgColor: '#ffffff',
  size: QRSize.MEDIUM,
  includeMargin: true,
};

type ModalType = 'docs' | 'api' | 'terms' | null;

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    inputType: InputType.TEXT,
    value: 'https://github.com',
    settings: INITIAL_SETTINGS,
    isDarkMode: false,
    error: null,
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Dark Mode handling
  useEffect(() => {
    const root = window.document.documentElement;
    if (state.isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.isDarkMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = e.target.value;
    setState(prev => ({ ...prev, value: newValue, error: null }));
  };

  const toggleDarkMode = () => setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  
  const resetApp = () => {
    setState({
      inputType: InputType.TEXT,
      value: '',
      settings: INITIAL_SETTINGS,
      isDarkMode: state.isDarkMode,
      error: null,
    });
  };

  const downloadQR = async () => {
    setIsDownloading(true);
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    await new Promise(r => setTimeout(r, 600));

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `mr-qr-${Date.now()}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setIsDownloading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(state.value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-900 dark:text-slate-100 selection:bg-primary-500 selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500 blur-lg opacity-40 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary-500 to-indigo-600 p-2.5 rounded-xl shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                <QrCode className="text-white w-7 h-7" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-extrabold tracking-tighter text-slate-900 dark:text-white leading-none">
                MR<span className="text-primary-600 dark:text-primary-500">-&gt;</span>QR
              </h1>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600 dark:text-slate-500">Premium Studio</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-6 mr-4">
                <button 
                  onClick={() => setActiveModal('docs')} 
                  className="text-sm font-bold text-slate-800 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
                >
                  <Info className="w-4 h-4" />
                  Guide
                </button>
                <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-800"></div>
             </div>
             <button 
              onClick={toggleDarkMode}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2 hover:border-primary-300 dark:hover:border-primary-700 transition-all group"
            >
              {state.isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-500 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600 group-hover:-rotate-12 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Reusable Modal Component */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setActiveModal(null)}></div>
           <div className="relative glass w-full max-w-2xl rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl p-8 lg:p-12 modal-enter max-h-[90vh] overflow-y-auto custom-scrollbar">
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X className="w-6 h-6" />
              </button>
              
              {activeModal === 'docs' && (
                <>
                  <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                    <Sparkles className="text-primary-500" />
                    How to use MR<span className="text-primary-600">-&gt;</span>QR
                  </h2>
                  <div className="space-y-6 text-slate-800 dark:text-slate-300">
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">1. Select Input Type</h3>
                      <p>Choose between <strong>Plain Text</strong> for simple messages or <strong>Website URL</strong> for redirecting users to a link. URLs automatically get formatted for standard browser reading.</p>
                    </section>
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">2. Customize Appearance</h3>
                      <p>Adjust the density (size) of your QR code. Use <strong>Pattern Color</strong> for the QR code itself and <strong>Base Background</strong> for the surrounding color. For best scanability, always keep the pattern darker than the background.</p>
                    </section>
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">3. Clean Border Option</h3>
                      <p>Enable "Clean Border" to add a protective white margin around the QR code, which helps scanners recognize it in busy environments.</p>
                    </section>
                  </div>
                </>
              )}

              {activeModal === 'api' && (
                <>
                  <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                    <Terminal className="text-indigo-500" />
                    Enterprise API
                  </h2>
                  <div className="space-y-6 text-slate-800 dark:text-slate-300">
                    <div className="p-4 bg-slate-100 dark:bg-slate-950 rounded-xl font-mono text-sm border border-slate-200 dark:border-slate-800">
                      POST /api/v1/generate<br/>
                      Authorization: Bearer YOUR_TOKEN
                    </div>
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">High Volume Generation</h3>
                      <p>Our REST API allows for mass generation of unique QR codes with dynamic data routing. Perfect for logistics, ticketing, and marketing campaigns.</p>
                    </section>
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Custom Integration</h3>
                      <p>Seamlessly integrate MR->QR engine into your internal workflows or client applications with our robust documentation and SDKs.</p>
                    </section>
                  </div>
                </>
              )}

              {activeModal === 'terms' && (
                <>
                  <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                    <ShieldCheck className="text-emerald-500" />
                    Terms of Service
                  </h2>
                  <div className="space-y-6 text-slate-800 dark:text-slate-300">
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Privacy First</h3>
                      <p>We do not store your QR content on our servers. All generation happens locally in your browser to ensure maximum data privacy.</p>
                    </section>
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Usage Rights</h3>
                      <p>QR codes generated using MR->QR Studio are free for both personal and commercial use without attribution required.</p>
                    </section>
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Misuse</h3>
                      <p>Users are responsible for the content they embed in QR codes. Misuse for phishing or malicious activities is strictly prohibited.</p>
                    </section>
                  </div>
                </>
              )}

              <button 
                onClick={() => setActiveModal(null)}
                className="mt-10 w-full py-4 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 transition-colors shadow-lg active:scale-95"
              >
                DISMISS
              </button>
           </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Controls - Left Column */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in-up">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight dark:text-white text-slate-900">
                Create with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">Precision.</span>
              </h2>
              <p className="text-slate-800 dark:text-slate-400 font-semibold text-lg max-w-xl leading-relaxed">
                MR<span className="text-primary-600">-&gt;</span>QR Studio provides studio-grade QR solutions for high-end digital branding and enterprise systems.
              </p>
            </div>

            {/* Content Input Card */}
            <div className="glass rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/40 rounded-lg">
                    <Zap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">Core Content</h3>
                </div>
                <button 
                  onClick={resetApp}
                  className="text-xs font-black uppercase tracking-widest text-slate-600 hover:text-red-600 dark:text-slate-500 dark:hover:text-red-500 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Reset Engine
                </button>
              </div>

              <div className="flex p-1.5 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                <TabButton 
                  active={state.inputType === InputType.TEXT} 
                  onClick={() => setState(p => ({ ...p, inputType: InputType.TEXT }))}
                  icon={<Type className="w-4 h-4" />}
                  label="Plain Text"
                />
                <TabButton 
                  active={state.inputType === InputType.URL} 
                  onClick={() => setState(p => ({ ...p, inputType: InputType.URL }))}
                  icon={<Link className="w-4 h-4" />}
                  label="Website Link"
                />
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                <textarea
                  value={state.value}
                  onChange={handleInputChange}
                  placeholder={state.inputType === InputType.URL ? "Paste destination URL (e.g. https://domain.com)" : "Type your message for the QR code..."}
                  className="relative w-full min-h-[160px] p-5 bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:ring-0 focus:border-primary-500 outline-none transition-all resize-none shadow-sm custom-scrollbar font-bold text-lg"
                />
              </div>
            </div>

            {/* Design Customization Card */}
            <div className="glass rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg">
                  <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">Visual DNA</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                      <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-500">Pattern Size</label>
                      <span className="text-[10px] font-black bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-900">Standard HQ</span>
                   </div>
                  <div className="flex gap-2 p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl">
                    {[
                      { label: 'Compact', value: QRSize.SMALL },
                      { label: 'Medium', value: QRSize.MEDIUM },
                      { label: 'Large', value: QRSize.LARGE }
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setState(p => ({ ...p, settings: { ...p.settings, size: opt.value } }))}
                        className={`flex-1 py-3 px-3 rounded-xl text-xs font-black transition-all transform active:scale-95 ${
                          state.settings.size === opt.value
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl'
                            : 'text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-end">
                   <label className="flex items-center gap-4 cursor-pointer select-none group p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-primary-300 dark:hover:border-primary-700 transition-all">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={state.settings.includeMargin}
                        onChange={(e) => setState(p => ({ ...p, settings: { ...p.settings, includeMargin: e.target.checked } }))}
                        className="peer sr-only"
                      />
                      <div className="w-12 h-6 bg-slate-300 dark:bg-slate-800 rounded-full peer-checked:bg-primary-600 transition-colors shadow-inner"></div>
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-md"></div>
                    </div>
                    <span className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-slate-300">Clean Border</span>
                  </label>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <ModernColorPicker 
                    label="QR Pattern Color" 
                    color={state.settings.fgColor} 
                    onChange={(c) => setState(p => ({ ...p, settings: { ...p.settings, fgColor: c } }))} 
                  />
                  <ModernColorPicker 
                    label="Core Background" 
                    color={state.settings.bgColor} 
                    onChange={(c) => setState(p => ({ ...p, settings: { ...p.settings, bgColor: c } }))} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview - Right Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 animate-fade-in-up [animation-delay:200ms]">
            <div className="relative group">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-[60px] group-hover:bg-primary-500/30 transition-all duration-700"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[60px] group-hover:bg-indigo-500/30 transition-all duration-700"></div>
              
              <div className="relative glass rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-10">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-800 dark:text-slate-500">Engine Ready</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-800"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-800"></div>
                  </div>
                </div>

                <div className="relative p-8 rounded-[2.5rem] bg-white shadow-2xl shadow-indigo-100/50 dark:shadow-none transition-all duration-500 group-hover:scale-105 border border-slate-200 dark:border-slate-800/50 group/qr">
                  {state.value ? (
                    <div className="relative overflow-hidden rounded-2xl">
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent shadow-[0_0_20px_rgba(139,92,246,0.6)] z-10 animate-scan pointer-events-none opacity-0 group-hover/qr:opacity-100 transition-opacity"></div>
                      <QRCodeCanvas
                        id="qr-canvas"
                        value={state.value}
                        size={state.settings.size}
                        fgColor={state.settings.fgColor}
                        bgColor={state.settings.bgColor}
                        level="H"
                        includeMargin={state.settings.includeMargin}
                        className="rounded-lg"
                        style={{ height: "auto", maxWidth: "100%", width: "100%", display: 'block' }}
                      />
                    </div>
                  ) : (
                    <div className="w-64 h-64 flex flex-col items-center justify-center text-slate-300 dark:text-slate-800 gap-6">
                      <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-full animate-bounce-subtle">
                        <QrCode className="w-16 h-16 opacity-40" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Waiting for Core Data</span>
                    </div>
                  )}
                </div>

                <div className="mt-12 w-full space-y-4">
                  <button 
                    disabled={!state.value || isDownloading}
                    onClick={downloadQR}
                    className="relative w-full group/btn overflow-hidden rounded-2xl p-0.5 active:scale-95 transition-transform"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-indigo-600"></div>
                    <div className={`relative flex items-center justify-center gap-3 bg-slate-900 dark:bg-slate-900 group-hover/btn:bg-transparent text-white font-black py-5 transition-all duration-300 ${isDownloading ? 'opacity-90' : ''}`}>
                      {isDownloading ? (
                        <div className="flex items-center gap-3">
                           <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                           <span className="tracking-widest uppercase text-xs">Processing Export...</span>
                        </div>
                      ) : (
                        <>
                          <Download className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                          <span className="tracking-widest uppercase text-xs">Export Studio Assets</span>
                        </>
                      )}
                    </div>
                  </button>

                  <button 
                    disabled={!state.value}
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 disabled:opacity-50 text-slate-900 dark:text-slate-200 font-black py-5 px-6 rounded-2xl transition-all active:scale-95 border border-slate-300 dark:border-slate-700 uppercase text-xs tracking-[0.2em] shadow-sm"
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-500">Asset Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        <span>Clone Data</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 opacity-60">
                <div className="flex gap-1.5">
                   {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-4 bg-slate-400 dark:bg-slate-800 rounded-full"></div>)}
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-600 dark:text-slate-600">Production Certified Engine</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="glass border-t border-slate-300 dark:border-slate-800/50 py-16 mt-auto overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-1 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
             <button onClick={() => setActiveModal('docs')} className="text-[10px] font-black tracking-widest text-slate-700 hover:text-primary-700 dark:text-slate-500 dark:hover:text-primary-400 transition-colors uppercase">Documentation</button>
             <button onClick={() => setActiveModal('api')} className="text-[10px] font-black tracking-widest text-slate-700 hover:text-primary-700 dark:text-slate-500 dark:hover:text-primary-400 transition-colors uppercase">Enterprise API</button>
             <button onClick={() => setActiveModal('terms')} className="text-[10px] font-black tracking-widest text-slate-700 hover:text-primary-700 dark:text-slate-500 dark:hover:text-primary-400 transition-colors uppercase">Terms of Service</button>
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
              MR<span className="text-primary-600 dark:text-primary-500">-&gt;</span>QR <span className="text-slate-500 dark:text-slate-600 font-bold italic">STUDIO</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-600 text-[9px] font-black tracking-[0.6em] uppercase">
              The Standard in Visual Data Encoding.
            </p>
          </div>
          <p className="text-slate-500 dark:text-slate-700 text-[8px] font-black tracking-[0.1em]">
            &copy; {new Date().getFullYear()} ALL ENGINES PROTECTED BY MR-QR PROTOCOL.
          </p>
        </div>
      </footer>
    </div>
  );
};

// --- Specialized Sub-components ---

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ 
  active, onClick, icon, label 
}) => (
  <button
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[10px] font-black transition-all duration-300 uppercase tracking-widest border ${
      active 
        ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm border-slate-300 dark:border-slate-700 scale-[1.03] z-10' 
        : 'text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 border-transparent'
    }`}
  >
    {icon}
    {label}
  </button>
);

const ModernColorPicker: React.FC<{ label: string; color: string; onChange: (c: string) => void }> = ({ label, color, onChange }) => (
  <div className="space-y-4">
    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-500">{label}</label>
    <div className="group relative flex items-center gap-5 p-4 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-3xl transition-all focus-within:border-primary-500/50 hover:border-slate-400 dark:hover:border-slate-700 shadow-sm">
      <div className="relative w-14 h-14 flex-shrink-0 group/picker">
        <div 
          className="absolute inset-0 rounded-2xl shadow-inner border border-slate-200 dark:border-white/10 group-hover/picker:scale-110 transition-transform duration-300" 
          style={{ backgroundColor: color }}
        ></div>
        <input 
          type="color" 
          value={color} 
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-mono font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">{color}</span>
        <span className="text-[9px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest">Hex DNA</span>
      </div>
    </div>
  </div>
);

export default App;
