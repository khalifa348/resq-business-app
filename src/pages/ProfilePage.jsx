import { useState, useEffect, useRef } from 'react';
import defaultLogo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import {
  User,
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
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/PageHeader';
import BottomNav from '../components/BottomNav';

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
    <div className="iphone-screen page-wipe overflow-y-auto bg-ink">
      <PageHeader
        title="Profile"
        right={
          !editing ? (
            <button
              onClick={handleEditStart}
              aria-label="Edit profile"
              className="w-10 h-10 rounded-xl bg-surface-elevated border border-line flex items-center justify-center text-brand-lime transition-all press hover:bg-surface-bright"
            >
              <Settings size={18} />
            </button>
          ) : (
            <button
              onClick={handleEditCancel}
              aria-label="Cancel edit"
              className="w-10 h-10 rounded-xl bg-surface-elevated border border-line flex items-center justify-center text-text-secondary transition-all press hover:bg-surface-bright"
            >
              <X size={18} />
            </button>
          )
        }
      />

      {/* Saved Notification */}
      {saved && (
        <div className="fixed top-20 left-4 right-4 z-50">
          <div className="glass-surface-strong border border-brand-lime/30 rounded-2xl px-4 py-3 flex items-center gap-3">
            <CheckCircle size={18} className="text-brand-lime" />
            <span className="font-mono text-sm text-brand-lime">Profile saved successfully!</span>
          </div>
        </div>
      )}

      <main className="pt-20 px-4 pb-32 space-y-6 overflow-y-auto flex-1">
        {/* Company Header Card */}
        <section className="bg-surface-raised rounded-3xl shadow-card card-inset border border-line p-6 flex flex-col items-center">
          <div className="relative group">
            <div
              className={`w-24 h-24 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer ${
                current.companyLogo
                  ? 'border-brand-lime bg-surface-elevated'
                  : 'border-line-strong bg-surface-elevated hover:border-brand-lime'
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
                <div className="flex flex-col items-center text-text-secondary">
                  <Building2 size={32} />
                  <span className="text-[11px] font-medium mt-1">Add logo</span>
                </div>
              )}
            </div>

            {/* Overlay controls */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              <button
                onClick={triggerLogoUpload}
                className="w-9 h-9 rounded-full bg-brand-lime text-[#FFFFFF] flex items-center justify-center  hover:brightness-110 press transition-all"
              >
                <Camera size={16} />
              </button>
              {current.companyLogo && (
                <button
                  onClick={removeLogo}
                  className="w-9 h-9 rounded-full bg-danger/20 text-danger flex items-center justify-center shadow-lg hover:bg-danger/40 press transition-all"
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

          <p className="text-text-primary font-bold text-lg mt-5">{current.driverName}</p>
          <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-1">{current.companyName}</p>

          <p className="font-mono text-[10px] text-text-muted mt-4">
            Tap the logo area or camera icon to upload
          </p>
        </section>

        {/* Profile Details Card */}
        <section className="bg-surface-raised rounded-3xl shadow-card card-inset border border-line overflow-hidden divide-y divide-line">
          <div className="p-5">
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Building2 size={12} className="text-brand-lime" />
              Company Name
            </p>
            {editing ? (
              <input
                type="text"
                value={editForm.companyName}
                onChange={(e) => setEditForm((prev) => ({ ...prev, companyName: e.target.value }))}
                className="w-full bg-surface-elevated border border-line rounded-xl px-3 py-2 text-text-primary font-bold text-base font-mono focus:outline-none focus:border-brand-lime transition-colors"
                placeholder="Your company name"
              />
            ) : (
              <p className="text-text-primary font-bold text-base">{current.companyName}</p>
            )}
          </div>

          <div className="p-5">
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <User size={12} className="text-brand-lime" />
              Driver Name
            </p>
            {editing ? (
              <input
                type="text"
                value={editForm.driverName}
                onChange={(e) => setEditForm((prev) => ({ ...prev, driverName: e.target.value }))}
                className="w-full bg-surface-elevated border border-line rounded-xl px-3 py-2 text-text-primary font-bold text-base font-mono focus:outline-none focus:border-brand-lime transition-colors"
                placeholder="Your name"
              />
            ) : (
              <p className="text-text-primary font-bold text-base">{current.driverName}</p>
            )}
          </div>

          <div className="p-5">
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Mail size={12} className="text-brand-lime" />
              Email
            </p>
            {editing ? (
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full bg-surface-elevated border border-line rounded-xl px-3 py-2 text-text-primary font-bold text-base font-mono focus:outline-none focus:border-brand-lime transition-colors"
                placeholder="email@example.com"
              />
            ) : (
              <p className="text-text-secondary text-sm font-mono">{current.email}</p>
            )}
          </div>

          <div className="p-5">
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Info size={12} className="text-brand-lime" />
              Phone
            </p>
            {editing ? (
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-surface-elevated border border-line rounded-xl px-3 py-2 text-text-primary font-bold text-base font-mono focus:outline-none focus:border-brand-lime transition-colors"
                placeholder="(555) 000-0000"
              />
            ) : (
              <p className="text-text-secondary text-sm font-mono">{current.phone}</p>
            )}
          </div>
        </section>

        {/* Save / Edit Actions */}
        {editing && (
          <button
            onClick={handleEditSave}
            disabled={saving}
            className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
              saving
                ? 'bg-brand-lime/50 text-[#FFFFFF]/50 cursor-not-allowed'
                : 'btn-lime press'
            }`}
          >
            <Save size={20} />
            <span className="font-mono text-[14px] tracking-[0.05em]">
              {saving ? 'SAVING...' : 'SAVE PROFILE'}
            </span>
          </button>
        )}

        {/* App Info */}
        <section className="bg-surface-raised/60 border border-line rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-brand-lime" />
              <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">App Info</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[12px] text-text-muted">Version</span>
              <span className="font-mono text-[12px] text-brand-lime">v{APP_VERSION}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[12px] text-text-muted">App</span>
              <span className="font-mono text-[12px] text-text-secondary">RescueFlow</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[12px] text-text-muted">Company Key</span>
              <span className="font-mono text-[12px] text-text-secondary">RF-TOW-001</span>
            </div>
          </div>
        </section>

        {/* Settings Row / Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-surface-raised border border-line rounded-2xl px-5 py-4 flex items-center justify-between text-danger font-bold press transition-all hover:bg-surface-elevated"
        >
          <span className="flex items-center gap-3">
            <LogOut size={20} />
            <span className="text-[15px] font-semibold">Sign out</span>
          </span>
          <ChevronRight size={18} className="text-danger/60" />
        </button>
      </main>

      <BottomNav active="profile" />
    </div>
  );
}
