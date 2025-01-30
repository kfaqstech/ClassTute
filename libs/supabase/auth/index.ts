import { supabase } from ".."

export const login = async (credentials: ICredentials) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword(credentials)
        console.log(data)
        return data
    } catch (_) {
        console.log(_)
    }
}