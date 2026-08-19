//link: https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDate(date, format) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new Error("invalid date");
  }
  const day = ("0" + String(date.getDate())).slice(-2);
  console.log("day: ", day);
  const month = ("0" + String(date.getMonth() + 1)).slice(-2);
  console.log("month: ", month);
  const year = date.getFullYear();
  console.log("year: ", year);

  switch (format) {
    case "DD/MM/YYYY": {
      return `${day}/${month}/${year}`;
    }
    case "YYYY-MM-DD": {
      return `${year}-${month}-${day}`;
    }

    case "Month DD, YYYY": {
      return `${months[month - 1]} ${day}, ${year}`;
    }

    case "relative": {
      const currentTime = new Date();
      const diff = currentTime.getTime() - date.getTime();
      const relativeTime = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (relativeTime === 0) return "Today";
      if (relativeTime === 1) return "1 day ago";
      if (relativeTime > 1) {
        return `${relativeTime} days ago`;
      }
    }

    default: {
      throw new Error("invalid format");
    }
  }
}

const date = formatDate(new Date("2026-08-18"), "relative");

console.log("date: ", date);
