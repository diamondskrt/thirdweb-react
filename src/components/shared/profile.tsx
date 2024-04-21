import { useEffect } from 'react';

import { LogOut, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { useSignOutAccount } from '@/api/queries';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { DBUser } from '@/models';

export function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage<DBUser | null>('user', null);

  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (!isSuccess) return;

    setUser(null);
    navigate('/auth/sign-in');
  }, [isSuccess, navigate, setUser]);

  return (
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
          <Link to="/add-contract">
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>Add Contract</span>
            </DropdownMenuItem>
          </Link>
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
