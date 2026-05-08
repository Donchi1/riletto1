import { create } from 'zustand'

interface UIStore {
  sidebarOpen: boolean
  commandOpen: boolean
  theme: 'light' | 'dark'
  setSidebarOpen: (open: boolean) => void
  setCommandOpen: (open: boolean) => void
  toggleTheme: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  commandOpen: false,
  theme: 'light',
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCommandOpen: (open) => set({ commandOpen: open }),
  toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
}))

interface UserStore {
  user: { id: string; email: string; name: string } | null
  credits: number
  plan: string
  setUser: (user: UserStore['user']) => void
  setCredits: (credits: number) => void
  setPlan: (plan: string) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  credits: 1000,
  plan: 'starter',
  setUser: (user) => set({ user }),
  setCredits: (credits) => set({ credits }),
  setPlan: (plan) => set({ plan }),
}))
