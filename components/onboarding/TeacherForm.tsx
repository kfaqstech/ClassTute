import React from 'react'
import { ThemedView } from '../ThemedView'
import TextButton from '../shared/TextButton'

import { useForm, Controller } from "react-hook-form";
import TextBox from '../shared/TextBox';

const TeacherForm = () => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: ""
    },
  });


  const save = () => {

  }

  return (
    <ThemedView>
      <ThemedView className='w-full'>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextBox
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter first name"
          />
        )}
        name="first_name"
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextBox
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter last name"
          />
        )}
        name="last_name"
      />
      </ThemedView>
      <ThemedView className='w-full'>
        <TextButton title='Save' onPress={save} />
      </ThemedView>
    </ThemedView>
  )
}

export default TeacherForm