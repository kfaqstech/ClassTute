import { useMutation, useQuery } from '@tanstack/react-query'
import { supabase } from '..'

export const fetchProfile = async () => {
  const { data } = await supabase.from('profiles').select('*')
  return data
}

export const updateProfile = async (profileData:any) => {
  const { data, error } = await supabase.from('profiles').upsert(profileData)
  if (error) throw new Error(error.message)
  return data
}

export const useFetchProfile = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: fetchProfile,
  })
}

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  })
}