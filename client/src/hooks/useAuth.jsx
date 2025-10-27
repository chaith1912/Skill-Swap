// client/src/hooks/useAuth.jsx

import { useContext, createContext } from 'react'; // <-- 1. Add createContext

// 2. CREATE and EXPORT the context from this file
export const AuthContext = createContext(null); 

// 3. Your hook stays the same. It can now use the context from its own file.
export const useAuth = () => {
  return useContext(AuthContext);
};