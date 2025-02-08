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
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from "expo-router";
import { ThemedView } from "../ThemedView";
import WhiteBoard from "./WhiteBoard";
import Participants from "./Participants";

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
  const [toggleScreen, setToggleScreen] = useState(false);
  const [mode, setMode] = useState('tuition');

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
    <ThemedView className="flex flex-row">
      <ThemedView className="w-3/4 h-screen border border-4 border-gray-400">
        {
          mode === 'tuition' && <WhiteBoard />
        }
        {
          mode === 'discussion' && <Participants participants={participants}/>
        }
      </ThemedView>

      <ThemedView className="w-1/4 h-screen border-l border-r border-4 border-gray-400">
        <View className="bg-black h-1/2">
          {joined && <RtcSurfaceView style={styles.videoView} canvas={{ uid: 0 }} />}
        </View>
        <ThemedView className="justify-between flex-col h-1/2">
          <ThemedView className="flex flex-col">
            <View className="flex-row gap-4 py-2 px-2 justify-between">
              <Pressable onPress={() => setMode('tuition')} className="bg-gray-200 p-2 h-10 w-10 rounded-full items-center justify-center">
                <FontAwesome5 name="chalkboard" size={15} color="black" />
              </Pressable>
              <Pressable onPress={() => setMode('discussion')} className="bg-gray-200 p-2 h-10 w-10 rounded-full items-center justify-center">
                <FontAwesome5 name="video" size={18} color="black" />
              </Pressable>
              {
                toggleScreen ?
                  (<Pressable className="bg-gray-200 p-2 h-10 w-10 rounded-full items-center justify-center"><MaterialIcons name="stop-screen-share" size={20} color="black" /></Pressable>) :
                  (<Pressable className="bg-gray-200 p-2 h-10 w-10 rounded-full items-center justify-center"><MaterialIcons name="screen-share" size={20} color="black" /></Pressable>)
              }
            </View>
            <View className="flex-row gap-4 py-2 px-2 justify-between">
              <Pressable className="bg-gray-200 p-2 h-10 w-10 rounded-full items-center justify-center">
                <FontAwesome5 name="microphone-alt-slash" size={16} color="black" />
              </Pressable>
              <Pressable className="bg-gray-200 p-2 h-10 w-10 rounded-full items-center justify-center">
                <MaterialIcons name="message" size={20} color="black" />
              </Pressable>
            </View>
          </ThemedView>
          <View className="flex flex-row justify-between bg-gray-200 py-2 px-3">
            <Pressable onPress={onToggleVideo}>
              <Feather name={toggleVideo ? "video" : "video-off"} size={20} color="black" />
            </Pressable>
            <Pressable onPress={onToggleAudio}>
              <Feather name={toggleAudio ? "mic" : "mic-off"} size={20} color="black" />
            </Pressable>
            <Pressable onPress={leaveChannel}>
              <Feather name="phone-off" size={20} color="red" />
            </Pressable>
          </View>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  videoView: { width: '100%', height: 200, backgroundColor: "black" },
});

export default AgoraSetup;
