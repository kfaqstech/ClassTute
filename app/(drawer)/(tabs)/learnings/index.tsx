

import React from 'react'
import { FlatList } from 'react-native'
import { useFetchCourses } from '@/libs/supabase/courses'
import { ThemedView } from '@/components/ThemedView';
import CourseCard from '@/components/courses/CourseCard';


const Learnings = () => {
  const { data } = useFetchCourses();
 
  return (
    <ThemedView>
      <FlatList
        data={data || []}
        renderItem={({ item }) => <CourseCard course={item} />}
        keyExtractor={item => item.id} />
    </ThemedView>
  )
}

export default Learnings