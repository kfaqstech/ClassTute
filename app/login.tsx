import React, { useState } from 'react'
import { login } from '@/libs/supabase/auth'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextBox from '@/components/shared/TextBox'
import TextButton from '@/components/shared/TextButton'
import { router } from 'expo-router'
import { Alert } from 'react-native'

const Login = () => {
	const [credential, setCredential] = useState({
		email: "rehankhan67.dev@gmail.com",
		password: "Test@123"
	})

	const doLogin = async () => {
		const { status, message } = await login(credential);
		if (status) {
			router.replace('/')
		} else {
			Alert.alert("Login", message)
		}
	}

	return (
		<SafeAreaView>
			<ThemedView className='p-4 gap-4 h-full items-center justify-center'>
				<ThemedView className='gap-4 w-full'>
					<TextBox placeholder='Email' value={credential.email} onChangeText={(text: string) => setCredential({ ...credential, email: text })} />
					<TextBox placeholder='Password' value={credential.password} secureTextEntry={true} onChangeText={(text: string) => setCredential({ ...credential, password: text })} />
				</ThemedView>
				<ThemedView className='w-full'>
					<TextButton title='Login' onPress={doLogin} />
				</ThemedView>
			</ThemedView>
		</SafeAreaView>

	)
}

export default Login