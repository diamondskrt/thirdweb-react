import { useRef } from 'react';

import { Outlet } from 'react-router-dom';

import { BackgroundCircles } from '../components/shared/background-circles';

export function AuthLayout() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col md:flex-row h-svh">
      <div className="relative w-full md:w-[60%] h-full" ref={parallaxRef}>
        <BackgroundCircles parallaxRef={parallaxRef} />
        <img
          src="/assets/images/metaverse.jpg"
          alt="metaverse"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-center p-4">
        <div className="w-full lg:w-8/12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
