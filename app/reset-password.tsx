import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/libs/supabase";
import TextButton from "@/components/shared/TextButton";

export default function ResetPasswordPage() {
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const verifyOtp = async () => {
    const email = await AsyncStorage.getItem("user-email");
    if (!email) {
      alert("Authentication: This session has been expired!");
    } else if (!token) {
      alert("Authentication: Please enter OTP!");
    } else {
      setLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: token,
        type: "recovery",
      });
      setLoading(false);
      if (error) {
        alert(`Authentication: ${error.message}`);
      } else {
        setIsVerified(true);
      }
    }
  };

  const resetPassword = async () => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Authentication: Password Mismatch");
      } else {
        setLoading(true);
        const { error } = await supabase.auth.updateUser({
          password: password,
        });
        setLoading(false);
        if (error) {
          alert(`Authentication: ${error.message}`);
        } else {
          await AsyncStorage.removeItem("user-email");
          alert("Authentication: Reset successfully!");
          router.replace("/login");
        }
      }
    } else {
      alert("Authentication: Please enter password & confirm password");
    }
  };

  return (
    <View className="flex flex-col gap-2">
      {isVerified ? (
        <>
          <View>
            <TextInput
              style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
              onChangeText={(value) => setPassword(value)}
              value={password}
              placeholder="Enter new password"
              secureTextEntry={true}
            />
          </View>
          <View>
            <TextInput
              style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
              onChangeText={(value) => setConfirmPassword(value)}
              value={confirmPassword}
              placeholder="Enter confirm password"
              secureTextEntry={true}
            />
          </View>
        </>
      ) : (
        <View>
          <TextInput
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            onChangeText={(value) => setToken(value)}
            value={token}
            placeholder="Please Enter OTP"
            keyboardType="numeric"
          />
        </View>
      )}

      <View className="gap-2 mt-4">
        {isVerified ? (
          <TextButton
           title="Reset"
            disabled={loading}
            onPress={resetPassword}
          />
       
        ) : (
          <TextButton title="Verify" disabled={loading} onPress={verifyOtp}/>
          
        )}

        <TextButton
          className="bg-background-quaternary"
          title="Cancel"
          disabled={loading}
          onPress={() => router.push("/login")}
        />
        
      </View>
    </View>
  );
}
