import { create } from "zustand";
import { supabase } from "@/libs/supabase";
import { getProfileUrl } from "./utils/auth";

interface AuthState {
  profile: IProfile | null;
  setProfile: (profile: IProfile | null) => void;
  fetchProfile: () => any;

}

const useAuthStore = create<AuthState>((set, get) => ({
  profile: null,
  setProfile: async (profile) => {
    if (profile) {
      set({ profile: { ...profile, picture: getProfileUrl(profile.id) } });
    } else {
      set({ profile: null })
    }
  },
  fetchProfile: async () => {
    const { data } = await supabase.from("profiles").select("*");
    if (data) {
      const profile: IProfile = data[0];
      set({ profile: { ...profile, picture: getProfileUrl(profile.id) } });
    }
  },

}));

export default useAuthStore;
