const wrapPadStart = (str: string) => str.padStart(2, "0");

const getNextDay = function (dayName: string) {
  const date = new Date();
  const now = date.getDay();

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  let day = days.indexOf(dayName.toLowerCase());

  let diff = day - now;

  let current_date_with_time = new Date(
    `${date.getFullYear()}-${wrapPadStart(
      (date.getMonth() + 1).toString()
    )}-${wrapPadStart(date.getDate().toString())}T19:30`
  );
  let DayTimestamp =
    current_date_with_time.getTime() + 1000 * 60 * 60 * 24 * diff;

  if (Date.now() < DayTimestamp) {
    return new Date(DayTimestamp).toLocaleDateString();
  }
  diff = diff < 1 ? 7 + diff : diff;
  let nextDayTimestamp = date.getTime() + 1000 * 60 * 60 * 24 * diff;

  return new Date(nextDayTimestamp).toLocaleDateString();
};

export const getDrawDate = (): any => {
  const date = new Date();
  const nextMonday = getNextDay("monday");
  const nextThursday = getNextDay("thursday");
  const splitMon = nextMonday.split("/");
  const splitThurs = nextThursday.split("/");
  const nextMondayDrawDate = `${splitMon[2]}-${wrapPadStart(
    splitMon[0]
  )}-${wrapPadStart(splitMon[1])}T19:30`;
  const nextThursdayDrawDate = `${splitThurs[2]}-${wrapPadStart(
    splitThurs[0]
  )}-${wrapPadStart(splitThurs[1])}T19:30`;
  const nextMondayDate = new Date(nextMondayDrawDate);
  const nextThursdayDate = new Date(nextThursdayDrawDate);
  const currentUnixTimestamp = date.getTime();
  const nextMondayUnixTimestamp = nextMondayDate.getTime();
  const nextThursdayUnixTimestamp = nextThursdayDate.getTime();

  if (nextMondayUnixTimestamp < nextThursdayUnixTimestamp) {
    return nextMondayUnixTimestamp - currentUnixTimestamp;
  } else {
    return nextThursdayUnixTimestamp - currentUnixTimestamp;
  }
};

export default getDrawDate;
