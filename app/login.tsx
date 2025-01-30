import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native-gesture-handler'
import { login } from '@/libs/supabase/auth'

const Login = () => {
    const [credential, setCredential] = useState({
        email: "rehankhan67.dev@gmail.com",
        password: "Test@123"
    })
    const doLogin = async () => {
        await login(credential)
    }
    return (
        <View className='bg-black'>

            <Pressable onPress={doLogin} className='border'> <Text>login</Text></Pressable>
        </View>
    )
}

export default Login