function minutesUntil420() {
  const now = new Date();
  const target = new Date();

  target.setHours(16, 20, 0, 0); // Set target time to 4:20 PM

  // If the current time is after 4:20 PM, set target to 4:20 PM the next day
  if (now > target) {
    target.setDate(target.getDate() + 1);
  }

  const diffInMilliseconds = target - now;
  const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60);

 return diffInMinutes;
}

export default minutesUntil420;