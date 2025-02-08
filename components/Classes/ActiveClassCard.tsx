import React from 'react'
import { Pressable } from 'react-native'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { useRouter } from 'expo-router'
import { localTime } from '@/libs/utils'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const ActiveClassCard = ({ item }: any) => {
  const router = useRouter();

  const joinClass = () => {
    router.push({
      pathname: "/live",
      params: { class_key: item.classes.class_key, name: item.classes.name, token: item?.token },
    });
  };

  return (
    <ThemedView className='px-4 py-2'>
      <ThemedView className='shadow-sm rounded-lg p-4'>
        <ThemedText className="font-bold">{item?.classes?.name}</ThemedText>
        <ThemedText className="text-sm">{item?.classes?.description}</ThemedText>
        <ThemedView className="flex-row justify-between mt-4">
          <ThemedView className='flex flex-row gap-2 items-center'>
            <MaterialIcons name="access-time" size={15} color="black" />
            <ThemedText className='text-xs'>{localTime(item?.classes?.start_time)} - {localTime(item?.classes?.end_time)}</ThemedText>
          </ThemedView>
          <Pressable
            className="py-1 px-2 shadow-sm bg-gray-200 rounded-md"
            onPress={joinClass}
          >
            <ThemedText className="text-sm font-bold">Join Class</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )
}

export default ActiveClassCard