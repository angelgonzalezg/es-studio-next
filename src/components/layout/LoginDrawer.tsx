'use client'

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { supabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import Button from "../ui/Button";

const LoginDrawer: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  // Shared user state hook
  const { user } = useUser();
  // Router for navigation
  const router = useRouter();

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Error al iniciar sesión. Revisa tus credenciales.");
    } else {
      setIsOpen(false);
      router.push('/dashboard'); // Redirect to dashboard on successful login
    }
  }

  // // Handle Signup
  // const handleSignup = async (e: React.FormEvent) => {
  //   // Logic for signup
  // }

  // Do not render the drawer if the user is already logged in
  if (user) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:flex justify-center items-center relative group overflow-hidden hidden border-1 p-0.5 px-2 rounded cursor-pointer"
      >
        Acceder
        <span className="opacity-0 pl-0.5 translate-x-[-5px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
          &rarr;
        </span>
      </button>

      {/* Login drawer and dark overlay in portal */}
      {isOpen &&
        createPortal(
          <>
            {/* Dark overlay */}
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />
            {/* Login drawer */}
            <div
              className={`fixed items-center justify-center top-0 right-0 h-full w-90 bg-background shadow-xl p-6 z-50 
                transform transition-transform duration-500 ease-in-out 
                ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
              <h2 className="text-xl font-semibold mb-4">Inicia sesión</h2>
              <form className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Correo"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50"
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50"
                />
                {error &&
                  <p className="text-red-500 text-sm">{error}</p>
                }
                <Button
                  text="Continuar"
                  onClick={handleLogin}
                />
                {error && <div>
                  <Link href="/pwrecover" className="text-sm text-center hover:underline">
                    ¿Olvidaste la contraseña? Recuperala
                  </Link>
                </div>
                }
              </form>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setError(null);
                }}
                className="absolute top-2 right-2 text-gray-500"
              >
                ✕
              </button>
            </div>
          </>,
          // Draw component in the body DOM node
          document.body
        )}
    </div>
  )
}

export default LoginDrawer;

