import React, { useState } from 'react';
import { login } from '@/libs/supabase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextBox from '@/components/shared/TextBox';
import TextButton from '@/components/shared/TextButton';
import { router } from 'expo-router';
import { Alert, Pressable, Text, View, StyleSheet, Platform } from 'react-native';

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
  ? 'w-full max-w-[330px] flex-row justify-end'
  : 'absolute bottom-0 h-[50] w-full max-w-[360px] flex-row justify-center items-center bg-white';
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextBox
          placeholder="Email"
          value={credential.email}
          onChangeText={(text) => setCredential({ ...credential, email: text })}
          style={styles.textBox}
        />

        <TextBox
          placeholder="Password"
          value={credential.password}
          secureTextEntry={true}
          onChangeText={(text) => setCredential({ ...credential, password: text })}
          style={styles.textBox}
        />

        <TextButton
          title="Login"
          onPress={doLogin}
          style={styles.loginButton}
        />

        
      </View>

      <Pressable onPress={register} className={pressableStyle}>
          <Text className="text-gray-700 font-medium text-base">Don't have an account? Register</Text>

        </Pressable>
        <Text className="text-gray-700 font-medium text-base" onPress={()=>router.replace("/forgot-password")}>Forgot Password</Text>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  inputContainer: {
    width: 330,
    maxWidth: 350,
    padding: 15,
  
  },
  textBox: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16
  },
  loginButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerLink: {
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    color: '#007BFF',
    fontSize: 16,
  }
});

export default Login;
