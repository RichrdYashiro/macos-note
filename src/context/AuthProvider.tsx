import { useState } from "react";
import { AuthContext, type User } from "./AuthContext";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const signin = (newUser: User, callback: VoidFunction) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    callback();
  };

  const signout = (callback: VoidFunction) => {
    setUser(null);
    localStorage.removeItem("user");
    callback();
  };

  const handleSingout = () => {
    signout(() => {
      navigate("/login", { replace: true });
    });
  };
  const value = {
    user,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}

      {user && (
        <>
          {user.name}
          <Button onClick={handleSingout}>signout</Button>
        </>
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
