import React, { Fragment, useState } from 'react'
import { Image, Pressable, Platform } from 'react-native'
import { notify } from '@/libs/notify';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

interface ImageInputProps {
  onSelect: (result: any) => void;
  varient?: 'default' | 'avatar';
  output?: 'base64' | 'blob' | 'file';
  value?: string;
  outerClass?: string;
  innerClass?: string;
  format?: 'png'
}

const ImageInput = (props: ImageInputProps) => {
  const { onSelect, varient = 'default', output, value, outerClass, innerClass, format } = props;
  const [uri, setUri] = useState(value || '')
  console.log(uri)

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        notify("Permission", "Media permission required!", 'warning')
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setUri(result.assets[0].uri)
      const data = await getResult(result.assets[0].uri)
      onSelect(data)
    } else {
      setUri(value || '')
      onSelect(null)
    }
  }

  const getResult = async (asset: any) => {
    if (output === 'base64') {
      return asset
    }
    if (output === 'blob') {
      const response = await fetch(asset);
      return await response.blob();
    }
  }

  const convert = async (selectedImage: string) => {
    const pngImage = await ImageManipulator.manipulateAsync(
      selectedImage,
      [],
      { format: ImageManipulator.SaveFormat.PNG }
    );
  }

  return (
    <Fragment>
      {
        varient === 'default' && (
          <Pressable className={`${outerClass}`} onPress={pickImage}>
            {
              uri ? (
                <Image source={{ uri: uri }} />
              ) : (
                <MaterialCommunityIcons name="camera-plus" size={24} color="black" />
              )
            }
          </Pressable>
        )
      }
      {
        varient === 'avatar' && (
          <Pressable
            className={`border border-dashed rounded-full h-20 w-20 items-center justify-center ${outerClass}`}
            onPress={pickImage}>
            {
              uri ? (
                <Image source={{ uri: uri }} className='h-20 w-20 rounded-full' />
              ) : (
                <MaterialCommunityIcons name="camera-plus" size={24} color="black" />
              )
            }
          </Pressable>
        )
      }
    </Fragment>
  )
}

export default ImageInput