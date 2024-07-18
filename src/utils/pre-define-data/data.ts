const oceanCarriers = [
  { value: "ACL", label: "ACL" },
  { value: "ARKAS", label: "ARKAS" },
  { value: "CMA-CGM", label: "CMA-CGM" },
  { value: "COSCO", label: "COSCO" },
  { value: "CROWLEY", label: "CROWLEY" },
  { value: "CU-LINES", label: "CU-LINES" },
  { value: "EVERGREEN", label: "EVERGREEN" },
  { value: "GOLDSTAR", label: "GOLDSTAR" },
  { value: "HAMBURG-SUD", label: "HAMBURG-SUD" },
  { value: "HAPAG", label: "HAPAG" },
  { value: "HEUNGA", label: "HEUNGA" },
  { value: "HELLMANN", label: "HELLMANN" },
  { value: "HYUNDAI", label: "HYUNDAI" },
  { value: "INTERASIA", label: "INTERASIA" },
  { value: "JINJIANG", label: "JINJIANG" },
  { value: "KMTC", label: "KMTC" },
  { value: "KUEHNE-NAGEL", label: "KUEHNE-NAGEL" },
  { value: "MAERSK", label: "MAERSK" },
  { value: "MARFRET", label: "MARFRET" },
  { value: "MATSON", label: "MATSON" },
  { value: "MSC", label: "MSC" },
  { value: "OOCL", label: "OOCL" },
  { value: "ONE", label: "ONE" },
  { value: "PANCON", label: "PANCON" },
  { value: "PIL", label: "PIL" },
  { value: "RCL", label: "RCL" },
  { value: "SAMUDERA", label: "SAMUDERA" },
  { value: "SINOKOR", label: "SINOKOR" },
  { value: "SM-LINE", label: "SM-LINE" },
  { value: "SITC", label: "SITC" },
  { value: "SWIRE", label: "SWIRE" },
  { value: "TOTE", label: "TOTE" },
  { value: "TROPICAL", label: "TROPICAL" },
  { value: "TS-LINES", label: "TS-LINES" },
  { value: "TURKON", label: "TURKON" },
  { value: "WANHAILINES", label: "WANHAILINES" },
  { value: "WESTWOOD", label: "WESTWOOD" },
  { value: "YANG-MING", label: "YANG-MING" },
  { value: "ZIM", label: "ZIM" },
];

const airCarriers = [
  { value: "AIRCANADA", label: "AIRCANADA" },
  { value: "AIRCHINAAIRLINES", label: "AIRCHINAAIRLINES" },
  { value: "AIRFRANCE", label: "AIRFRANCE" },
  { value: "ALLNIPPONAIRWAYS", label: "ALLNIPPONAIRWAYS" },
  { value: "AMERICANAIRLINES", label: "AMERICANAIRLINES" },
  { value: "AMERJEETAIRLINES", label: "AMERJEETAIRLINES" },
  { value: "ASIANAAIRLINES", label: "ASIANAAIRLINES" },
  { value: "ATLASAIR", label: "ATLASAIR" },
  { value: "AVIANCA", label: "AVIANCA" },
  { value: "BELGIUMAIRWAYS", label: "BELGIUMAIRWAYS" },
  { value: "BRITISHAIRWAYS", label: "BRITISHAIRWAYS" },
  { value: "CARGOLUX", label: "CARGOLUX" },
  { value: "CATHAY", label: "CATHAY" },
  { value: "CHINAAIRLINES", label: "CHINAAIRLINES" },
  { value: "CHINACARGO", label: "CHINACARGO" },
  { value: "CSN", label: "CSN" },
  { value: "DELTAAIRLINES", label: "DELTAAIRLINES" },
  { value: "DHLAVIATION", label: "DHLAVIATION" },
  { value: "EMIRATESCARGO", label: "EMIRATESCARGO" },
  { value: "EVAAIRWAYS", label: "EVAAIRWAYS" },
  { value: "FINNAIR", label: "FINNAIR" },
  { value: "ICELANDAIR", label: "ICELANDAIR" },
  { value: "ISRAELAIRLINES", label: "ISRAELAIRLINES" },
  { value: "JAPANAIRLINES", label: "JAPANAIRLINES" },
  { value: "KALITTAAIRLINES", label: "KALITTAAIRLINES" },
  { value: "KLMCARGO", label: "KLMCARGO" },
  { value: "KOREANAIRLINES", label: "KOREANAIRLINES" },
  { value: "LATAMAIRLINES", label: "LATAMAIRLINES" },
  { value: "MASAIR", label: "MASAIR" },
  { value: "NIPPONAIRLINES", label: "NIPPONAIRLINES" },
  { value: "POLARCARGO", label: "POLARCARGO" },
  { value: "QANTASAIRWAYS", label: "QANTASAIRWAYS" },
  { value: "QATAR", label: "QATAR" },
  { value: "SCANDINAVIANAIRLINES", label: "SCANDINAVIANAIRLINES" },
  { value: "SILKAIRLINES", label: "SILKAIRLINES" },
  { value: "SINGAPOREAIRLINES", label: "SINGAPOREAIRLINES" },
  { value: "UNITEDAIRLINES", label: "UNITEDAIRLINES" },
  { value: "UPS", label: "UPS" },
  { value: "VIRGINATLANTIC", label: "VIRGINATLANTIC" },
];

