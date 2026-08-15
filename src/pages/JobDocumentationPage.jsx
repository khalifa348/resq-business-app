import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  User,
  Camera,
  Image,
  CheckCircle,
  ClipboardList,
  Truck,
  DollarSign,
  MessageCircle,
} from 'lucide-react';

export default function JobDocumentationPage() {
  const navigate = useNavigate();
  const [photoTaken, setPhotoTaken] = useState(false);
  const [finishing, setFinishing] = useState(false);

  const handleTakePhoto = () => {
    setPhotoTaken(true);
  };

  const handleFinishJob = () => {
    setFinishing(true);
    setTimeout(() => {
      setFinishing(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="iphone-screen overflow-y-auto" style={{ backgroundColor: '#121413' }}>
      {/* Top App Bar */}
      <header className="w-full top-0 sticky z-40 flex justify-between items-center px-4 py-3 bg-[#121413] safe-area-top">
        <div className="flex items-center gap-4">
          <button className="text-[#D0FA58] active:scale-95 transition-transform hover:opacity-80">
            <Menu size={24} />
          </button>
        </div>
        <button className="text-[#D0FA58] active:scale-95 transition-transform hover:opacity-80">
          <User size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-4 pt-1 pb-32 max-w-lg mx-auto w-full">
        {/* Header Section */}
        <section className="mb-10">
          <h2 className="text-[28px] leading-[36px] font-bold text-[#E3E2E0] mb-2">
            Job Documentation
          </h2>
          <p className="text-[#C5C9B0] text-[15px] leading-[22px] opacity-80">
            Please upload a photo of the completed repair or vehicle handover.
          </p>
        </section>

        {/* Photo Preview Area */}
        <section className="relative group mb-6">
          <div
            className={`w-full aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${
              photoTaken
                ? 'border-[#B5DD3D] bg-[#2A2A28]'
                : 'border-[#444936] bg-[#2A2A28] hover:border-[#D0FA58]'
            }`}
          >
            {!photoTaken ? (
              <div className="flex flex-col items-center text-[#C5C9B0] group-hover:text-[#D0FA58] transition-colors">
                <Camera size={64} className="mb-6 opacity-60" />
                <span className="font-mono text-[12px] tracking-[0.05em] font-medium text-[#C5C9B0]/40">
                  PREVIEW AREA
                </span>
              </div>
            ) : (
              <div className="w-full h-full">
                <img
                  className="w-full h-full object-cover"
                  alt="Completed repair or vehicle handover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWo0Sl4wq-g6gICkzSHqsGZ0fBSsCQnarp6TwOYZbPvXjK7OWDRx9U9dEel2xwFpNVmtEDJiDyWG1L6-yuuDYgksRjAnyWA529Gx1ZyCI5uXOEOQbm5iGcB3ChlbCQ5L_-V7ItHnI3maQZXEiRHkAjP_VmCrMOM36t2r4EwmlMsqUfXREIyWUTjTugDB1jwHb9ivSpqbHyFmHPZpfZMuYY8Bm5BaaEnOOuLmpIJQEA9hNa4kR3Q-rDYIAUZwTDUo8c4yYidub9VBc"
                />
              </div>
            )}
          </div>
        </section>

        {/* Action Buttons */}
        <section className="space-y-3">
          <button
            onClick={handleTakePhoto}
            className="w-full py-5 rounded-xl bg-[#B5DD3D] text-[#4A5F00] font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-lg shadow-[#B5DD3D]/10 hover:brightness-105"
          >
            <Camera size={20} />
            <span className="font-mono text-[14px] tracking-[0.05em] font-medium">
              TAKE PHOTO
            </span>
          </button>
          <button className="w-full py-5 rounded-xl border border-[#D0FA58] text-[#D0FA58] font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-transform hover:bg-[#D0FA58]/5">
            <Image size={20} />
            <span className="font-mono text-[14px] tracking-[0.05em] font-medium">
              UPLOAD FROM GALLERY
            </span>
          </button>
        </section>

        {/* Metadata / Info */}
        <section className="mt-10 grid grid-cols-2 gap-3">
          <div className="bg-[#2A2A28] p-5 rounded-xl border border-[#444936]/20">
            <p className="text-[#C5C9B0] font-mono text-[12px] tracking-[0.05em] font-medium mb-1 uppercase">
              Job ID
            </p>
            <p className="font-mono text-[14px] tracking-[0.05em] font-medium text-[#E3E2E0]">
              #RF-99201
            </p>
          </div>
          <div className="bg-[#2A2A28] p-5 rounded-xl border border-[#444936]/20">
            <p className="text-[#C5C9B0] font-mono text-[12px] tracking-[0.05em] font-medium mb-1 uppercase">
              Location
            </p>
            <p className="font-mono text-[14px] tracking-[0.05em] font-medium text-[#E3E2E0]">
              Austin, TX
            </p>
          </div>
        </section>

        {/* Final Finish Action */}
        <section className="mt-10">
          <button
            onClick={handleFinishJob}
            disabled={finishing}
            className={`w-full py-5 rounded-full font-extrabold text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
              finishing
                ? 'bg-[#B5DD3D]/70 text-[#4A5F00]/70 cursor-not-allowed'
                : 'bg-[#B5DD3D] text-[#4A5F00] active:scale-[0.98] shadow-[#B5DD3D]/10 hover:brightness-105'
            }`}
          >
            {finishing ? (
              <span className="font-mono text-[14px] tracking-[0.05em] font-medium">
                FINISHING...
              </span>
            ) : (
              <>
                <span className="font-mono text-[14px] tracking-[0.05em] font-medium">
                  FINISH JOB
                </span>
                <CheckCircle size={22} />
              </>
            )}
          </button>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-[#121413] border-t border-[#444936] safe-area-bottom">
        <button className="flex flex-col items-center justify-center bg-[#B5DD3D] text-[#283500] rounded-xl px-4 py-1 active:scale-95 transition-transform">
          <ClipboardList size={22} />
          <span className="font-mono text-[10px] mt-0.5">Jobs</span>
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex flex-col items-center justify-center text-[#C5C9B0] hover:bg-[#343534] transition-colors px-4 py-1 rounded-xl active:scale-95"
        >
          <Truck size={22} />
          <span className="font-mono text-[10px] mt-0.5">Navigation</span>
        </button>
        <button
          onClick={() => navigate('/earnings')}
          className="flex flex-col items-center justify-center text-[#C5C9B0] hover:bg-[#343534] transition-colors px-4 py-1 rounded-xl active:scale-95"
        >
          <DollarSign size={22} />
          <span className="font-mono text-[10px] mt-0.5">Earnings</span>
        </button>
        <button
          onClick={() => navigate('/message')}
          className="flex flex-col items-center justify-center text-[#C5C9B0] hover:bg-[#343534] transition-colors px-4 py-1 rounded-xl active:scale-95"
        >
          <MessageCircle size={22} />
          <span className="font-mono text-[10px] mt-0.5">Messages</span>
        </button>
      </nav>
    </div>
  );
}
