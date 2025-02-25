

import React, { useState, useRef } from "react";
import { Alert, TextInput, View , StyleSheet} from "react-native";
import { useRouter } from "expo-router";
import TextButton from "@/components/shared/TextButton";
import { supabase } from "@/libs/supabase";

export default function Verify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();

  
  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }

    
    if (!value && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  
  const verifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      const { error } = await supabase.auth.verifyOtp({
        email: "user-email",
        token: otpString,
        type: "signup",
      });

      if (error) {
        Alert.alert("Verification Failed", error.message);
      } else {
        Alert.alert("Account Verified", "You can now log in.");
        router.replace("/login");
      }
    } else {
      Alert.alert("Invalid OTP", "Please enter a valid OTP.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (otpInputs.current[index] = ref)}
            style={{
                padding:10,
              width: 40,
              height: 50,
              borderBottomWidth: 2,
              textAlign: "center",
              fontSize: 24,
              margin: 5,
              marginBottom: 20,
        
            }}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
                otpInputs.current[index - 1]?.focus();
              }
            }}
          />
        ))}
      </View>

        <TextButton title="Verify" onPress={verifyOtp} style={styles.button}/>
        <TextButton title="Cancel" onPress={() => router.replace("/login")} style={styles.button2}/>
     
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