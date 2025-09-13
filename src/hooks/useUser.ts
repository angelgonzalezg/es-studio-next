"use client"

import { useState, useEffect } from "react"
import { supabaseClient } from "@/lib/supabaseClient"
import { User } from "@supabase/supabase-js"

export function useUser () {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabaseClient.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
      setLoading(false)
    })
    
    // Listen for auth state changes (login/logout)
    const { data: subscription } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.subscription.unsubscribe()
  
  }, [])

  return { user, loading }
}

