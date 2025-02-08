import React from "react";
import { Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

interface AvatarProps {
  uri: string;
}

const Avatar = () => {
  const router = useRouter();
  return (
    <Pressable
      className="rounded-full border h-8 w-8 items-center justify-center"
      onPress={() => router.push('/profile')}
    >
      <Text>MD</Text>
    </Pressable>
  );
};

export default Avatar;
