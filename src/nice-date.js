const getOrdinalSuffix = day => {
  const j = day % 10,
    k = day % 100;
  if (j == 1 && k != 11) {
    return day + 'st';
  }
  if (j == 2 && k != 12) {
    return day + 'nd';
  }
  if (j == 3 && k != 13) {
    return day + 'rd';
  }
  return day + 'th';
};
const dateToMyLocale = date => {
  if (!date) {
    throw new Error('Invalid Date');
  }
  if (typeof date === 'string') {
    date = new Date(date);
  }
  let g = date.toLocaleString('en-US', {
    timeZone: 'America/New_York',
  });

  let gg = new Date(g);
  return gg;
}
const formatDateToNice = d => {
  let date = dateToMyLocale(d);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  const second = date.getSeconds();
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${months[monthIndex]} ${getOrdinalSuffix(day)}, ${year}, ${hour}:${minute.toString().padStart(2, '0')} ${ampm} & ${second}s`;
};

const getDateTime = () => {
  try {
    let d = new Date();
    return formatDate(d);
  } catch (e) {
    console.log(e);
    return 'error';
  }
};
export {formatDateToNice, getDateTime};
