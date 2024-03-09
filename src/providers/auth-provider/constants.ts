import { createContext, useContext } from 'react';
import { IContextType } from './models';

const INITIAL_STATE = {
  user: null,
  isPending: false,
  setUser: () => {},
};

export const AuthContext = createContext<IContextType>(INITIAL_STATE);

export const useUserContext = () => useContext(AuthContext);
