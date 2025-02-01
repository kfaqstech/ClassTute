import { View, Text } from 'react-native'
import React from 'react'

interface AvatarProps {
  uri: string
}
const Avatar = () => {
  return (
    <View className='rounded-full border h-10 w-10 items-center justify-center'>
      <Text>MD</Text>
    </View>
  )
}

export default Avatar