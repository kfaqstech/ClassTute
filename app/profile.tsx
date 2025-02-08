

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

import TextBox from '@/components/shared/TextBox'
import TextButton from '@/components/shared/TextButton'
import useAuthStore from '@/stores/authStore'
import withAuth from '@/components/hoc/withAuth'
import { Picker } from '@react-native-picker/picker'
import { router } from 'expo-router';
import { updateProfile, updateProfileImage } from '@/libs/supabase/auth'
import { notify } from '@/libs/notify'

import ImageInput from '@/components/shared/ImageInput'


const Profile = (props: any) => {
  const { uid } = props;
  const { profile, setProfile } = useAuthStore();
  const [image, setImage] = useState<any>(null);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      gender: profile?.gender || '',
    }
  })

  const onSubmit = async (data: any) => {
    const { status, message, data: profile } = await updateProfile(uid, data);
    if (status) {
      notify('Profile', message, 'success')
      setProfile(profile)
      router.replace('/');
    } else {
      notify('Profile', message, 'error')
    }
  }


  const uploadImage = async () => {
    if (!image) return;
    const { status, message } = await updateProfileImage(uid, image)
    if (status) {
      notify('Profile', message, 'success')
    } else {
      notify('Profile', message, 'error')
    }
  };

  return (
    <ThemedView className='w-full p-6 gap-6'>
      <ThemedView className='items-center'>
        <ImageInput varient='avatar' output='blob' onSelect={(response) => setImage(response)} value={profile?.picture} />
      </ThemedView>
      {
        image && (
          <ThemedView className='items-center'>
            <TextButton title='Save' onPress={uploadImage} className='w-20' />
          </ThemedView>
        )
      }

      <ThemedView className='w-full '>
        <ThemedText>First Name</ThemedText>
        <Controller
          control={control}
          name='first_name'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextBox
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}

            />
          )}
        />
      </ThemedView>

      <ThemedView className='w-full'>
        <ThemedText>Last Name</ThemedText>
        <Controller
          control={control}
          name='last_name'
          rules={{ required: 'Last name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextBox
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}

            />
          )}
        />
      </ThemedView>


      <ThemedView className='w-full'>
        <ThemedText>Gender</ThemedText>
        <Controller
          control={control}
          name='gender'
          rules={{ required: 'Gender is required' }}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={{ backgroundColor: '#f0f0f0', borderRadius: 3 }}
              className='p-2'
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          )}
        />

      </ThemedView>
      <TextButton title='Save' onPress={handleSubmit(onSubmit)} />
    </ThemedView>
  )
}

export default withAuth(Profile)




