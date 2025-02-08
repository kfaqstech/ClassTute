import { View, Text, Image } from "react-native";
import React from "react";

interface ProfileImageProps {
  uri: string;
  width: number;
  height: number;
}

const ProfileImage = ({profile}: any) => {
  return (
    <View
      className="rounded-full border"
      style={{ width: 50, height: 50, overflow: "hidden" }}
    >
      <Image
        source={{
          uri: profile?.picture,
        }}
        width={50}
        height={50}
      />
    </View>
  );
};

export default ProfileImage;
