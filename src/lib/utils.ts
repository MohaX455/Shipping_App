// Fonctions utilitaires - placeholder pour futures extensions

export function formatDate(createdAt: string): string {
  const currentDate = new Date();
  const createdAtDate = new Date(createdAt);
  const timeDifference = currentDate.getTime() - createdAtDate.getTime();

  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  if (daysDifference > 0) {
    return `Created last ${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`;
  }
  if (hoursDifference > 0) {
    return `Created last ${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"} ago`;
  }
  if (minutesDifference > 0) {
    return `Created last ${minutesDifference} ${minutesDifference === 1 ? "minute" : "minutes"} ago`;
  }
  return `Created last ${secondsDifference} ${secondsDifference === 1 ? "second" : "seconds"} ago`;
}

export function formatDateByMonth(createdAt: string): string {
  const date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
