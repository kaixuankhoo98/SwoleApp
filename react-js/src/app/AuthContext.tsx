import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../shared/hooks/api";

type User = { id: number } | null;

const AuthContext = createContext<{
  user: User;
  isLoading: boolean;
  setUser: (u: User) => void;
}>({
  user: null,
  isLoading: true,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      try {
        const res = await apiRequest<{ userId: number }>("/validate");
        setUser({ id: res.userId });
      } catch (err) {
        setUser(null);
        // no need to navigate here if you have 401 intercept set up
      } finally {
        setIsLoading(false);
      }
    };

    validate();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
