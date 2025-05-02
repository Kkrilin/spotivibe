// RefreshContext.js
import { createContext, useState, useContext } from 'react';

const RefreshContext = createContext();

export function RefreshProvider({ children }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerGlobalRefresh = () => {
    return new Promise((resolve) => {
      setRefreshTrigger((prev) => prev + 1);
      resolve(); // Resolve immediately - components will handle their own refreshes
    });
  };

  return (
    <RefreshContext.Provider value={{ refreshTrigger, triggerGlobalRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
}

export const useRefresh = () => useContext(RefreshContext);
