import { supabase } from ".."

export const login = async (credentials: ICredentials) => {
	const response: ISuapaResponse = { status: false, message: "", data: null }
	try {
		const { data, error } = await supabase.auth.signInWithPassword(credentials)
		if (error) {
			response.message = error.message
		} else {
			response.status = true
		}
	} catch (_) {
		console.log(_)
	}
	return response;
}

export const register = async (credentials: ICredentials) => {
	const response: ISuapaResponse = { status: false, message: "", data: null }
	try {
		const { data, error } = await supabase.auth.signUp(credentials)
		if (error) {
			response.message = error.message
		} else {
			response.status = true
		}
	} catch (_) {
		console.log(_)
	}
	return response;
}