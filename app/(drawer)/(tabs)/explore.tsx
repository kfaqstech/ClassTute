import { RefreshControl, ScrollView, StyleSheet, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLearningPosts } from '@/libs/supabase/explore';
import React, { useCallback } from 'react';




interface LearningPostProps {
  data: any
}

const LearningPost = (props: LearningPostProps) => {
  const { data } = props
  return (
    <ThemedView className='shadow-lg p-2'>
      <ThemedText className='font-bold text-lg'>{data.title}</ThemedText>
      <ThemedText className='text-md'>{data.content}</ThemedText>
    </ThemedView>
  )
}

export default function Explore() {
  const { data, isLoading, refetch } = useLearningPosts()

  const onRefresh = useCallback(() => {
    refetch()
  }, []);

  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
    }>

      <ThemedView className='p-4 gap-4'>

        {/* <TextInput>
          <Text></Text>
        </TextInput> */}

        {/* {
          data?.map((lp: any) => {
            return <View key={lp.id}>
              <LearningPost data={lp} />
            </View>
          })
        } */}

      </ThemedView>
    </ScrollView>
  );
}

