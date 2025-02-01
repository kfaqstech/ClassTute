import React from 'react'
import { ThemedView } from '../ThemedView'
import TextButton from '../shared/TextButton'

import { useForm, Controller } from "react-hook-form";

const StudentForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const save = () => {

  }
  return (
    <ThemedView>
      <ThemedView className='w-full'>
        <TextButton title='Save' onPress={save} />
      </ThemedView>
    </ThemedView>
  )
}

export default StudentForm