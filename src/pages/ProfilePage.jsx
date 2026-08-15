import { useState, useEffect, useRef } from 'react';
import defaultLogo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  Map,
  DollarSign,
  User,
  ArrowLeft,
  Settings,
  Camera,
  LogOut,
  Building2,
  Mail,
  Shield,
  Info,
  Save,
  X,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const APP_VERSION = '1.0.0';

const STORAGE_KEY = 'resq_company_profile';

const DEFAULTS = {
  companyName: 'Emirates Auction',
  companyLogo: defaultLogo,
  driverName: 'Demo User',
  email: 'demo@email.com',
  phone: '(512) 555-0199',
};

function loadProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge saved data with defaults so empty fields fall back to defaults
      return { ...DEFAULTS, ...parsed, companyLogo: parsed.companyLogo || defaultLogo };
    }
  } catch {}
  return { ...DEFAULTS };
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState(loadProfile);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result;
      if (typeof dataUrl === 'string') {
        if (editing) {
          setEditForm((prev) => ({ ...prev, companyLogo: dataUrl }));
        } else {
          setProfile((prev) => ({ ...prev, companyLogo: dataUrl }));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerLogoUpload = () => {
    fileInputRef.current?.click();
  };

  const removeLogo = () => {
    if (editing) {
      setEditForm((prev) => ({ ...prev, companyLogo: '' }));
    } else {
      setProfile((prev) => ({ ...prev, companyLogo: '' }));
    }
  };

  const handleEditStart = () => {
    setEditForm({ ...profile });
    setEditing(true);
    setSaved(false);
  };

  const handleEditCancel = () => {
    setEditing(false);
    setEditForm({ ...profile });
  };

  const handleEditSave = () => {
    setSaving(true);
    setTimeout(() => {
      setProfile({ ...editForm });
      setEditing(false);
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  };

  const handleLogout = async () => {
    await logOut();
    navigate('/signin');
  };

  const current = editing ? editForm : profile;

  return (
    <div className="iphone-screen overflow-y-auto" style={{ backgroundColor: '#121413' }}>
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#121413] h-16 flex justify-between items-center px-6 border-b border-[#444936] safe-area-top">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-[#292A29] flex items-center justify-center hover:bg-[#343534] transition-colors"
          >
            <ArrowLeft size={20} className="text-[#E3E2E0]" />
          </button>
          <span className="text-[#C5C9B0] opacity-50 mx-1">/</span>
          <span className="text-[#E3E2E0] font-mono uppercase tracking-widest text-sm">Profile</span>
        </div>
        <div className="flex items-center gap-4">
          {!editing ? (
            <button
              onClick={handleEditStart}
              className="w-10 h-10 rounded-full bg-[#292A29] flex items-center justify-center hover:bg-[#343534] transition-colors"
            >
              <Settings size={18} className="text-[#D0FA58]" />
            </button>
          ) : (
            <button
              onClick={handleEditCancel}
              className="w-10 h-10 rounded-full bg-[#292A29] flex items-center justify-center hover:bg-[#343534] transition-colors"
            >
              <X size={18} className="text-[#C5C9B0]" />
            </button>
          )}
        </div>
      </header>

      {/* Saved Notification */}
      {saved && (
        <div className="fixed top-20 left-4 right-4 z-50 animate-slideUp">
          <div className="bg-[#B5DD3D]/10 border border-[#B5DD3D]/30 rounded-xl px-4 py-3 flex items-center gap-3 backdrop-blur-sm">
            <CheckCircle size={18} className="text-[#D0FA58]" />
            <span className="font-mono text-sm text-[#D0FA58]">Profile saved successfully!</span>
          </div>
        </div>
      )}

      <main className="mt-20 px-4 pb-32 space-y-6 overflow-y-auto flex-1">
        {/* Company Logo / Avatar Section */}
        <section className="flex flex-col items-center">
          <div className="relative group">
            <div
              className={`w-28 h-28 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer ${
                current.companyLogo
                  ? 'border-[#B5DD3D] bg-[#2A2A28]'
                  : 'border-[#444936] bg-[#2A2A28] hover:border-[#D0FA58]'
              }`}
              onClick={triggerLogoUpload}
            >
              {current.companyLogo ? (
                <img
                  src={current.companyLogo}
                  alt="Company Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-[#C5C9B0] group-hover:text-[#D0FA58] transition-colors">
                  <Building2 size={36} />
                  <span className="font-mono text-[10px] mt-1">LOGO</span>
                </div>
              )}
            </div>

            {/* Overlay controls */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              <button
                onClick={triggerLogoUpload}
                className="w-9 h-9 rounded-full bg-[#B5DD3D] text-[#283500] flex items-center justify-center shadow-lg hover:brightness-110 active:scale-90 transition-all"
              >
                <Camera size={16} />
              </button>
              {current.companyLogo && (
                <button
                  onClick={removeLogo}
                  className="w-9 h-9 rounded-full bg-[#93000A]/20 text-[#FFB4AB] flex items-center justify-center shadow-lg hover:bg-[#93000A]/40 active:scale-90 transition-all"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />
          </div>
          <p className="font-mono text-[10px] text-[#C5C9B0]/40 mt-4">
            Tap the logo area or camera icon to upload
          </p>
        </section>

        {/* Profile Details Card */}
        <section className="bg-[#2A2A28]/80 backdrop-blur-md border border-[#353533] rounded-xl overflow-hidden">
          <div className="p-5 border-b border-[#444936]/20">
            <p className="font-mono text-[10px] text-[#C5C9B0]/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Building2 size={12} className="text-[#D0FA58]" />
              Company Name
            </p>
            {editing ? (
              <input
                type="text"
                value={editForm.companyName}
                onChange={(e) => setEditForm((prev) => ({ ...prev, companyName: e.target.value }))}
                className="w-full bg-[#1F1F1E] border border-[#444936] rounded-lg px-3 py-2 text-[#E3E2E0] font-bold text-base font-mono focus:outline-none focus:border-[#B5DD3D] transition-colors"
                placeholder="Your company name"
              />
            ) : (
              <p className="text-[#E3E2E0] font-bold text-base">{current.companyName}</p>
            )}
          </div>

          <div className="p-5 border-b border-[#444936]/20">
            <p className="font-mono text-[10px] text-[#C5C9B0]/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <User size={12} className="text-[#D0FA58]" />
              Driver Name
            </p>
            {editing ? (
              <input
                type="text"
                value={editForm.driverName}
                onChange={(e) => setEditForm((prev) => ({ ...prev, driverName: e.target.value }))}
                className="w-full bg-[#1F1F1E] border border-[#444936] rounded-lg px-3 py-2 text-[#E3E2E0] font-bold text-base font-mono focus:outline-none focus:border-[#B5DD3D] transition-colors"
                placeholder="Your name"
              />
            ) : (
              <p className="text-[#E3E2E0] font-bold text-base">{current.driverName}</p>
            )}
          </div>

          <div className="p-5 border-b border-[#444936]/20">
            <p className="font-mono text-[10px] text-[#C5C9B0]/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Mail size={12} className="text-[#D0FA58]" />
              Email
            </p>
            {editing ? (
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full bg-[#1F1F1E] border border-[#444936] rounded-lg px-3 py-2 text-[#E3E2E0] font-bold text-base font-mono focus:outline-none focus:border-[#B5DD3D] transition-colors"
                placeholder="email@example.com"
              />
            ) : (
              <p className="text-[#C5C9B0] text-sm font-mono">{current.email}</p>
            )}
          </div>

          <div className="p-5">
            <p className="font-mono text-[10px] text-[#C5C9B0]/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Info size={12} className="text-[#D0FA58]" />
              Phone
            </p>
            {editing ? (
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-[#1F1F1E] border border-[#444936] rounded-lg px-3 py-2 text-[#E3E2E0] font-bold text-base font-mono focus:outline-none focus:border-[#B5DD3D] transition-colors"
                placeholder="(555) 000-0000"
              />
            ) : (
              <p className="text-[#C5C9B0] text-sm font-mono">{current.phone}</p>
            )}
          </div>
        </section>

        {/* Save / Edit Actions */}
        {editing && (
          <button
            onClick={handleEditSave}
            disabled={saving}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
              saving
                ? 'bg-[#B5DD3D]/50 text-[#283500]/50 cursor-not-allowed'
                : 'bg-[#B5DD3D] text-[#283500] active:scale-[0.98] shadow-[#B5DD3D]/20 hover:brightness-105'
            }`}
          >
            <Save size={20} />
            <span className="font-mono text-[14px] tracking-[0.05em]">
              {saving ? 'SAVING...' : 'SAVE PROFILE'}
            </span>
          </button>
        )}

        {/* App Info */}
        <section className="bg-[#2A2A28]/60 border border-[#353533] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-[#D0FA58]" />
              <span className="font-mono text-xs text-[#C5C9B0] uppercase tracking-wider">App Info</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[12px] text-[#C5C9B0]/60">Version</span>
              <span className="font-mono text-[12px] text-[#D0FA58]">v{APP_VERSION}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[12px] text-[#C5C9B0]/60">App</span>
              <span className="font-mono text-[12px] text-[#C5C9B0]">RescueFlow</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[12px] text-[#C5C9B0]/60">Company Key</span>
              <span className="font-mono text-[12px] text-[#C5C9B0]">RF-TOW-001</span>
            </div>
          </div>
        </section>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-4 rounded-xl border border-[#93000A]/40 text-[#FFB4AB] font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-[#93000A]/10"
        >
          <LogOut size={20} />
          <span className="font-mono text-[14px] tracking-[0.05em]">SIGN OUT</span>
        </button>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-[#121413] border-t border-[#444936] safe-area-bottom">
        <button
          onClick={() => navigate('/jobs')}
          className="flex flex-col items-center justify-center text-[#C5C9B0] hover:bg-[#343534] transition-colors px-4 py-1 rounded-xl active:scale-95"
        >
          <ClipboardList size={22} />
          <span className="font-mono text-[10px] mt-0.5">Jobs</span>
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex flex-col items-center justify-center text-[#C5C9B0] hover:bg-[#343534] transition-colors px-4 py-1 rounded-xl active:scale-95"
        >
          <Map size={22} />
          <span className="font-mono text-[10px] mt-0.5">Map</span>
        </button>
        <button
          onClick={() => navigate('/earnings')}
          className="flex flex-col items-center justify-center text-[#C5C9B0] hover:bg-[#343534] transition-colors px-4 py-1 rounded-xl active:scale-95"
        >
          <DollarSign size={22} />
          <span className="font-mono text-[10px] mt-0.5">Earnings</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-[#B5DD3D] text-[#283500] rounded-xl px-4 py-1 active:scale-95 transition-transform">
          <User size={22} />
          <span className="font-mono text-[10px] mt-0.5">Profile</span>
        </button>
      </nav>
    </div>
  );
}
