import { Alert, Platform } from "react-native";
export const notify = (title: string, message: string, status: 'success' | 'warning' | 'error', native: boolean = true) => {

    if (Platform.OS === 'web') {
        alert(message)
    } else {
        Alert.alert(title, message)
    }
}