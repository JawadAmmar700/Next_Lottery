// export const setDrawDate = (currentDrawDate: string) => {
//   let nextDrawDate = "";
//   if (currentDrawDate.toLocaleLowerCase() === "monday") {
//     const nextThursday = getNextThursday();
//     const splitThurs = nextThursday.split("/");
//     nextDrawDate = `${splitThurs[2]}-${splitThurs[0]}-${splitThurs[1]}T19:30`;
//   }
//   if (currentDrawDate.toLocaleLowerCase() === "thursday") {
//     const nextMonday = getNextMonday();
//     const splitMon = nextMonday.split("/");
//     nextDrawDate = `${splitMon[2]}-${splitMon[0]}-${splitMon[1]}T19:30`;
//   }

//   const date = new Date(nextDrawDate);
//   const unixTimestamp = Math.floor(date.getTime() / 1000);

//   return unixTimestamp;
// };

function getNextMonday(date = new Date()) {
  const dateCopy = new Date(date.getTime());

  const nextMonday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7)
    )
  );
  return nextMonday.toLocaleDateString();
}

function getNextThursday(date = new Date()) {
  const dateCopy = new Date(date.getTime());

  const nextThursday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() - 3) % 4 || 4)
    )
  );

  return nextThursday.toLocaleDateString();
}

export function getLastDayOccurence(date: Date, day: string) {
  const d = new Date(date.getTime());
  const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  if (days.includes(day)) {
    const modifier = (d.getDay() + days.length - days.indexOf(day)) % 7 || 7;
    d.setDate(d.getDate() - modifier);
  }
  return d;
}

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
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T19:30`
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
  const nextMondayDrawDate = `${splitMon[2]}-${splitMon[0]}-${splitMon[1]}T19:30`;
  const nextThursdayDrawDate = `${splitThurs[2]}-${splitThurs[0]}-${splitThurs[1]}T19:30`;
  const nextMondayDate = new Date(nextMondayDrawDate);
  const nextThursdayDate = new Date(nextThursdayDrawDate);
  const currentUnixTimestamp = date.getTime();
  const nextMondayUnixTimestamp = nextMondayDate.getTime();
  const nextThursdayUnixTimestamp = nextThursdayDate.getTime();

  const lastThursday = getLastDayOccurence(new Date(), "Thurs");
  const lastMonday = getLastDayOccurence(new Date(), "Mon");
  const lastMondayUnixTimestamp = lastMonday.getTime();
  const lastThursdayUnixTimestamp = lastThursday.getTime();

  if (
    currentUnixTimestamp >= lastMondayUnixTimestamp &&
    currentUnixTimestamp < nextThursdayUnixTimestamp
  ) {
    return nextThursdayUnixTimestamp - currentUnixTimestamp;
  }
  if (
    currentUnixTimestamp >= lastThursdayUnixTimestamp &&
    currentUnixTimestamp < nextMondayUnixTimestamp
  ) {
    return nextMondayUnixTimestamp - currentUnixTimestamp;
  }
};

// export default getDrawDate;
