import React from "react";
import { Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

interface AvatarProps {
  uri: string;
}

const Avatar = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  return (
    <Pressable
      className="rounded-full border h-8 w-8 items-center justify-center"
      onPress={() => navigation.openDrawer()}
    >
      <Text>MD</Text>
    </Pressable>
  );
};

export default Avatar;
