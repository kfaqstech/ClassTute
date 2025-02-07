export const localTime = (timeString: string) => {
  try {
    if (!timeString) return ""
    const date = new Date(`1970-01-01T${timeString}`);
    return date.toLocaleTimeString('en-US', {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });
  } catch (_) {
    return ""
  }

}
