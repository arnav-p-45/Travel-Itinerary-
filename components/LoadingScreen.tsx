
import React, { useState, useEffect } from 'react';

const steps = [
  "Consulting world travel databases...",
  "Scanning real-time flight availability...",
  "Analyzing premium hotel partnerships...",
  "Curating high-end culinary experiences...",
  "Mapping cultural heritage landmarks...",
  "Preparing your professional itinerary..."
];

const floatingIcons = ["✈️", "🏨", "🚆", "🛂", "📸", "🍛", "🏝️", "🏙️"];

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        const increment = prev < 80 ? 1.5 : 0.3;
        return Math.min(prev + increment, 99);
      });
    }, 100);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/95 backdrop-blur-3xl animate-fade-in overflow-hidden">
      {/* Floating Animated Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((icon, i) => (
          <div 
            key={i}
            className="absolute text-4xl opacity-10 animate-pulse"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 360}deg)`
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      <div className="relative mb-12">
        <div className="w-48 h-48 rounded-full border-8 border-[#628141]/10 flex items-center justify-center relative shadow-2xl">
          <div 
            className="absolute inset-0 rounded-full border-8 border-t-[#628141] animate-spin"
            style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: 'transparent', animationDuration: '1.5s' }}
          />
          <span className="text-8xl animate-bounce">🌍</span>
        </div>
      </div>
      
      <div className="text-center space-y-6 max-w-sm px-6 relative z-10">
        <h2 className="text-3xl font-black text-[#1B211A] tracking-tighter uppercase italic">Curating <span className="text-[#628141]">Elite Plan</span></h2>
        
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-[#628141] to-[#8BAE66] transition-all duration-300 ease-out shadow-[0_0_20px_rgba(98,129,65,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="h-12 flex items-center justify-center">
          <p className="text-[#628141] font-black text-lg animate-fade-in text-center px-4 italic" key={currentStep}>
            {steps[currentStep]}
          </p>
        </div>
        
        <div className="pt-4 text-[10px] font-black text-gray-400 tracking-[0.5em] uppercase">
          Optimizing Journey: {Math.floor(progress)}%
        </div>
      </div>
    </div>
  );
};
