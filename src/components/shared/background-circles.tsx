import { useEffect, useState } from 'react';

import { MouseParallax } from 'react-just-parallax';

type BackgroundCirclesProps = {
  parallaxRef: React.RefObject<HTMLDivElement>;
};

export const BackgroundCircles = ({ parallaxRef }: BackgroundCirclesProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <MouseParallax
        strength={0.07}
        parallaxContainerRef={parallaxRef}
        zIndex={1}
      >
        <div className="absolute top-10 left-[40%]">
          <div
            className={`w-3 h-3 bg-gradient-radial from-[#e6fa61] to-[#525705] rounded-full transition-transform duration-1000 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className="absolute top-20 left-8">
          <div
            className={`w-4 h-4 bg-gradient-radial from-[#d24b4b] to-[#3b0404] rounded-full transition-transform duration-1000 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className="absolute top-1/4 left-3/4">
          <div
            className={`w-4 h-4 bg-gradient-radial from-[#DD734F] to-[#311c03] rounded-full transition-transform duration-1000 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className="absolute top-1/2 left-1/4">
          <div
            className={`w-6 h-6 bg-gradient-radial from-[#3fb349] to-[#033119] rounded-full transition-transform duration-1000 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className="absolute bottom-1/4 left-2/4">
          <div
            className={`w-4 h-4 bg-gradient-radial from-[#2e2e58] to-[#06154d] rounded-full transition-transform duration-1000 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className="absolute bottom-20 right-20">
          <div
            className={`w-3 h-3 bg-gradient-radial from-[#348e88] to-[#05494d] rounded-full transition-transform duration-1000 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className="absolute bottom-12 left-20">
          <div
            className={`w-3 h-3 bg-gradient-radial from-[#bb45b2] to-[#230212] rounded-full transition-transform duration-1000 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>
      </MouseParallax>
    </div>
  );
};
