import { Pressable, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useFetchClasses, useFetchMyClasses } from '@/libs/supabase/classes';

import { ThemedText } from '@/components/ThemedText';
import MyActiveClasses from '@/components/classes/MyActiveClasses';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SuggestedClasses from '@/components/classes/SuggestedClass';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFetchCourses } from '@/libs/supabase/courses';
import SuggestedCourse from '@/components/courses/SuggestedCourse';

function HomeScreen() {
  const classes = useFetchMyClasses();
  const suggestedClasses = useFetchClasses();
  const suggestedCourse = useFetchCourses();
  const { bottom } = useSafeAreaInsets();

  return (
    <ScrollView style={{ marginBottom: bottom + 50 }}>
      <ThemedView>
        <ThemedView className='flex-row gap-2 items-center px-4 py-2 mt-4'>
          <MaterialIcons name="class" size={18} color={'black'} />
          <ThemedText className='text-lg font-bold'>My Classes</ThemedText>
        </ThemedView>
        <MyActiveClasses classes={classes} />
      </ThemedView>

      <ThemedView>
        <ThemedView className='flex-row justify-between items-center px-4 py-2'>
          <ThemedView className='flex-row gap-2 items-center'>
            <MaterialIcons name="class" size={18} color={'black'} />
            <ThemedText className='text-lg font-bold'>Suggested Classes</ThemedText>
          </ThemedView>
          <Pressable>
            <ThemedText className=''>View More</ThemedText>
          </Pressable>
        </ThemedView>
        <SuggestedClasses classes={suggestedClasses.data} />
      </ThemedView>

      <ThemedView className='pt-4'>
        <ThemedView className='flex-row justify-between items-center px-4 py-2'>
          <ThemedView className='flex-row gap-2 items-center'>
            <MaterialIcons name="class" size={18} color={'black'} />
            <ThemedText className='text-lg font-bold'>Suggested Course</ThemedText>
          </ThemedView>
          <Pressable>
            <ThemedText className=''>View More</ThemedText>
          </Pressable>
        </ThemedView>
        <SuggestedCourse courses={suggestedCourse.data} />
      </ThemedView>
    </ScrollView>
  );
}

export default HomeScreen
