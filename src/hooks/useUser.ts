"use client"

import { useState, useEffect } from "react"

// Minimal User interface for JWT-based auth
interface User {
  id: string;
  email: string;
  roles: string[];
}

export function useUser (): { user: User | null; loading: boolean } {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Simple JWT decode function (no verification, for client-side only)
  const decodeJWT = (token: string): any => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    // Initial check
    const authStateStr = localStorage.getItem('auth_state');
    if (authStateStr) {
      try {
        const authState = JSON.parse(authStateStr);
        const { token, email } = authState;
        if (token) {
          const payload = decodeJWT(token);
        if (payload) {
          setUser({
            id: payload.sub || payload.user_id,
            email: email || payload.email, // Prefer stored email
            roles: payload.authorities || [],
          });
        }
        }
      } catch (err) {
        console.error('Invalid auth state', err);
      }
    }
    setLoading(false);

    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_state') {
        if (e.newValue) {
          try {
            const authState = JSON.parse(e.newValue);
            const { token, email } = authState;
            if (token) {
              const payload = decodeJWT(token);
              if (payload) {
                setUser({
                  id: payload.sub || payload.user_id,
                  email: email || payload.email,
                  roles: payload.authorities || [],
                });
              }
            }
          } catch (err) {
            console.error('Invalid auth state', err);
          }
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { user, loading }
}
