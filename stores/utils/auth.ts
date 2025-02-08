export const getProfileUrl = (uid: string) => {
  const baseUrl = process.env.EXPO_PUBLIC_STORAGE_URL_PUBLIC
  return `${baseUrl}/profile/${uid}.png`
}