import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLearningPosts } from '@/libs/supabase/explore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback } from 'react';

interface LearningPostProps {
  data: any
}

const LearningPost = (props: LearningPostProps) => {
  const { data } = props
  return (
    <ThemedView className='shadow-lg p-2'>
      <ThemedText className='font-bol text-lg'>{data.title}</ThemedText>
      <ThemedText>{data.content}</ThemedText>
    </ThemedView>
  )
}

export default function TabTwoScreen() {
  const { data, isLoading, refetch } = useLearningPosts()
  console.log(data)

  const onRefresh = useCallback(() => {
    refetch()
  }, []);

  return (
    <SafeAreaView>
      <ScrollView refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }>
        <ThemedView className='p-4 gap-4'>
          
          {
            data?.map((lp: any) => {
              return <View key={lp.id}>
                <LearningPost data={lp} />
              </View>
            })
          }

        </ThemedView>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

});
