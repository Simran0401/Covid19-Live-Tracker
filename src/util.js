import numeral from "numeral";

// Sorting the countries in the table based on the number of cases in each country

export const sortData = (data) => {
  const sortedData = [...data]; //Copy the entire array

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

  //   sortedData.sort((a, b) => {
  //     if (a.cases > b.cases) {
  //       return -1;
  //     } else {
  //       return 1;
  //     }
  //   });
  //   return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
