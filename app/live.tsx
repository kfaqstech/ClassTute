import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { getAgoraToken } from '@/libs/supabase/agora';
import AgoraSetup from '@/components/agora/AgoraSetup';

const LiveClassRoom = () => {
  const { class_id, name } = useLocalSearchParams();
  const [token, setToken] = useState("");

  useEffect(() => {
    getAgoraToken().then(t => {
      setToken(t)
    })
  }, [])

  return (
    <View>
      {
        (class_id && token) ? (<AgoraSetup token={token} channel={class_id as string} />) : (<ThemedText>Loading...</ThemedText>)
      }

    </View>
  )
}

export default LiveClassRoom