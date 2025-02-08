

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

import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, Pressable, TouchableOpacity, View } from 'react-native'
import { supabase } from '@/libs/supabase'


const Profile = (props: any) => {
  const { uid } = props;
  const { profile, setProfile } = useAuthStore();
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);




  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      gender: profile?.gender || '',
    }
  })

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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
    const response = await fetch(image);
    const blob = await response.blob();
    const { status, message, data } = await updateProfileImage(uid, blob)
  };



  return (
    <ThemedView className='w-full p-6 gap-6'>

      <TouchableOpacity onPress={() => pickImage()} className="items-center">
        {image ? (
          <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
        ) : (
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>+</ThemedText>
          </View>
        )}
        <ThemedText className="mt-2 text-blue-500">Select Profile Picture </ThemedText>
      </TouchableOpacity>

      <Pressable className="items-center " onPress={uploadImage}>
        <ThemedText>upload profile picture</ThemedText>
      </Pressable>

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




