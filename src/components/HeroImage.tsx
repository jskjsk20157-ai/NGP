import { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function HeroImage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function generateImage() {
      try {
        setError(null);
        // Check if API key is selected for gemini-3.1-flash-image-preview
        if (typeof window !== 'undefined' && window.aistudio) {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          if (!hasKey) {
            setLoading(false);
            return; // Don't try to generate if no key
          }
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY || '' });
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-image-preview',
          contents: {
            parts: [
              {
                text: 'A modern, clean, professional illustration of young pediatricians (male and female doctors) collaborating in a bright, futuristic medical environment. Minimalist style, soft colors, teal and blue accents. High quality, 4K.',
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9",
              imageSize: "1K"
            },
          },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (err: any) {
        console.error("Failed to generate image:", err);
        if (err.message?.includes('403') || err.message?.includes('permission')) {
          setError('PERMISSION_DENIED');
        }
      } finally {
        setLoading(false);
      }
    }

    generateImage();
  }, []);

  if (loading) {
    return (
      <div className="w-full aspect-video bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center">
        <p className="text-slate-400 font-medium">이미지 생성 중...</p>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="w-full aspect-video bg-slate-100 rounded-2xl flex flex-col items-center justify-center p-6 text-center">
        <img 
          src="https://picsum.photos/seed/pediatrics/1200/675" 
          alt="Pediatricians Collaboration" 
          className="w-full h-full object-cover rounded-2xl absolute inset-0 opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10">
          <p className="text-slate-600 font-medium mb-4">
            {error === 'PERMISSION_DENIED' 
              ? 'API 키 권한이 없거나 결제 설정이 필요합니다.' 
              : 'AI 이미지 생성을 위해 API 키 선택이 필요합니다.'}
          </p>
          <button 
            onClick={async () => {
              if (window.aistudio) {
                await window.aistudio.openSelectKey();
                window.location.reload(); // Reload to try again
              }
            }}
            className="px-6 py-2 bg-ngp-blue text-white rounded-xl font-bold hover:bg-opacity-90 transition-all active:scale-95 shadow-lg"
          >
            {error === 'PERMISSION_DENIED' ? '다른 API 키 선택하기' : 'API 키 선택하기'}
          </button>
          <p className="text-xs text-slate-400 mt-4">
            * 유료 프로젝트의 API 키가 필요합니다. <br />
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline">결제 문서 확인</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
      <img 
        src={imageUrl} 
        alt="NGP Hero Illustration" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
