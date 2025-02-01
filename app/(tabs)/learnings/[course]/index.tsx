import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, Pressable } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import { useFetchCourseContent } from '@/libs/supabase/courses';
import { useVideoPlayer, VideoView } from 'expo-video';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';

import AntDesign from '@expo/vector-icons/AntDesign';

interface VideoContentProps {
  uri: string
}

const VideoContent = (props: VideoContentProps) => {
  const { uri } = props;
  const player = useVideoPlayer(uri, player => {
    player.loop = false;
    player.play();
  });

  return (
    <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
  )
}

const Course = () => {
  const { course } = useLocalSearchParams();
  const { data } = useFetchCourseContent(course as string)
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    if (data?.length) {
      setSelected(data[0])
    }
  }, [data])

  return (
    <SafeAreaView>
      <ThemedView>
        {
          selected?.content_uri && <VideoContent uri={selected.content_uri} />
        }
        <ThemedView>
          <FlatList
            data={data || []}
            renderItem={({ item }) => (
              <Pressable onPress={() => setSelected(item)} className='shadow-md p-2 flex-row gap-4 items-center'>
                <ThemedView>
                  <AntDesign name="playcircleo" size={24} />
                </ThemedView>
                <ThemedView>
                  <ThemedText>{item.title}</ThemedText>
                  <ThemedText className='text-xs'>{item.description}</ThemedText>
                </ThemedView>
              </Pressable>)}
            keyExtractor={item => item.id} />
        </ThemedView>
      </ThemedView>
    </SafeAreaView>

  )
}

export default Course;

const styles = StyleSheet.create({

  video: {
    backgroundColor: "#000000",
    width: "100%",
    height: 275,
  },
});