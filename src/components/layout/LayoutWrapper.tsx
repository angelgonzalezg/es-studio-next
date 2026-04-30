"use client"

import { ReactNode } from "react";
import { useUser } from "@/hooks/useUser";

import Navbar from "./Navbar";
import Main from "./Main";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const { user, loading } = useUser();

  // Handle loading state minimally; Navbar has its own loading
  if (loading) {
    return (
      <>
        <Navbar />
        <Main>Loading...</Main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Main>{children}</Main>
      {!user && <Footer />}
    </>
  );
}