function formatMilliseconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const remainderMilliseconds = milliseconds % 1000;
  
    // Pad the seconds with leading zero if less than 10
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
    // Format the remainder milliseconds
    const formattedMilliseconds = remainderMilliseconds.toString().padStart(3, '0');
    const hasNonZero = formattedMilliseconds.match(/[^0]/);
    return `${minutes}min ${formattedSeconds}s${hasNonZero ? ` & ${formattedMilliseconds}ms` : ''}`;
  }