import React from 'react'
import { FlatList } from 'react-native'
import { useFetchCourses } from '@/libs/supabase/courses'
import { ThemedView } from '@/components/ThemedView';

import CourseCard from '@/components/CourseCard';

const Courses = () => {
  const { data } = useFetchCourses();
  console.log("courses", data)
  return (
    <ThemedView className='p-2'>
      <FlatList
        data={data || []}
        renderItem={({ item }) => <CourseCard course={item} />}
        keyExtractor={item => item.id} />
    </ThemedView>
  )
}

export default Courses