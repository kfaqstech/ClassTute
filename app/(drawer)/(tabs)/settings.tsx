import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import Avatar from '@/components/Avatar'
import { Collapsible } from '@/components/Collapsible'
import { ThemedView } from '@/components/ThemedView'
import { logout } from '@/libs/supabase/auth'
import { router } from "expo-router";
import { TouchableOpacity } from 'react-native'
const Settings = () => {

  const handleLogout = async () => {
    const res = await logout();
    if (res.status) {
        router.replace('/login'); 
    } else {
        console.log("Logout failed:", res.message);
    }
};
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
            <Link href="/myteachers"><ThemedText>my Teachers</ThemedText></Link>
            <TouchableOpacity onPress={handleLogout}>
              <ThemedText>Logout</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </Collapsible>
      </ThemedView>


    </SafeAreaView>
  )
}

export default Settings