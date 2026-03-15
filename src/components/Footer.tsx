export default function Footer() {
  return (
    <footer className="py-12 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center">
            <div className="w-20 h-20 flex items-center justify-center shrink-0">
              <img 
                src="/logo2.png" 
                alt="NGP Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-10 h-10 bg-ngp-blue rounded-lg flex items-center justify-center"><span class="text-white font-black text-sm">N</span></div>';
                }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="text-slate-400 text-sm text-center md:text-right">
            <p>© 2026 Next Generation Pediatricians. All rights reserved.</p>
            <p className="mt-1">소아청소년과의 밝은 미래를 위해 함께합니다.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
