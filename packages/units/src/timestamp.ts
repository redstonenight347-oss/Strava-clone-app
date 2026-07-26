export function toTimestamp(date: string, time: string): Date {
  return new Date(`${date}T${time}:00`)
}

export function toDateAndTime(Timestamp: Date): string[] {
  const timestamp = Timestamp.toISOString().split('T')
  const date = timestamp[0]
  const time = timestamp[1].slice(0, 5)
  
  return [date, " ", time]
}

export function formatDateAndTime(timestamp: Date | string, timeFormat?: "12h" | "24h" | string): { date: string, time: string } {
  const dateObj = new Date(timestamp);
  const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()}`;
  const formattedTime = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: timeFormat === '12h'
  });
  
  return { date: formattedDate, time: formattedTime };
}