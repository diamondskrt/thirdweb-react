import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { ThemeSwitcher } from '@/components/shared/theme-switcher';
import { useUserContext } from '@/providers/auth-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, FileCode, Settings } from 'lucide-react';
import { useSignOutAccount } from '@/api/queries';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function Navbar() {
  const { user, isPending } = useUserContext();
  const navigate = useNavigate();

  const { mutate: onSignOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (!isSuccess) return;

    navigate('sign-in');
  }, [isSuccess, navigate]);

  return (
    <header className="flex items-center justify-between shadow-md p-4">
      <Link to="/">
        <Icon name="logo" className="w-8 h-8 black dark:white" />
      </Link>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        {isPending ? (
          <Button variant="outline">Loading...</Button>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.imageUrl} alt="user" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-body">{user.userName}</div>
                    <small>{user.email}</small>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <FileCode className="mr-2 h-4 w-4" />
                  <span>My Contracts</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onSignOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
