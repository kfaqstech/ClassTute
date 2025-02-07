



import React, { useState } from 'react';
import { login } from '@/libs/supabase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextBox from '@/components/shared/TextBox';
import TextButton from '@/components/shared/TextButton';
import { router } from 'expo-router';
import { Alert, ImageBackground, Platform, Pressable, Text,} from 'react-native';

const Login = () => {
  const [credential, setCredential] = useState({
    email: "rehankhan67.dev@gmail.com",
    password: "Test@123"
  });

  const doLogin = async () => {
    const { status, message } = await login(credential);
    if (status) {
      router.replace('/');
    } else {
      Alert.alert('Login Failed', message);
    }
  };

  const register = () => {
    router.replace('/register');
  };


  const pressableStyle = Platform.OS === 'web'
    ? 'mt-4 w-full max-w-[330px] flex-row justify-end'
    : 'absolute bottom-0 h-[50] w-full max-w-[360px] flex-row justify-center items-center bg-white';

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        resizeMode="cover"
        className="flex-1 justify-center items-center w-full h-full"
        style={{ width: "100%", height: "100%" }}
      >
        <TextBox
          placeholder="Email"
          value={credential.email}
          onChangeText={(text) => setCredential({ ...credential, email: text })}
          className="bg-white p-4 rounded-lg w-[330] max-w-[350px] mb-[20] text-base shadow-lg"
        />

        <TextBox
          placeholder="Password"
          value={credential.password}
          secureTextEntry={true}
          onChangeText={(text) => setCredential({ ...credential, password: text })}
          className="bg-white p-4 rounded-lg w-[330] max-w-[350px] mb-[40] text-base shadow-lg"
        />

        <TextButton
          title="Login"
          onPress={doLogin}
          className="bg-gray-700  p-4 rounded-lg w-[330] max-w-[350px] text-white text-center font-semibold shadow-lg"
        />

        <Pressable onPress={register} className={pressableStyle}>
          <Text className="text-gray-700 font-medium text-base">Don't have an account? Register</Text>
        </Pressable>


      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;
