import React, { useState } from "react";
import { View, Alert ,StyleSheet, TextInput} from "react-native";
import { router, useRouter } from "expo-router";
import TextButton from "@/components/shared/TextButton";
import TextBox from "@/components/shared/TextBox";
import { supabase } from "@/libs/supabase";


export default function AccountConfirmationPage() {
    const [email, setEmail] = useState("");


    const sendVerification = async () => {
      if (email) {
        try {
          const { error } = await supabase.auth.resend({
            email,
            type: "signup",  // Specify this is for signup email confirmation
          });
  
          if (error) {
            Alert.alert("Error", error.message);
          } else {
            Alert.alert("Success", "Verification email sent.");

            router.push("/verify");
          }
        } catch (error) {
          Alert.alert("Error", "Something went wrong. Please try again.");
        }
      } else {
        Alert.alert("Authentication", "Please enter your email.");
      }
    };
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
        
     
        <TextButton title="Send Verification Code" onPress={sendVerification} style={styles.button} />
        <TextButton
        title="Cancel"
        onPress={() => router.replace("/login")}
        style={styles.button2}

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