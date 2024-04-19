const oceanCarriers = [
  { value: "ACL" },
  { value: "ARKAS" },
  { value: "CMA-CGM" },
  { value: "COSCO" },
  { value: "CROWLEY" },
  { value: "CU-LINES" },
  { value: "EVERGREEN" },
  { value: "GOLDSTAR" },
  { value: "HAMBURG-SUD" },
  { value: "HAPAG" },
  { value: "HEUNGA" },
  { value: "HELLMANN" },
  { value: "HYUNDAI" },
  { value: "INTERASIA" },
  { value: "JINJIANG" },
  { value: "KMTC" },
  { value: "KUEHNE-NAGEL" },
  { value: "MAERSK" },
  { value: "MARFRET" },
  { value: "MATSON" },
  { value: "MSC" },
  { value: "OOCL" },
  { value: "ONE" },
  { value: "PANCON" },
  { value: "PIL" },
  { value: "RCL" },
  { value: "SAMUDERA" },
  { value: "SINOKOR" },
  { value: "SM-LINE" },
  { value: "SITC" },
  { value: "SWIRE" },
  { value: "TOTE" },
  { value: "TROPICAL" },
  { value: "TS-LINES" },
  { value: "TURKON" },
  { value: "WANHAILINES" },
  { value: "WESTWOOD" },
  { value: "YANG-MING" },
  { value: "ZIM" },
];

const airCarriers = [
  { value: "AIRCANADA" },
  { value: "AIRCHINAAIRLINES" },
  { value: "AIRFRANCE" },
  { value: "ALLNIPPONAIRWAYS" },
  { value: "AMERICANAIRLINES" },
  { value: "AMERJEETAIRLINES" },
  { value: "ASIANAAIRLINES" },
  { value: "ATLASAIR" },
  { value: "AVIANCA" },
  { value: "BELGIUMAIRWAYS" },
  { value: "BRITISHAIRWAYS" },
  { value: "CARGOLUX" },
  { value: "CATHAY" },
  { value: "CHINAAIRLINES" },
  { value: "CHINACARGO" },
  { value: "CSN" },
  { value: "DELTAAIRLINES" },
  { value: "DHLAVIATION" },
  { value: "EMIRATESCARGO" },
  { value: "EVAAIRWAYS" },
  { value: "FINNAIR" },
  { value: "ICELANDAIR" },
  { value: "ISRAELAIRLINES" },
  { value: "JAPANAIRLINES" },
  { value: "KALITTAAIRLINES" },
  { value: "KLMCARGO" },
  { value: "KOREANAIRLINES" },
  { value: "LATAMAIRLINES" },
  { value: "MASAIR" },
  { value: "NIPPONAIRLINES" },
  { value: "POLARCARGO" },
  { value: "QANTASAIRWAYS" },
  { value: "QATAR" },
  { value: "SCANDINAVIANAIRLINES" },
  { value: "SILKAIRLINES" },
  { value: "SINGAPOREAIRLINES" },
  { value: "UNITEDAIRLINES" },
  { value: "UPS" },
  { value: "VIRGINATLANTIC" },
];

const terminalCarriers = [
  { value: "LONGBEACH" },
  { value: "MAHER" },
  { value: "WASHINGTON" },
  { value: "WBCT" },
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

const refType = [
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

export const getCarriersList = (mode: string) => {
    return (mode === "air" ? airCarriers : mode === "ocean" ? oceanCarriers : terminalCarriers);
}

export const getQueueList = () => {
    return queue;
}