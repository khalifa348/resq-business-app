import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Image, CheckCircle, Check, Loader2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import BottomNav from '../components/BottomNav';

export default function JobDocumentationPage() {
  const navigate = useNavigate();
  const [photoTaken, setPhotoTaken] = useState(false);
  const [finishing, setFinishing] = useState(false);

  const handleFinishJob = () => {
    setFinishing(true);
    setTimeout(() => navigate('/dashboard'), 1600);
  };

  return (
    <div className="iphone-screen overflow-hidden bg-ink flex flex-col">
      <PageHeader title="Job documentation" />

      <main className="flex-1 flex flex-col px-5 pt-24 pb-28 overflow-y-auto no-scrollbar">
        {/* Instruction */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          Add a photo of the completed repair or vehicle handover to close out this job.
        </p>

        {/* Photo area */}
        <button
          onClick={() => setPhotoTaken(true)}
          className={`relative w-full h-44 rounded-3xl flex flex-col items-center justify-center overflow-hidden press transition-colors shrink-0 ${
            photoTaken
              ? 'border border-brand-lime bg-surface-raised'
              : 'border-2 border-dashed border-line-strong bg-surface-raised hover:border-brand-lime'
          }`}
        >
          {!photoTaken ? (
            <div className="flex flex-col items-center gap-3 text-text-muted">
              <div className="w-14 h-14 rounded-2xl bg-surface-elevated border border-line flex items-center justify-center">
                <Camera size={26} />
              </div>
              <span className="text-sm font-medium">Tap to add photo</span>
            </div>
          ) : (
            <>
              <div className="w-full h-full bg-surface-elevated flex items-center justify-center">
                <Camera size={40} className="text-text-muted" />
              </div>
              <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-ok text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                <Check size={14} strokeWidth={3} /> Photo added
              </span>
            </>
          )}
        </button>

        {/* Secondary actions */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={() => setPhotoTaken(true)}
            className="flex items-center justify-center gap-2 bg-surface-raised border border-line rounded-2xl py-3.5 text-text-primary text-sm font-semibold press"
          >
            <Camera size={18} />
            Take photo
          </button>
          <button
            onClick={() => setPhotoTaken(true)}
            className="flex items-center justify-center gap-2 bg-surface-raised border border-line rounded-2xl py-3.5 text-text-primary text-sm font-semibold press"
          >
            <Image size={18} />
            Gallery
          </button>
        </div>

        {/* Job meta */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-surface-raised border border-line rounded-2xl p-4">
            <p className="text-text-muted text-[11px] font-medium uppercase tracking-wide mb-1">Job ID</p>
            <p className="num-led text-sm font-bold text-text-primary">#RF-99201</p>
          </div>
          <div className="bg-surface-raised border border-line rounded-2xl p-4">
            <p className="text-text-muted text-[11px] font-medium uppercase tracking-wide mb-1">Location</p>
            <p className="num-led text-sm font-bold text-text-primary">Austin, TX</p>
          </div>
        </div>

        {/* Finish */}
        <button
          onClick={handleFinishJob}
          disabled={finishing}
          className={`w-full mt-8 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 press ${
            finishing ? 'bg-brand-lime/60 text-text-muted cursor-not-allowed' : 'btn-lime'
          }`}
        >
          {finishing ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Finishing…</span>
            </>
          ) : (
            <>
              <span>Finish job</span>
              <CheckCircle size={20} />
            </>
          )}
        </button>
      </main>

      <BottomNav active="jobs" />
    </div>
  );
}
