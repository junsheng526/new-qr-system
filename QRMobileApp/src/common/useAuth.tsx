import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import React, {useEffect} from 'react';
import app from './firebase';

const auth = getAuth();

export function useAuth() {
  const [user, setUser] = React.useState<User>();

  useEffect(() => {
    const unsubcribeFromAuthStateChanged = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return unsubcribeFromAuthStateChanged;
  }, []);

  return {
    user,
  };
}
