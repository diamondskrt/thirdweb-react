import { useEffect } from 'react';

import { LogOut, FileCode, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useSignOutAccount } from '@/api/queries';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserContext } from '@/providers/auth-provider';

export function Profile() {
  const navigate = useNavigate();
  const { user, isPending } = useUserContext();

  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (!isSuccess) return;
    navigate('/auth/sign-in');
  }, [isSuccess, navigate, user, isPending]);

  return isPending ? (
    <Button variant="outline">Loading...</Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.imageUrl} alt="user" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.imageUrl} alt="user" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h6>{user?.userName}</h6>
              <small>{user?.email}</small>
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
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
