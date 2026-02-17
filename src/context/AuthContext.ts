import { createContext } from "react";


export interface User {
  id: string;
  name: string;
}

export interface AuthContextValue {
  user: User | null;
  signin: (newUser: User, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
