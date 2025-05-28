import { createClient } from "@supabase/supabase-js"

// Utilizăm variabilele de mediu
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Verificăm dacă variabilele de mediu sunt definite
if (!supabaseUrl || !supabaseAnonKey) {
	console.error(
		"Variabilele de mediu VITE_SUPABASE_URL sau VITE_SUPABASE_ANON_KEY nu sunt definite. " +
			"Verificați fișierul .env.local.",
	)
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "")
