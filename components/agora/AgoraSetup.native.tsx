import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, Pressable } from "react-native";
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  RtcSurfaceView,
} from 'react-native-agora';

import { PermissionsAndroid, Platform } from 'react-native';

import Feather from '@expo/vector-icons/Feather';

const AGORA_APP_ID = '1e9e1f7cb00e4b4d96ff563c23b5b587'

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

const AgoraSetup = (props: AgoraSetupProps) => {
  const { token, channel } = props;

  const [engine, setEngine] = useState<IRtcEngine | null>(null);
  const [joined, setJoined] = useState(false);
  const [participants, setParticipants] = useState<number[]>([]);
  const [toggleAudio, setToggleAudio] = useState(false)
  const [toggleVideo, setToggleVideo] = useState(false)

  const initialize = () => {
    const rtcEngine = createAgoraRtcEngine();
    rtcEngine.initialize({ appId: AGORA_APP_ID });
    rtcEngine.enableVideo();

    rtcEngine.setChannelProfile(ChannelProfileType.ChannelProfileLiveBroadcasting)
    rtcEngine.setClientRole(ClientRoleType.ClientRoleBroadcaster)

    rtcEngine.addListener("onUserJoined", (event) => {
      setParticipants((prev) => [...prev, event.localUid || 0]);
    });

    rtcEngine.addListener("onUserOffline", (event) => {
      setParticipants((prev) => prev.filter((id) => id !== event.localUid));
    });

    setEngine(rtcEngine);
  }


  useEffect(() => {
    getPermission()
    initialize();
  }, []);

  useEffect(() => {
    if (engine) {
      engine.joinChannel(token, channel, 0, {});
      setJoined(true);
    }
  }, [engine])

  const leaveChannel = async () => {
    if (engine) {
      engine.leaveChannel();
      setJoined(false);

    }
  };

  const onToggleAudio = () => {
    if (engine) {
      setToggleAudio(!toggleAudio)
      engine.muteLocalAudioStream(!toggleAudio);
    }
  }

  const onToggleVideo = () => {
    if (engine) {
      setToggleVideo(!toggleVideo)
      engine.muteLocalVideoStream(!toggleVideo)
      engine.muteRemoteVideoStream(0, true);
    }
  }

  return (
    <View>
      <View className="flex flex-col ">
        <RtcSurfaceView style={styles.videoView} canvas={{ uid: 0 }} />
        <View className="flex-row gap-4 p-2 bg-gray-600 justify-center">
          <Pressable onPress={onToggleVideo}>
            {
              toggleVideo ? (
                <Feather name="video" size={20} color="black" />) :
                (<Feather name="video-off" size={20} color="black" />)
            }
          </Pressable>
          <Pressable onPress={onToggleAudio}>
            {
              toggleAudio ? (
                <Feather name="mic" size={20} color="black" />) :
                (<Feather name="mic-off" size={20} color="black" />)
            }
          </Pressable>
        </View>
      </View>
      {
        participants.map(p => {
          return <View key={p}><RtcSurfaceView style={styles.videoView} canvas={{ uid: p }} /></View>
        })
      }
      <Button title="Leave Class" onPress={leaveChannel} />
    </View>
  );
};

const styles = StyleSheet.create({
  videoView: { width: '100%', height: 200, backgroundColor: "black" },
});

export default AgoraSetup;
