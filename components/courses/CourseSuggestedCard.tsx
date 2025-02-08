import { StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'

const CourseSuggestedCard = ({ course }: any) => {

  return (
    <ThemedView className='p-4'>
      <ThemedView className='shadow-sm p-4'>
        <Image
          source={course?.thumbnail || require("@/assets/images/classes.jpg")}
          style={styles.thumbnail}
        />
        <ThemedView className='flex-row justify-between items-center mt-4'>
          <ThemedView>
            <ThemedText className='text-sm font-bold'>{course.name}</ThemedText>
            <ThemedText className='text-xs'>{course.description}</ThemedText>
          </ThemedView>
          <Pressable
            className="py-1 px-2 shadow-sm bg-gray-200 rounded-md"
            onPress={() => { }}
          >
            <ThemedText className="text-sm font-bold">View Detail</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )
}

export default CourseSuggestedCard;
const styles = StyleSheet.create({
  thumbnail: {
    width: 150,
    height: 150,
  },
});