const terminalCarriers = [
  { value: "WBCT", label: "WBCT" },
  { value: "FENIX", label: "FENIX" },
  { value: "HUSKY", label: "HUSKY" },
  { value: "MAHER", label: "MAHER" },
  { value: "CONLEY", label: "CONLEY" },
  { value: "POMTOC", label: "POMTOC" },
  { value: "BAYPORT", label: "BAYPORT" },
  { value: "NORFOLK", label: "NORFOLK" },
  { value: "LONGBEACH", label: "LONGBEACH" },
  { value: "WASHINGTON", label: "WASHINGTON" },
  { value: "BARBOURSCUT", label: "BARBOURSCUT" },
  { value: "PORTOFTAMPA", label: "PORTOFTAMPA" },
  { value: "BLOUNTISLAND", label: "BLOUNTISLAND" },
  { value: "ITSLONGBEACH", label: "ITSLONGBEACH" },
  { value: "SEAGIRTMARINE", label: "SEAGIRTMARINE" },
  { value: "SSATERMINAL18", label: "SSATERMINAL18" },
  { value: "SSATERMINAL30", label: "SSATERMINAL30" },
  { value: "NAPOLEONAVENUE", label: "NAPOLEONAVENUE" },
  { value: "TOTALTERMINALS", label: "TOTALTERMINALS" },
  { value: "PACIFICCONTAINER", label: "PACIFICCONTAINER" },
  { value: "SSATERMINALPIERA", label: "SSATERMINALPIERA" },
  { value: "APMTERMINALSMIAMI", label: "APMTERMINALSMIAMI" },
  { value: "APMTERMINALSMOBILE", label: "APMTERMINALSMOBILE" },
  { value: "PORTNEWARKCONTAINER", label: "PORTNEWARKCONTAINER" },
  { value: "APMCONTAINERTERMINAL", label: "APMCONTAINERTERMINAL" },
  { value: "APMTERMINALELIZABETH", label: "APMTERMINALELIZABETH" },
  { value: "FLORIDAINTERNATIONAL", label: "FLORIDAINTERNATIONAL" },
  { value: "OAKLANDINTERNATIONAL", label: "OAKLANDINTERNATIONAL" },
];

const oceanQueue = [
  {
    label: "Normal",
    value: "NORMAL",
  },
  {
    label: "Adaptive",
    value: "ADAPTIVE",
  },
  {
    label: "Reference Not Found",
    value: "RNF",
  },
];

const commonQueue = [
  {
    label: "Normal",
    value: "NORMAL",
  },
  {
    label: "Reference Not Found",
    value: "RNF",
  },
];

const oceanRefType = [
  {
    label: "Booking",
    value: "BOOKING",
  },
  {
    label: "BillOfLading",
    value: "BILLOFLADING",
  },
  {
    label: "Container",
    value: "CONTAINER",
  },
];

const airRefType = [
  {
    label: "AWB",
    value: "AWB",
  },
];

const terminalRefType = [
  {
    label: "Container",
    value: "CONTAINER",
  },
];

const historyType = [
  {
    label: "ALL",
    value: "ALL",
  },
  {
    label: "DIFF",
    value: "DIFF",
  },
];

const months = [
  {
    label: "January",
    value: "January",
  },
  {
    label: "February",
    value: "February",
  },
  {
    label: "March",
    value: "March",
  },
  {
    label: "April",
    value: "April",
  },
  {
    label: "May",
    value: "May",
  },
  {
    label: "June",
    value: "June",
  },
  {
    label: "July",
    value: "July",
  },
  {
    label: "August",
    value: "August",
  },
  {
    label: "September",
    value: "September",
  },
  {
    label: "October",
    value: "October",
  },
  {
    label: "November",
    value: "November",
  },
  {
    label: "December",
    value: "December",
  },
];

const year = [
  {
    label: "2024",
    value: "2024",
  },
];

const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];

export const getCarriersList = (mode: string) => {
  return mode === "air" ? airCarriers : mode === "ocean" ? oceanCarriers : mode === "terminal" ? terminalCarriers : [];
};

export const getQueueList = (mode: string) => {
  return mode === "ocean" ? oceanQueue : commonQueue;
};

export const getHistoryType = () => {
  return historyType;
};

export const getRefList = (mode: string) => {
  return mode === "air" ? airRefType : mode === "ocean" ? oceanRefType : terminalRefType;
};

export const getMonthList = (year: string) => {
  const years = ["2024"];
  const currentMonth = new Date().getMonth();
  // Check if current date is 2nd or later in the current month
  const includeCurrentMonth = new Date().getDate() >= 2;
  if (year === years[0]) {
    if (includeCurrentMonth) {
      return months.slice(0, currentMonth + 1);
    } else {
      return months.slice(0, currentMonth);
    }
  } else {
    return months;
  }
};

export const getYearList = () => {
  return year;
};

export const getDaysList = () => {
  return days;
};
