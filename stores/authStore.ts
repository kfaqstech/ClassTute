import { create } from "zustand";
import { supabase } from "@/libs/supabase";

interface AuthState {
  profile: IProfile | null;
  setProfile: (profile: string) => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  profile: null,
  setProfile: async (uid: string) => {
    const { data } = await supabase.from("profiles").select("*");
    if (data) {
      const profile: IProfile = data[0];
      set({ profile });
    }
  },
}));

export default useAuthStore;
