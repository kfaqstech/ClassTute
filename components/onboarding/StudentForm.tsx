import React from 'react'
import { ThemedView } from '../ThemedView'
import { useForm, Controller } from 'react-hook-form'
import TextButton from '../shared/TextButton'
import TextBox from '../shared/TextBox'
import { useUpdateProfile } from '@/libs/supabase/auth/profile'


const StudentForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      gender: '',
      role: 'STUDENT' 
    }
  })

  const { mutate, error } = useUpdateProfile()

  const onSubmit = (data: any) => {
    console.log("submitted", data)
    mutate(data)
  }

  return (
    <ThemedView>
      <ThemedView className='w-full'>
        <Controller
          control={control}
          name='first_name'
          rules={{ required: 'First name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextBox
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter first name"
            />
          )}
        />
      </ThemedView>

      <ThemedView className='w-full'>
        <Controller
          control={control}
          name='last_name'
          rules={{ required: 'Last name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextBox
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter last name"
            />
          )}
        />
      </ThemedView>

      <ThemedView className='w-full'>
        <Controller
          control={control}
          name='gender'
          rules={{ required: 'gender is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextBox
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter gender"
            />
          )}
        />
      </ThemedView>


     

      <TextButton title='Save' onPress={handleSubmit(onSubmit)} />
    </ThemedView>
  )
}

export default StudentForm
