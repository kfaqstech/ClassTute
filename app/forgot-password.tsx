import React, { useState } from "react";
import { View, Alert ,StyleSheet} from "react-native";
import { useRouter } from "expo-router";
import { TextInput, Button, Text } from "react-native";
import { supabase } from "@/libs/supabase";
import TextButton from "@/components/shared/TextButton";


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function sendResetEmail() {
    if (!email) {
      Alert.alert("Authentication", "Please enter your email");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Reset code sent to your email");
      router.replace("/reset-password");
    }
  }
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderBottomWidth: 1,
          marginBottom: 20,
          padding: 10,
          fontSize: 16,
        }}
      />

      <TextButton title="Send Reset Code" onPress={sendResetEmail} disabled={loading} style={styles.button} />
      <TextButton
        title="Cancel"
        onPress={() => router.push("/login")}
        style={styles.button2}
        disabled={loading}
      />
    </View>
  );
}


const styles= StyleSheet.create({

    button: {
        backgroundColor: '#0000FF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
      }
,   button2: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  }



})