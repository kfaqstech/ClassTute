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

export const logout = async () => {
	const response: ISuapaResponse = { status: false, message: "", data: null };
	try {
		const { error } = await supabase.auth.signOut();
		if (error) {
			response.message = error.message;
		} else {
			response.status = true;
		}
	} catch (_) {
		console.log(_);
	}
	return response;
};

export const updateProfile = async (uid: string, payload: any) => {
	const response: ISuapaResponse = { status: false, message: "", data: null }
	try {
		const { data, error } = await supabase.from("profiles").update(payload).eq('id', uid).select('*')
		if (data) {
			response.status = true
			response.message = 'Profile Updated Successfully!'
			response.data(data[0])
		}
		if (error) response.message = error.message
	} catch (_) {
		console.log(_);
	}
	return response;
}

export const updateProfileImage = async (uid: string, file: any) => {
	const response: ISuapaResponse = { status: false, message: "", data: null }
	debugger

	try {
		const { data, error } = await supabase.storage.from('classtute-public').upload(`profile/${uid}.png`, file, {
			upsert: true,
			contentType: 'image/png',
		});
		debugger

		if (data) {
			response.status = true
			response.message = 'Image Uploaded Successfully!'
			response.data = data
		}
		if (error) response.message = error.message
	} catch (_) {
		console.log(_);
	}
	return response;
}
