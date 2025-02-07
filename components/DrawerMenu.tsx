import React from "react";
import { Pressable } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { supabase } from "@/libs/supabase";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAuthStore from "@/stores/authStore";

const DrawerMenu = (props: any) => {
  const router = useRouter();
  const { profile } = useAuthStore();
  const { top, bottom } = useSafeAreaInsets();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <ThemedView
      style={{ flex: 1, paddingTop: top, paddingBottom: bottom }}
      className="py-4"
    >
      <ThemedView className="p-4">
        <ThemedText>{profile?.first_name}</ThemedText>
        <ThemedText>{profile?.email}</ThemedText>
      </ThemedView>
      <DrawerContentScrollView {...props}>
        <DrawerItem label="Home" onPress={() => router.push("/")} />
        <DrawerItem label="Teachers" onPress={() => router.push("/teachers")} />
        <DrawerItem label="courses" onPress={() => {}} />
      </DrawerContentScrollView>
      <Pressable onPress={handleLogout} className="flex items-center p-2">
        <ThemedText>Logout</ThemedText>
      </Pressable>
    </ThemedView>
  );
};

export default DrawerMenu;
