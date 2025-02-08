import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { getAgoraToken } from "@/libs/supabase/agora";

import AgoraSetup from "@/components/agora/AgoraSetup";

import * as ScreenOrientation from 'expo-screen-orientation';

const LiveClassRoom = () => {
  const { class_key, name, token } = useLocalSearchParams();

  useEffect(() => {
    ScreenOrientation.unlockAsync();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   getAgoraToken().then(t => {
  //     setToken(t)
  //   })
  // }, [])

  return (
    <ThemedView>
      {class_key && token ? (
        <AgoraSetup token={token as string} channel={class_key as string} />
      ) : (
        <ThemedText>Loading...</ThemedText>
      )}
    </ThemedView>
  );
};

export default LiveClassRoom;
