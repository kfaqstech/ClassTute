import React from "react";
import { Pressable } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { supabase } from "@/libs/supabase";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAuthStore from "@/stores/authStore";
import ProfileImage from "./ProfileImage";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
      <ThemedView className="flex-row items-center gap-4 p-4 border-b border-gray-200">
        <ProfileImage profile={profile}/>
        <ThemedView>
          <ThemedText>{profile?.first_name}</ThemedText>
          <ThemedText>{profile?.email}</ThemedText>
          <Pressable onPress={() => router.push("/profile")} className="mt-2">
            <ThemedText className="text-xs font-bold text-blue-600">Update Profile</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Home"
          icon={({ size, color }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          )}
          onPress={() => router.push("/")}
        />
        <DrawerItem
          label="Teachers"
          onPress={() => router.push("/teachers")}
          icon={({ size, color }) => (
            <FontAwesome5 name="chalkboard-teacher" size={size} color={color} />
          )}
        />
        <DrawerItem
          label="Courses"
          onPress={() => router.push('/courses')}
          icon={({ size, color }) => (
            <FontAwesome5 name="book" size={size} color={color} />
          )}
        />
        <DrawerItem
          label="Classes"
          onPress={() => router.push('/classes')}
          icon={({ size, color }) => (
            <MaterialIcons name="class" size={size} color={color} />
          )}
        />

      </DrawerContentScrollView>
      <Pressable onPress={handleLogout} className="flex items-center p-2">
        <ThemedText>Logout</ThemedText>
      </Pressable>
    </ThemedView>
  );
};

export default DrawerMenu;
