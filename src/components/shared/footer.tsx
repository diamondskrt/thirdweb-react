import {
  DiscordLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grid flex-center gap-2 p-4">
      <div className="flex justify-center gap-2">
        <InstagramLogoIcon className="w-5 h-5" />
        <TwitterLogoIcon className="w-5 h-5" />
        <DiscordLogoIcon className="w-5 h-5" />
      </div>
      <div>{year}. All right reserved.</div>
    </footer>
  );
}
