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
  { value: "LONGBEACH", label: "LONGBEACH" },
  { value: "MAHER", label: "MAHER" },
  { value: "WASHINGTON", label: "WASHINGTON" },
  { value: "WBCT", label: "WBCT" },
];

const queue = [
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
  }
];

const terminalRefType = [
  {
    label: "Container",
    value: "CONTAINER",
  }
];

export const getCarriersList = (mode: string) => {
  return mode === "air"
    ? airCarriers
    : mode === "ocean"
    ? oceanCarriers
    : terminalCarriers;
};

export const getQueueList = () => {
  return queue;
};

export const getRefList = (mode: string) => {
  return mode === "air"
    ? airRefType
    : mode === "ocean"
    ? oceanRefType
    : terminalRefType;
};
