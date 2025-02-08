import { StyleSheet, View } from "react-native";
import { ThemedView } from '../ThemedView';

import { RtcSurfaceView } from 'react-native-agora';

const Participants = ({ participants }: any) => {
  return (
    <ThemedView style={{ flex: 1 }} className="flex flex-row flex-wrap">
      {participants.map((uid: number) => (
        <View key={uid} className="w-1/2">
          <RtcSurfaceView key={uid} style={styles.videoView} canvas={{ uid }} />
        </View>
      ))}
    </ThemedView>
  )
}

export default Participants;

const styles = StyleSheet.create({
  videoView: { width: '100%', height: '50%', backgroundColor: "black" },
});