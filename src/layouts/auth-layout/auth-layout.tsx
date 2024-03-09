import { useRef } from 'react';
import { Icon } from '@/components/shared/icon';
import { Link, Outlet } from 'react-router-dom';
import { BackgroundCircles } from './background-circles';

export function AuthLayout() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-svh">
      <div className="relative w-[60%] h-full" ref={parallaxRef}>
        <BackgroundCircles parallaxRef={parallaxRef} />
        <Link to="/" className="absolute top-0 left-0 px-4 py-5 z-10">
          <Icon name="logo" className="w-8 h-8 text-slate-50" />
        </Link>
        <img
          src="/assets/metaverse.jpg"
          alt="metaverse"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-center px-4">
        <div className="w-full lg:w-8/12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
