import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import Avatar from '@/components/Avatar'
import { Collapsible } from '@/components/Collapsible'
import { ThemedView } from '@/components/ThemedView'

const Settings = () => {
  return (
    <SafeAreaView>
      <ThemedView className='p-4'>
        <ThemedView className='justify-center items-center'>
          <Avatar />
        </ThemedView>

        <Collapsible title="Menu">
          <ThemedView className='gap-4'>
            <Link href="/courses"><ThemedText>Courses</ThemedText></Link>
            <Link href="/teachers"><ThemedText>Teachers</ThemedText></Link>
          </ThemedView>
        </Collapsible>
      </ThemedView>


    </SafeAreaView>
  )
}

export default Settings