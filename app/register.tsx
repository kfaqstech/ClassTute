import React, { useState } from 'react';
import { register } from '@/libs/supabase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextBox from '@/components/shared/TextBox';
import TextButton from '@/components/shared/TextButton';
import { router } from 'expo-router';
import { Alert, Pressable, Text, View, StyleSheet, Platform } from 'react-native';

const Register = () => {
  const [credential, setCredential] = useState({
    email: "",
    password: ""
  });

  // const doRegister = async () => {
  //   const { status, message } = await register(credential);
  //   if (status) {
  //     router.replace('/');
  //   } else {
  //     Alert.alert("Register Failed", message);
  //   }
  // };


  const doRegister = async () => {
    const { status, message } = await register(credential);
    if (status) {
      Alert.alert(
        "Account Created",
        "Please check your email for OTP to verify your account.",
        [
          {
            text: "OK",
            onPress: () => router.replace('/verify')  // Redirect to the verification page
          }
        ]
      );
    } else {
      Alert.alert("Register Failed", message);
    }
  };


  const login = () => {
    router.replace('/login');
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
          title="Register"
          onPress={doRegister}
          style={styles.button}
        />

       
      </View>
      <Pressable onPress={login} className={pressableStyle}>
          <Text className="text-gray-700 font-medium text-base">Already have an account? Login</Text>
        </Pressable>
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
  button: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  pressable: {
    alignItems: 'center'
  },

});

export default Register;



