import { View, Text, Image } from "react-native";
import React from "react";

interface ProfileImageProps {
  uri: string;
  width: number;
  height: number;
}

const ProfileImage = () => {
  return (
    <View
      className="rounded-full border"
      style={{ width: 50, height: 50, overflow: "hidden" }}
    >
      <Image
        source={{
          uri: "https://qvrqemrzdyfnjcqueblu.supabase.co/storage/v1/object/public/classtute-public/profile/22bde087-ec2f-44c8-a93a-5a0301602c19.png",
        }}
        width={50}
        height={50}
      />
    </View>
  );
};

export default ProfileImage;
