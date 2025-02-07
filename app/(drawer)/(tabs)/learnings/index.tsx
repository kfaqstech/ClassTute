

import React from 'react'
import { FlatList } from 'react-native'
import { useFetchCourses } from '@/libs/supabase/courses'
import { ThemedView } from '@/components/ThemedView';

import CourseCard from '@/components/CourseCard';

const Learnings = () => {
  const { data } = useFetchCourses();
 
  return (
    <ThemedView className='p-2'>
      <FlatList
        data={data || []}
        renderItem={({ item }) => <ThemedView className='p-2'><CourseCard course={item} /></ThemedView>}
        keyExtractor={item => item.id} />
    </ThemedView>
  )
}

export default Learnings