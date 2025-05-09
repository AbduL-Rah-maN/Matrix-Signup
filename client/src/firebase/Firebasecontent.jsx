
import React, { createContext } from 'react';
import app from './firebase';

export const FirebaseContext = createContext(null);

const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={app}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
