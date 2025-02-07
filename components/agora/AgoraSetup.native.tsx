import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, PermissionsAndroid, Platform, Alert } from "react-native";
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  RtcSurfaceView,
} from 'react-native-agora';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";

const AGORA_APP_ID = '1e9e1f7cb00e4b4d96ff563c23b5b587';

const getPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA
    ]);
  }
};

interface AgoraSetupProps {
  token: string;
  channel: string;
}

const AgoraSetup = ({ token, channel }: AgoraSetupProps) => {
  const router = useRouter()
  const [engine, setEngine] = useState<IRtcEngine | null>(null);
  const [joined, setJoined] = useState(false);
  const [participants, setParticipants] = useState<number[]>([]);
  const [toggleAudio, setToggleAudio] = useState(false);
  const [toggleVideo, setToggleVideo] = useState(false);
  const [toggleScreen, setToggleScreen] = useState(false)

  useEffect(() => {
    getPermission();
    initialize();
  }, []);

  const initialize = () => {
    const rtcEngine = createAgoraRtcEngine();
    rtcEngine.initialize({ appId: AGORA_APP_ID });
    rtcEngine.enableVideo();
    rtcEngine.startPreview();

    rtcEngine.setChannelProfile(ChannelProfileType.ChannelProfileLiveBroadcasting);
    rtcEngine.setClientRole(ClientRoleType.ClientRoleBroadcaster);

    rtcEngine.addListener("onUserJoined", (_, remoteUid) => {
      setParticipants((prev) => [...prev, remoteUid]);
    });

    rtcEngine.addListener("onUserOffline", (_, remoteUid) => {
      setParticipants((prev) => prev.filter((id) => id !== remoteUid));
    });

    setEngine(rtcEngine);
  };

  useEffect(() => {
    if (engine) {
      engine.joinChannel(token, channel, 0, {});
      setJoined(true);
    }
  }, [engine]);

  const leaveChannel = async () => {
    if (engine) {
      engine.leaveChannel();
      engine.release();
      setEngine(null);
      setJoined(false);
      setParticipants([]);
      router.back()
    }
  };

  const onToggleAudio = () => {
    if (engine) {
      setToggleAudio(!toggleAudio);
      engine.muteLocalAudioStream(!toggleAudio);
    }
  };

  const onToggleVideo = () => {
    if (engine) {
      setToggleVideo(!toggleVideo);
      engine.muteLocalVideoStream(!toggleVideo);
    }
  };

  const onShareScreen = () => {
    if (engine) {
      if (Platform.OS === 'android') {
        engine.startScreenCapture({
          captureAudio: true,
          captureVideo: true,
        });
        setToggleScreen(true);
      } else {
        Alert.alert("Screen", "Not Supported")
      }

    }
  };

  const onStopShare = () => {
    if (engine) {
      engine.stopScreenCapture();
      setToggleScreen(false);
    }
  };

  return (
    <View>
      <View className="flex flex-col">
        {joined && <RtcSurfaceView style={styles.videoView} canvas={{ uid: 0 }} />}
        <View className="flex-row gap-4 py-2 px-6 justify-between">
          <Pressable onPress={onToggleVideo}>
            <Feather name={toggleVideo ? "video" : "video-off"} size={20} color="black" />
          </Pressable>
          <Pressable onPress={onToggleAudio}>
            <Feather name={toggleAudio ? "mic" : "mic-off"} size={20} color="black" />
          </Pressable>
          
          {
            toggleScreen ?
              (<Pressable onPress={onStopShare}><MaterialIcons name="stop-screen-share" size={24} color="black" /></Pressable>) :
              (<Pressable onPress={onShareScreen}><MaterialIcons name="screen-share" size={24} color="black" /></Pressable>)
          }
          <Pressable onPress={leaveChannel}>
          <Feather name="phone-off" size={20} color="black" />
          </Pressable>
        </View>
      </View>

      {participants.map((uid) => (
        <RtcSurfaceView key={uid} style={styles.videoView} canvas={{ uid }} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  videoView: { width: '100%', height: 200, backgroundColor: "black" },
});

export default AgoraSetup;
