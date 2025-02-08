import { create } from "zustand";
import { supabase } from "@/libs/supabase";

interface AuthState {
  profile: IProfile | null;
  setProfile: (profile: IProfile | null) => void;
  fetchProfile: () => any;

}

const useAuthStore = create<AuthState>((set, get) => ({
  profile: null,
  setProfile: async (profile) => {
    set({ profile });
  },
  fetchProfile: async () => {
    const { data } = await supabase.from("profiles").select("*");
    if (data) {
      const profile: IProfile = data[0];
      set({ profile });
    }
  },

}));

export default useAuthStore;
