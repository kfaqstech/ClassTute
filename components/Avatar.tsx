import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

interface AvatarProps {
  uri: string
}
const Avatar = () => {
  const router = useRouter()
  return (
    <Pressable className='rounded-full border h-10 w-10 items-center justify-center' onPress={() => router.push('/(tabs)/settings')}>
      <Text>MD</Text>
    </Pressable>
  )
}

export default Avatar