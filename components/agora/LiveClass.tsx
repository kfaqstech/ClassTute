import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  RtcSurfaceView,
} from 'react-native-agora';


const AGORA_APP_ID = ''
const AGORA_CHANNEL_NAME= ''
const AGORA_TEMP_TOKEN = ''
const LiveClass = () => {
  const [engine, setEngine] = useState<IRtcEngine | null>(null);
  const [joined, setJoined] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<number[]>([]);
  

  useEffect(() => {
    const initAgora = async () => {
      const rtcEngine = createAgoraRtcEngine();
      rtcEngine.initialize({ appId: '1e9e1f7cb00e4b4d96ff563c23b5b587' });
      rtcEngine.enableVideo();
      rtcEngine.setChannelProfile(ChannelProfileType.ChannelProfileLiveBroadcasting);
      rtcEngine.setClientRole(ClientRoleType.ClientRoleBroadcaster);

      rtcEngine.addListener("onUserJoined", (event) => {
        setRemoteUsers((prev) => [...prev, event.localUid || 0]);
      });

      rtcEngine.addListener("onUserOffline", (event) => {
        setRemoteUsers((prev) => prev.filter((id) => id !== event.localUid));
      });

      setEngine(rtcEngine);
    };

    initAgora();

  
  }, []);

  const joinChannel = async () => {
    if (engine) {
      engine.joinChannel(AGORA_TEMP_TOKEN, AGORA_CHANNEL_NAME, 0, {});
      setJoined(true);
    }
  };

  const leaveChannel = async () => {
    if (engine) {
      engine.leaveChannel();
      setJoined(false);
      setRemoteUsers([]);
    }
  };

  return (
    <View style={styles.container}>
      {joined ? (
        <>
          <RtcSurfaceView style={styles.localVideo} canvas={{ uid: 0 }} />
          {remoteUsers.map((uid) => (
            <RtcSurfaceView key={uid} style={styles.remoteVideo} canvas={{ uid: uid }} />
          ))}
          <Button title="Leave Class" onPress={leaveChannel} />
        </>
      ) : (
        <Button title="Join Live Class" onPress={joinChannel} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  localVideo: { width: 200, height: 150, backgroundColor: "black" },
  remoteVideo: { width: 200, height: 150, marginTop: 10, backgroundColor: "black" },
});

export default LiveClass;
