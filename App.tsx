import React, { useState, useEffect, useRef } from 'react';
import { 
  Plane, MapPin, Wallet, Calendar, Plus, Check, 
  Trash2, Download, Printer, Map, ListChecks, Info, CreditCard,
  Bell, BellRing, Train, Bus, ShieldAlert, Wifi, Globe, HeartPulse,
  Utensils, AlertTriangle, Fingerprint, CalendarCheck, User as UserIcon, LogOut, Save, History, Search,
  ArrowRight, Share2, MessageSquare, Instagram, Mail as MailIcon, ExternalLink, Car, CloudSun, Timer,
  Sparkles, Camera, X, Link, Users, Baby, Accessibility, Minus, Hotel, Ticket, Info as InfoIcon,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  THEMES, COUNTRIES, CURRENCIES, GEODATA 
} from './constants';
import { Location, TravelPreferences, TripItinerary, User } from './types';
import { generateItinerary } from './geminiService';
import { LoadingScreen } from './components/LoadingScreen';
import { VoiceInput } from './components/VoiceInput';
import { AuthModal } from './components/AuthModal';

// --- High-Fidelity PDF Export Component ---
const PrintItinerary: React.FC<{ itinerary: TripItinerary, currency: string }> = ({ itinerary, currency }) => (
  <div id="pdf-itinerary-root" className="bg-[#fcfcfc] text-[#1B211A] p-10 space-y-8 w-[800px] mx-auto min-h-screen text-[12px] shadow-none">
    <div className="border-b-[6px] border-[#628141] pb-6 flex justify-between items-end">
      <div>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">Voyager <span className="text-[#628141]">Elite</span></h1>
        <p className="text-[10px] font-black text-gray-400 tracking-[0.4em] uppercase">Craft your Expedition</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Curated for Ultimate Comfort</p>
        <p className="text-[9px] font-bold text-[#628141]">Issue ID: {itinerary.id || 'AGNT-001'}</p>
      </div>
    </div>

    <div className="space-y-4">
      <h2 className="text-4xl font-black tracking-tighter uppercase leading-tight italic">{itinerary.title}</h2>
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <p className="text-sm text-gray-600 font-medium leading-relaxed italic">"{itinerary.overview}"</p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 col-span-2 shadow-sm">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#628141] mb-3">Destination Weather</h3>
        <div className="flex items-center gap-6">
          <span className="text-4xl font-black">{itinerary.weather.averageTemp}</span>
          <div className="border-l pl-6 border-gray-100">
            <p className="font-black text-[12px] uppercase">{itinerary.weather.conditions}</p>
            <p className="text-[11px] text-gray-400 italic font-medium">{itinerary.weather.advice}</p>
          </div>
        </div>
      </div>
      <div className="bg-[#1B211A] p-6 rounded-2xl text-white flex flex-col justify-center shadow-lg">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#628141] mb-2">Estimated Investment</h3>
        <div className="text-3xl font-black text-[#8BAE66]">{currency} {Object.values(itinerary.budgetBreakdown).reduce((a: number, b: unknown) => a + (b as number), 0).toLocaleString()}</div>
        <p className="text-[9px] opacity-40 uppercase tracking-widest mt-2">Verified Price Intelligence</p>
      </div>
    </div>

    {itinerary.availabilityAlerts && itinerary.availabilityAlerts.length > 0 && (
      <div className="space-y-3">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-orange-600 flex items-center gap-2">
          <Bell size={14} /> Critical Travel Alerts (MakeMyTrip)
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {itinerary.availabilityAlerts.map((alert, i) => (
            <div key={i} className="bg-orange-50 border border-orange-100 p-4 rounded-xl text-[12px] flex justify-between items-center">
              <span className="font-bold text-orange-900"><span className="uppercase text-[9px] opacity-60 mr-2">{alert.type}:</span> {alert.message}</span>
              <span className="text-[9px] font-black uppercase text-orange-400 tracking-widest">{alert.provider}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="space-y-8">
      <h3 className="text-2xl font-black uppercase tracking-tight border-b-2 border-gray-100 pb-3 flex items-center gap-3 italic">
        <Calendar className="text-[#628141]" size={24} /> Journey Schedule
      </h3>
      {itinerary.days.map((day, idx) => (
        <div key={idx} className="space-y-6" style={{ pageBreakInside: 'avoid' }}>
          <div className="flex items-center gap-4">
            <div className="bg-[#628141] text-white px-3 py-1.5 rounded-lg font-black text-xs">DAY {day.day}</div>
            <h4 className="text-xl font-black uppercase italic tracking-tight text-[#1B211A]">{day.theme}</h4>
          </div>
          <div className="grid gap-5 ml-6 border-l-4 border-[#628141]/5 pl-8">
            {day.activities.map((act, i) => (
              <div key={i} className="bg-white p-5 rounded-3xl border border-gray-50 shadow-sm space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-400">
                  <span className="text-[#628141] font-mono text-sm">{act.time}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={12} /> {act.location}</span>
                </div>
                <h5 className="text-[16px] font-black text-[#1B211A]">{act.title}</h5>
                <p className="text-[13px] text-gray-500 leading-relaxed font-medium">{act.description}</p>
                {act.tips && <p className="text-[11px] italic text-[#628141] bg-[#628141]/5 p-3 rounded-xl border border-[#628141]/10 font-bold">Expert Note: {act.tips}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div style={{ pageBreakBefore: 'always' }} />

    <div className="grid grid-cols-2 gap-10">
      <div className="space-y-8">
        <h3 className="text-2xl font-black uppercase tracking-tight border-b-2 pb-3 italic">Traveler Insights</h3>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-6">
          <h4 className="text-[10px] font-black uppercase text-[#628141] tracking-widest">Dietary Survival Guide</h4>
          <div className="grid grid-cols-1 gap-3">
            {itinerary.dietaryAdvice.translator.map((t, i) => (
              <div key={i} className="flex justify-between border-b border-gray-50 pb-2 last:border-0 items-center">
                <span className="font-bold text-[13px]">{t.phrase}</span>
                <span className="text-[#628141] font-black italic">{t.translation}</span>
              </div>
            ))}
          </div>
          {itinerary.dietaryAdvice.safeStreetFoodProtocols && (
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Safe Dining Protocols</p>
              <ul className="list-disc pl-5 text-[11px] space-y-1.5 font-medium text-gray-600 italic">
                {itinerary.dietaryAdvice.safeStreetFoodProtocols.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-8">
        <h3 className="text-2xl font-black uppercase tracking-tight border-b-2 pb-3 italic">Expert Protocol</h3>
        <div className="bg-[#628141]/5 p-6 rounded-3xl border border-[#628141]/10 space-y-6">
          <h4 className="text-[10px] font-black uppercase text-[#628141] tracking-widest">Exclusive Local Gems</h4>
          <ul className="text-[12px] font-bold text-gray-700 space-y-3">
            {itinerary.insiderKnowledge.secretSpots.map((s, i) => <li key={i} className="flex gap-3 items-start">
              <Sparkles size={14} className="text-[#628141] shrink-0 mt-0.5" /> {s}
            </li>)}
          </ul>
          <h4 className="text-[10px] font-black uppercase text-red-600 mt-6 tracking-widest">Tourist Traps (Avoid)</h4>
          <ul className="text-[12px] font-bold text-red-900 space-y-3">
            {itinerary.insiderKnowledge.touristTraps.map((s, i) => <li key={i} className="flex gap-3 items-start">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" /> {s}
            </li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<TripItinerary | null>(null);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'finances' | 'logistics' | 'guide'>('itinerary');
  const printableRef = useRef<HTMLDivElement>(null);

  const [origin, setOrigin] = useState<Location>({ country: 'India', state: 'Uttar Pradesh', city: 'Lucknow' });
  const [destination, setDestination] = useState<Location>({ country: 'India', state: 'Maharashtra', city: 'Mumbai' });
  const [passportCountry, setPassportCountry] = useState('India');
  const [budget, setBudget] = useState<number>(50000);
  const [currency, setCurrency] = useState('INR');
  const [duration, setDuration] = useState(3);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(['culture', 'food']);
  const [travelers, setTravelers] = useState({ adults: 1, children: 0, seniors: 0 });

  useEffect(() => {
    const savedUser = localStorage.getItem('voyager_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    else setShowAuthModal(true);
    
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('itinerary');
    if (sharedData) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(sharedData)));
        setItinerary(decoded);
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) { console.error("Link invalid."); }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('voyager_user');
    setCurrentUser(null);
    setItinerary(null);
    setShowHistory(false);
    setShowAuthModal(true);
  };

  const handleGenerate = async () => {
    if (!currentUser) { setShowAuthModal(true); return; }
    if (!origin.city || !destination.city) { alert("Please specify departure and destination hubs."); return; }
    setIsLoading(true);
    try {
      const result = await generateItinerary({
        origin, destination, passportCountry, budget, currency, 
        durationDays: duration, themes: selectedThemes, travelers
      });
      
      const tripWithMeta = { ...result, id: `TRIP-${Date.now()}`, savedAt: new Date().toISOString() };
      setItinerary(tripWithMeta);
      
      if (currentUser) {
        const updatedUser = { ...currentUser, savedTrips: [tripWithMeta, ...currentUser.savedTrips] };
        setCurrentUser(updatedUser);
        localStorage.setItem('voyager_user', JSON.stringify(updatedUser));
        const allUsers: User[] = JSON.parse(localStorage.getItem('voyager_users') || '[]');
        const idx = allUsers.findIndex(u => u.email === currentUser.email);
        if (idx !== -1) { allUsers[idx] = updatedUser; localStorage.setItem('voyager_users', JSON.stringify(allUsers)); }
      }
      
      confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 }, colors: ['#628141', '#8BAE66', '#EBD5AB'] });
    } catch (e) { alert("Itinerary generation failed. Please check your uplink."); }
    finally { setIsLoading(false); }
  };

  const handleDownloadPDF = async () => {
    if (!itinerary || !printableRef.current) return;
    const element = printableRef.current;
    element.style.display = 'block';
    
    const opt = {
      margin: 0,
      filename: `Voyager_Elite_Plan_${itinerary.title.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 3, useCORS: true, backgroundColor: '#fcfcfc', logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      // @ts-ignore
      await window.html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally { element.style.display = 'none'; }
  };

  const handleShareSmart = () => {
    if (!itinerary) return;
    const data = btoa(encodeURIComponent(JSON.stringify(itinerary)));
    const shareUrl = `${window.location.origin}${window.location.pathname}?itinerary=${data}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Professional Itinerary Link Copied to Clipboard!");
  };

  const updateTravelers = (type: keyof typeof travelers, delta: number) => {
    setTravelers(prev => ({ ...prev, [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + delta) }));
  };

  const LocationPicker = ({ label, value, onChange }: { label: string, value: Location, onChange: (l: Location) => void }) => {
    const states = value.country ? Object.keys(GEODATA[value.country] || {}) : [];
    const cities = value.state ? (GEODATA[value.country]?.[value.state] || []) : [];
    return (
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#628141] flex items-center gap-2">
          {label === 'Departure' ? <Plane className="rotate-45" size={12} /> : <MapPin size={12} />} {label} Hub
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <select className="p-2.5 text-[11px] font-black rounded-xl border border-gray-100 bg-white/60 outline-none uppercase tracking-wider" value={value.country} onChange={(e) => onChange({ country: e.target.value, state: '', city: '' })}>
            <option value="">Select Country</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="p-2.5 text-[11px] font-black rounded-xl border border-gray-100 bg-white/60 outline-none uppercase tracking-wider disabled:opacity-30" value={value.state} disabled={!value.country} onChange={(e) => onChange({ ...value, state: e.target.value, city: '' })}>
            <option value="">Region/State</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="p-2.5 text-[11px] font-black rounded-xl border border-gray-100 bg-white/60 outline-none uppercase tracking-wider disabled:opacity-30" value={value.city} disabled={!value.state} onChange={(e) => onChange({ ...value, city: e.target.value })}>
            <option value="">Primary City</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 relative min-h-screen">
      {isLoading && <LoadingScreen />}
      
      {/* Hidden PDF Export Template */}
      <div ref={printableRef} style={{ display: 'none' }}>
        {itinerary && <PrintItinerary itinerary={itinerary} currency={currency} />}
      </div>

      {showAuthModal && <AuthModal onClose={() => { if(currentUser) setShowAuthModal(false); }} onSuccess={(u) => { setCurrentUser(u); setShowAuthModal(false); }} />}

      {/* Navigation Header */}
      <div className="flex justify-between items-center mb-10 no-print">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setItinerary(null); setShowHistory(false); }}>
          <div className="bg-[#628141] p-2.5 rounded-2xl shadow-xl group-hover:scale-110 transition-transform"><Plane className="text-white" size={22} /></div>
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter drop-shadow-lg">Voyager <span className="text-[#628141]">Elite</span></h1>
        </div>
        <div className="flex items-center gap-3">
          {currentUser && (
            <div className="flex items-center gap-4">
              <button onClick={() => { setShowHistory(!showHistory); setItinerary(null); }} className={`p-2.5 rounded-xl transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${showHistory ? 'bg-white text-[#628141] shadow-xl' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
                <History size={18} /> Archive
              </button>
              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-white/20 shadow-lg">
                <div className="bg-[#8BAE66] w-7 h-7 rounded-full flex items-center justify-center font-black text-[11px] text-white shadow-inner">{currentUser.name[0]}</div>
                <span className="text-white text-[11px] font-black hidden sm:inline tracking-wider">{currentUser.name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="text-white/40 hover:text-white ml-2 transition-colors"><LogOut size={16} /></button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* App Logic Control Flow */}
      {!currentUser ? (
        <div className="card p-12 max-w-lg mx-auto mt-20 text-center space-y-8 animate-fade-in border-t-[10px] border-[#628141]">
          <div className="bg-[#628141]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-[#628141] shadow-inner"><Fingerprint size={40} /></div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic">Travel <span className="text-[#628141]">Elite Access</span></h2>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">Please authenticate your account to generate world-class, real-time travel itineraries and access your private archive.</p>
          </div>
          <button onClick={() => setShowAuthModal(true)} className="w-full py-5 bg-[#628141] text-white rounded-2xl font-black text-lg hover:bg-[#1B211A] transition-all shadow-2xl shadow-[#628141]/30">INITIALIZE ACCESS</button>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Protocol Version 5.1.2 - Secure</p>
        </div>
      ) : showHistory ? (
        <div className="space-y-8 animate-fade-in no-print">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Expedition <span className="text-[#628141]">Archive</span></h2>
            <button onClick={() => setShowHistory(false)} className="bg-white/10 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 border border-white/20 hover:bg-white hover:text-[#628141] transition-all"><Plus size={16} /> Create New Plan</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentUser.savedTrips.length === 0 ? (
              <div className="col-span-full card p-20 text-center space-y-4">
                <Search size={48} className="mx-auto text-gray-200" />
                <h3 className="text-xl font-black text-gray-400 uppercase italic">No Expeditions Planned</h3>
              </div>
            ) : (
              currentUser.savedTrips.map(trip => (
                <div key={trip.id} onClick={() => { setItinerary(trip); setShowHistory(false); }} className="card p-6 cursor-pointer hover:border-[#628141] transition-all group hover:scale-[1.02] shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{new Date(trip.savedAt!).toLocaleDateString()}</span>
                    <span className="text-[8px] font-black uppercase bg-[#628141]/10 text-[#628141] px-3 py-1 rounded-full border border-[#628141]/10">Curated Plan</span>
                  </div>
                  <h3 className="text-xl font-black text-[#1B211A] leading-tight group-hover:text-[#628141] transition-colors line-clamp-2">{trip.title}</h3>
                  <p className="text-[11px] text-gray-400 mt-3 line-clamp-3 italic leading-relaxed">"{trip.overview}"</p>
                  <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#628141]">View Schedule</span>
                    <ArrowRight size={18} className="text-[#628141] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : !itinerary ? (
        <div className="card p-8 md:p-12 space-y-8 animate-fade-in border-t-[10px] border-[#628141] no-print">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black text-[#1B211A] tracking-tighter uppercase italic">Craft Your <span className="text-[#628141]">Expedition</span></h2>
            <VoiceInput onTranscript={(t) => console.log(t)} />
          </div>

          <div className="space-y-8">
            <LocationPicker label="Departure" value={origin} onChange={setOrigin} />
            <LocationPicker label="Destination" value={destination} onChange={setDestination} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#628141] flex items-center gap-2"><Users size={16} /> Travel Party Size</label>
                <div className="grid grid-cols-3 gap-3">
                  {['adults', 'children', 'seniors'].map((type) => (
                    <div key={type} className="flex flex-col items-center bg-gray-50 p-3 rounded-2xl border border-gray-100 shadow-inner">
                      <span className="text-[9px] font-black uppercase text-gray-400 mb-2">{type}</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateTravelers(type as any, -1)} className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 transition-colors"><Minus size={12} /></button>
                        <span className="text-sm font-black text-[#1B211A]">{travelers[type as keyof typeof travelers]}</span>
                        <button onClick={() => updateTravelers(type as any, 1)} className="p-1.5 rounded-lg bg-[#628141] text-white hover:bg-[#1B211A] transition-colors"><Plus size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#628141] flex items-center gap-2"><Wallet size={16} /> Expenditure Target</label>
                <div className="flex gap-3">
                  <input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="flex-1 p-3.5 text-sm font-black rounded-2xl border border-gray-100 bg-white/60 outline-none shadow-inner" placeholder="Enter amount" />
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-28 p-3.5 text-sm font-black rounded-2xl border border-gray-100 bg-white/60 outline-none shadow-inner">
                    {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3 col-span-1">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#628141] flex items-center gap-2"><Calendar size={16} /> Trip Duration</label>
                <div className="flex flex-wrap gap-2">
                  {[2, 3, 5, 7, 10, 14, 21, 30].map(d => (
                    <button key={d} onClick={() => setDuration(d)} className={`px-4 py-2.5 text-[11px] font-black rounded-xl border transition-all ${duration === d ? 'bg-[#628141] text-white border-[#628141] shadow-lg scale-105' : 'bg-white border-gray-100 text-gray-500 hover:border-[#628141] hover:text-[#628141]'}`}>{d} Days</button>
                  ))}
                </div>
              </div>
              <div className="space-y-3 col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#628141] flex items-center gap-2">Expedition Themes</label>
                <div className="flex flex-wrap gap-2">
                  {THEMES.map(theme => (
                    <button key={theme.id} onClick={() => setSelectedThemes(prev => prev.includes(theme.id) ? prev.filter(t => t !== theme.id) : [...prev, theme.id])} className={`px-4 py-2 text-[10px] font-black rounded-full border transition-all flex items-center gap-2 ${selectedThemes.includes(theme.id) ? 'bg-[#8BAE66] border-[#8BAE66] text-white shadow-md scale-105' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}>
                      <span>{theme.icon}</span> {theme.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button onClick={handleGenerate} className="w-full py-6 bg-[#628141] text-white rounded-[2rem] font-black text-2xl hover:bg-[#1B211A] transition-all shadow-2xl shadow-[#628141]/30 flex items-center justify-center gap-4 group active:scale-[0.98]">
            <Globe className="group-hover:rotate-45 transition-transform duration-500" size={32} /> GENERATE AN ITINERARY
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in pb-20">
          {/* Active Professional View */}
          <div className="card p-8 border-l-[10px] border-[#628141] shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
               <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                     <span className="bg-[#628141]/10 text-[#628141] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-[#628141]/20 shadow-sm">Verified Elite Guide</span>
                     <span className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-orange-100 flex items-center gap-2 shadow-sm">
                        <CloudSun size={14} /> {itinerary.weather.averageTemp} - {itinerary.weather.conditions}
                     </span>
                  </div>
                  <h2 className="text-4xl font-black text-[#1B211A] leading-tight tracking-tighter uppercase italic">{itinerary.title}</h2>
                  <p className="text-gray-500 text-[15px] font-medium italic max-w-3xl leading-relaxed">"{itinerary.overview}"</p>
               </div>
               <div className="flex gap-3 no-print w-full md:w-auto">
                  <button onClick={handleShareSmart} className="flex-1 md:flex-none p-4 bg-white border border-gray-100 text-[#1B211A] rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-gray-50 shadow-md flex items-center justify-center gap-2 transition-all"><Share2 size={18} /> Smart Share</button>
                  <button onClick={handleDownloadPDF} className="flex-1 md:flex-none p-4 bg-[#1B211A] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#628141] shadow-2xl flex items-center justify-center gap-2 transition-all"><Download size={18} /> Export PDF</button>
               </div>
            </div>
          </div>

          {/* Real-Time Market Alerts Bar */}
          {itinerary.availabilityAlerts && itinerary.availabilityAlerts.length > 0 && (
            <div className="flex overflow-x-auto no-scrollbar gap-4 no-print pb-2">
              {itinerary.availabilityAlerts.map((alert, i) => (
                <div key={i} className="flex-shrink-0 bg-white/95 backdrop-blur-xl border-l-[6px] border-orange-500 p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-slide-in-right border border-orange-100" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="bg-orange-100 p-3 rounded-xl text-orange-600 shadow-inner"><BellRing size={20} /></div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{alert.type} Intelligence</p>
                    <p className="text-[13px] font-black text-[#1B211A] leading-tight">{alert.message}</p>
                  </div>
                  <div className="ml-6 flex flex-col items-end">
                    <span className="text-[9px] font-black text-orange-400 uppercase italic tracking-widest">via {alert.provider}</span>
                    <ExternalLink size={12} className="text-orange-200 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Core Navigation Tabs */}
          <div className="flex bg-white/90 backdrop-blur-3xl rounded-3xl shadow-2xl no-print overflow-hidden border border-white/40">
            {[
              { id: 'itinerary', label: 'Daily Schedule', icon: Map },
              { id: 'finances', label: 'Investment', icon: CreditCard },
              { id: 'logistics', label: 'Travel Logistics', icon: ListChecks },
              { id: 'guide', label: 'Travel Insights', icon: ShieldAlert },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex-1 flex items-center justify-center gap-3 py-5 px-3 font-black text-[11px] uppercase tracking-[0.2em] transition-all relative ${activeTab === tab.id ? 'bg-white text-[#628141] shadow-inner' : 'text-gray-400 hover:text-gray-600'}`}>
                <tab.icon size={20} /> <span className="hidden sm:inline">{tab.label}</span>
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#628141]" />}
              </button>
            ))}
          </div>

          <div className="min-h-[500px]">
             {activeTab === 'itinerary' && (
                <div className="space-y-6 animate-fade-in">
                   {itinerary.days.map(day => (
                      <div key={day.day} className="card p-8 shadow-xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-[#628141]/5 rounded-full blur-3xl -mr-10 -mt-10" />
                         <div className="flex items-center gap-4 mb-10 border-b pb-5 border-gray-100 relative z-10">
                            <div className="bg-[#628141] text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-lg shadow-[#628141]/20">{day.day}</div>
                            <h3 className="text-2xl font-black uppercase text-[#1B211A] italic tracking-tight">{day.theme}</h3>
                         </div>
                         <div className="space-y-10 relative z-10">
                            {day.activities.map((act, i) => (
                               <div key={i} className="flex flex-col sm:flex-row gap-6 group">
                                  <div className="text-[#628141] font-black font-mono text-sm pt-1 shrink-0 w-24 border-r border-[#628141]/10">{act.time}</div>
                                  <div className="space-y-3 flex-1">
                                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400"><MapPin size={14} /> {act.location}</div>
                                     <h4 className="text-[20px] font-black text-[#1B211A] leading-tight group-hover:text-[#628141] transition-colors">{act.title}</h4>
                                     <p className="text-gray-500 text-sm leading-relaxed font-medium">{act.description}</p>
                                     {act.tips && <div className="bg-[#628141]/5 p-4 rounded-2xl text-[12px] italic text-[#628141] border border-[#628141]/10 flex items-start gap-3 shadow-sm"><Sparkles size={16} className="shrink-0 mt-0.5" /> <span>{act.tips}</span></div>}
                                     <div className="flex items-center gap-6 pt-2">
                                       <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest border border-gray-100 px-3 py-1 rounded-lg shadow-inner bg-gray-50">{currency} {act.cost.toLocaleString()}</span>
                                       {act.travelTimeBuffer && <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2"><Timer size={14} /> Buffer: {act.travelTimeBuffer}</span>}
                                     </div>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   ))}
                </div>
             )}

             {activeTab === 'finances' && (
                <div className="card p-10 animate-fade-in space-y-12">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                      <div className="space-y-8">
                         <h3 className="text-2xl font-black uppercase italic tracking-tighter border-b-2 pb-4 border-[#628141]/10 flex items-center gap-3"><Wallet className="text-[#628141]" /> Resource Allocation</h3>
                         {Object.entries(itinerary.budgetBreakdown).map(([cat, val]) => (
                            <div key={cat} className="space-y-3">
                               <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                                  <span className="capitalize">{cat}</span>
                                  <span className="text-[#1B211A] font-black">{currency} {(val as number).toLocaleString()}</span>
                               </div>
                               <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                                  <div className="h-full bg-gradient-to-r from-[#628141] to-[#8BAE66] transition-all duration-1000 shadow-[0_0_10px_rgba(98,129,65,0.2)]" style={{ width: `${((val as number) / budget) * 100}%` }} />
                               </div>
                            </div>
                         ))}
                      </div>
                      <div className="bg-[#1B211A] p-10 rounded-[3rem] text-white space-y-6 flex flex-col justify-center shadow-2xl relative overflow-hidden border border-white/5">
                         <div className="absolute top-0 right-0 w-40 h-40 bg-[#628141]/15 rounded-full blur-[60px] -mr-10 -mt-10" />
                         <div className="text-[11px] font-black uppercase opacity-40 tracking-[0.4em]">Net Expedition Investment</div>
                         <div className="text-6xl font-black text-[#8BAE66] tracking-tighter italic leading-none">{currency} {Object.values(itinerary.budgetBreakdown).reduce((a: number, b) => a + (b as number), 0).toLocaleString()}</div>
                         <div className="pt-8 border-t border-white/10 text-[13px] italic opacity-60 leading-relaxed space-y-2">
                            <p><strong>Primary Protocol:</strong> {itinerary.paymentAdvice.method}</p>
                            <p><strong>Gratuity Guideline:</strong> {itinerary.paymentAdvice.tipping}</p>
                         </div>
                      </div>
                   </div>
                </div>
             )}

             {activeTab === 'logistics' && (
                <div className="space-y-8 animate-fade-in">
                  {/* NEW BOOKING CONCIERGE SECTION */}
                  <div className="card p-10 space-y-8 border-t-8 border-red-600 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                      <div>
                        <h4 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-4 text-[#1B211A]">
                          <Ticket size={28} className="text-red-600" /> Booking Concierge
                        </h4>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-2">MakeMyTrip Integration Active</p>
                      </div>
                      <button onClick={() => window.open('https://www.makemytrip.com', '_blank')} className="px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-black text-[10px] uppercase tracking-widest border border-red-100 hover:bg-red-600 hover:text-white transition-all flex items-center gap-2">
                        Open MMT Portal <ExternalLink size={12} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                      {/* Flight Cards */}
                      {itinerary.realTimePricing.flights && itinerary.realTimePricing.flights.length > 0 ? (
                        itinerary.realTimePricing.flights.map((flight, i) => (
                          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-200 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                              <div className="bg-red-50 p-3 rounded-2xl text-red-600"><Plane size={20} className="rotate-45" /></div>
                              <span className="bg-gray-100 text-gray-500 text-[9px] font-black uppercase px-2 py-1 rounded-md tracking-wider">Flight Option {i+1}</span>
                            </div>
                            <h5 className="text-lg font-black text-[#1B211A] mb-1">{flight.service}</h5>
                            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-6">Price Est: {flight.price}</p>
                            <button 
                              onClick={() => window.open(flight.sourceUrl || 'https://www.makemytrip.com/flights/', '_blank')}
                              className="w-full py-3 bg-[#1B211A] text-white rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-red-600 transition-colors"
                            >
                              Book on MakeMyTrip <ChevronRight size={14} />
                            </button>
                          </div>
                        ))
                      ) : (
                         <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center space-y-3 flex flex-col items-center justify-center min-h-[200px]">
                           <Plane size={32} className="text-gray-300" />
                           <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">No direct flight data available</p>
                           <a href={`https://www.makemytrip.com/flight/search?itinerary=${origin.city}-${destination.city}`} target="_blank" rel="noreferrer" className="text-red-600 font-black text-xs uppercase tracking-wider hover:underline">Search Flights Manually</a>
                         </div>
                      )}

                      {/* Train Cards */}
                      {itinerary.realTimePricing.trains && itinerary.realTimePricing.trains.length > 0 ? (
                        itinerary.realTimePricing.trains.map((train, i) => (
                          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-200 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                              <div className="bg-red-50 p-3 rounded-2xl text-red-600"><Train size={20} /></div>
                              <span className="bg-gray-100 text-gray-500 text-[9px] font-black uppercase px-2 py-1 rounded-md tracking-wider">Rail Option {i+1}</span>
                            </div>
                            <h5 className="text-lg font-black text-[#1B211A] mb-1">{train.service}</h5>
                            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-6">Price Est: {train.price}</p>
                            <button 
                              onClick={() => window.open(train.sourceUrl || 'https://www.makemytrip.com/railways/', '_blank')}
                              className="w-full py-3 bg-[#1B211A] text-white rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-red-600 transition-colors"
                            >
                              Book on MakeMyTrip <ChevronRight size={14} />
                            </button>
                          </div>
                        ))
                      ) : (
                         <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center space-y-3 flex flex-col items-center justify-center min-h-[200px]">
                           <Train size={32} className="text-gray-300" />
                           <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">No direct rail data available</p>
                           <a href="https://www.makemytrip.com/railways/" target="_blank" rel="noreferrer" className="text-red-600 font-black text-xs uppercase tracking-wider hover:underline">Search Trains Manually</a>
                         </div>
                      )}
                    </div>
                  </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="card p-10 space-y-8 border-t-8 border-blue-500 shadow-2xl">
                          <h4 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-4"><Car size={28} className="text-blue-500" /> Transit Intelligence</h4>
                          <p className="text-[15px] font-bold text-gray-600 leading-relaxed italic border-l-4 border-blue-100 pl-6">"{itinerary.transportationAdvice.overall}"</p>
                          <div className="space-y-4">
                            {itinerary.transportationAdvice.bestMeans.map((m, i) => (
                                <div key={i} className="p-5 rounded-3xl bg-blue-50/50 border border-blue-100 flex justify-between items-center hover:bg-white hover:shadow-xl transition-all border-dashed">
                                  <div className="space-y-1">
                                      <div className="text-[10px] font-black uppercase tracking-widest text-blue-600">{m.type}</div>
                                      <div className="font-black text-gray-800 text-sm">{m.description}</div>
                                  </div>
                                  <span className="font-black text-blue-900 text-[13px] bg-white px-3 py-1 rounded-lg border border-blue-200">{m.costEstimate}</span>
                                </div>
                            ))}
                          </div>
                      </div>
                      <div className="card p-10 space-y-8 border-t-8 border-purple-500 shadow-2xl">
                          <h4 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-4"><Ticket size={28} className="text-purple-500" /> Administrative Hub</h4>
                          <div className="bg-purple-50/50 p-7 rounded-3xl border border-purple-100 space-y-4 shadow-sm border-dashed">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-purple-600">Immigration Protocol</h5>
                            <p className="text-[15px] font-black text-purple-900 leading-tight">{itinerary.visaInfo.requirement}</p>
                            <div className="flex gap-8 pt-4 border-t border-purple-200">
                                <div><p className="text-[9px] uppercase font-black opacity-40 tracking-widest">Fees</p><p className="font-black text-[13px]">{itinerary.visaInfo.cost}</p></div>
                                <div><p className="text-[9px] uppercase font-black opacity-40 tracking-widest">Process</p><p className="font-black text-[13px]">{itinerary.visaInfo.processingTime}</p></div>
                            </div>
                          </div>
                          <div className="bg-slate-50 p-7 rounded-3xl border border-slate-100 space-y-4 shadow-inner">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Connectivity Protocol</h5>
                            <p className="text-[15px] font-black text-slate-800">{itinerary.connectivity.wifiRating}</p>
                            <div className="flex flex-wrap gap-2">
                                {itinerary.connectivity.simOptions.map((s, i) => <span key={i} className="bg-white border border-gray-200 px-3 py-1.5 rounded-xl text-[10px] font-black text-gray-500 uppercase tracking-wider">{s}</span>)}
                            </div>
                          </div>
                      </div>
                   </div>
                </div>
             )}

             {activeTab === 'guide' && (
                <div className="space-y-8 animate-fade-in">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="card p-10 space-y-10 border-t-8 border-[#628141] shadow-2xl">
                         <h4 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-4"><Sparkles size={28} className="text-[#628141]" /> Expert Knowledge</h4>
                         <div className="space-y-8">
                            <div className="space-y-4">
                               <h5 className="text-[10px] font-black uppercase tracking-widest text-[#628141] flex items-center gap-2">Elite Hidden Gems <Plus size={10} /></h5>
                               <div className="grid gap-3">
                                  {itinerary.insiderKnowledge.secretSpots.map((s, i) => <div key={i} className="bg-[#628141]/5 p-5 rounded-3xl border border-[#628141]/10 text-sm font-bold text-gray-700 flex items-center gap-4 hover:bg-white hover:shadow-md transition-all"><Sparkles size={16} className="text-[#628141] shrink-0" /> {s}</div>)}
                               </div>
                            </div>
                            <div className="space-y-4">
                               <h5 className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-2">Tourist Trap Avoidance <X size={10} /></h5>
                               <div className="grid gap-3">
                                  {itinerary.insiderKnowledge.touristTraps.map((s, i) => <div key={i} className="bg-red-50 p-5 rounded-3xl border border-red-100 text-sm font-bold text-red-900 flex items-center gap-4 hover:bg-white hover:shadow-md transition-all"><AlertTriangle size={16} className="text-red-600 shrink-0" /> {s}</div>)}
                               </div>
                            </div>
                         </div>
                      </div>
                      <div className="space-y-8">
                         <div className="card p-10 space-y-8 shadow-xl">
                            <h4 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-4 text-[#1B211A]"><Utensils size={28} /> Dietary Survival</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               {itinerary.dietaryAdvice.translator.map((t, i) => (
                                  <div key={i} className="bg-gray-50 p-5 rounded-3xl border border-gray-100 flex flex-col justify-center group hover:bg-[#628141]/5 transition-all">
                                     <div className="text-[9px] font-black uppercase text-gray-400 mb-1 group-hover:text-[#628141]">{t.phrase}</div>
                                     <div className="text-[16px] font-black text-[#628141] italic tracking-tight leading-tight">{t.translation}</div>
                                  </div>
                               ))}
                            </div>
                            {itinerary.dietaryAdvice.safeStreetFoodProtocols && (
                              <div className="bg-green-50/40 p-6 rounded-[2rem] border border-green-100 space-y-3 shadow-inner">
                                <h5 className="text-[10px] font-black uppercase text-green-700 tracking-widest">Safe Street Dining Protocol</h5>
                                <ul className="text-[12px] font-bold text-green-800 space-y-2 italic">
                                  {itinerary.dietaryAdvice.safeStreetFoodProtocols.map((p, i) => <li key={i} className="flex gap-3"><span>🛡️</span> {p}</li>)}
                                </ul>
                              </div>
                            )}
                         </div>
                         <div className="card p-10 bg-[#628141] text-white space-y-6 shadow-2xl relative overflow-hidden border border-white/5">
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[60px] -mr-16 -mb-16" />
                            <h4 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-4"><BellRing size={28} /> Social Conduct</h4>
                            <div className="space-y-6 relative z-10">
                               <div><div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-3">Expedition Do's</div><div className="flex flex-wrap gap-2">{itinerary.etiquette.dos.map((d, i) => <span key={i} className="text-[11px] font-black bg-white/10 px-4 py-2 rounded-full border border-white/20 shadow-inner">✅ {d}</span>)}</div></div>
                               <div><div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-3">Expedition Dont's</div><div className="flex flex-wrap gap-2">{itinerary.etiquette.donts.map((d, i) => <span key={i} className="text-[11px] font-black bg-white/10 px-4 py-2 rounded-full border border-white/20 shadow-inner">❌ {d}</span>)}</div></div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             )}
          </div>
          
          {itinerary.groundingSources && itinerary.groundingSources.length > 0 && (
             <div className="mt-12 p-8 bg-white/50 backdrop-blur-3xl rounded-[3rem] border border-white/30 no-print shadow-xl">
                <h4 className="text-[10px] font-black uppercase text-gray-400 mb-8 tracking-[0.6em] text-center">Intelligence Grounding Matrix</h4>
                <div className="flex flex-wrap justify-center gap-4">
                   {itinerary.groundingSources.map((s, i) => (
                      <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[10px] font-black text-[#628141] bg-white px-6 py-3 rounded-full border border-gray-100 hover:shadow-2xl hover:scale-110 transition-all uppercase tracking-widest shadow-md">
                         <Globe size={14} /> {s.title.substring(0, 30)}...
                      </a>
                   ))}
                </div>
             </div>
          )}
        </div>
      )}

      {/* Persistent Access Information FAB */}
      {itinerary && (
        <button onClick={() => setActiveTab('guide')} className="fixed bottom-10 right-10 z-50 bg-[#1B211A] text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all no-print flex items-center gap-3 border-2 border-white/10 group shadow-[#1B211A]/40">
          <InfoIcon size={28} className="group-hover:rotate-12 transition-transform" />
          <span className="font-black text-[13px] pr-2 tracking-[0.2em] uppercase">Guide</span>
        </button>
      )}

      <footer className="mt-24 pb-12 text-center no-print">
         <div className="flex justify-center flex-wrap gap-12 mb-10 grayscale opacity-40 brightness-200">
            <span className="font-black italic text-2xl tracking-tighter drop-shadow-md">SKYSCANNER</span>
            <span className="font-black italic text-2xl tracking-tighter drop-shadow-md">MAKEMYTRIP</span>
            <span className="font-black italic text-2xl tracking-tighter drop-shadow-md">BOOKING.COM</span>
         </div>
         <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.8em] mb-4">Voyager Elite Travel Systems — Global Intelligence v5.1.2</p>
         <div className="h-px w-64 bg-white/10 mx-auto" />
      </footer>
    </div>
  );
};

export default App;