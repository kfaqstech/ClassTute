import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/ThemedView'

import SelectBox from '@/components/shared/SelectBox'
import StudentForm from '@/components/onboarding/StudentForm'
import TeacherForm from '@/components/onboarding/TeacherForm'

import { USERROLE } from '@/constants'

const Onboarding = () => {
  const [role, setRole] = useState("STUDENT")

  return (
    <SafeAreaView>
      <ThemedView className='p-4 gap-4 h-full items-center justify-center'>
        <ThemedView className='gap-4 w-full'>
          <SelectBox options={USERROLE} onChange={(value) => setRole(value as string)} value={role} />
        </ThemedView>
        <ThemedView>
          {
            role === 'STUDENT' ? (<StudentForm />) : (<TeacherForm />)
          }
        </ThemedView>
 
      </ThemedView>
    </SafeAreaView>
  )
}

export default Onboarding