import { StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import { useRouter } from 'expo-router'

const CourseCard = ({ course }: any) => {
  const router = useRouter()
  return (
    <Pressable className='shadow-lg' onPress={() => router.push(`/learnings/${course.id}`)}>
      <ImageBackground source={course.thumbnail || require('@/assets/images/classes.jpg')} style={styles.thumbnail} />
      <ThemedView className='p-2'>
        <ThemedText className='text-sm font-bold'>{course.name}</ThemedText>
        <ThemedText className='text-xs'>{course.description}</ThemedText>
      </ThemedView>

    </Pressable>
  )
}

export default CourseCard;

const styles = StyleSheet.create({
  thumbnail: {
    height: 100,
  },
});