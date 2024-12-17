const oceanCarriers = [
	{ value: "ACL", label: "ACL" },
	{ value: "ALIANCA", label: "ALIANCA" },
	{ value: "ARKAS", label: "ARKAS" },
	{ value: "CARRIERLESS", label: "CARRIERLESS" },
	{ value: "CMA-CGM", label: "CMA-CGM" },
	{ value: "COSCO", label: "COSCO" },
	{ value: "CROWLEY", label: "CROWLEY" },
	{ value: "CU-LINES", label: "CU-LINES" },
	{ value: "EVERGREEN", label: "EVERGREEN" },
	{ value: "GOLDSTAR", label: "GOLDSTAR" },
	{ value: "HAMBURG-SUD", label: "HAMBURG-SUD" },
	{ value: "HAPAG", label: "HAPAG" },
	{ value: "HELLMANN", label: "HELLMANN" },
	{ value: "HEUNGA", label: "HEUNGA" },
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
	{ value: "SINOTRANS", label: "SINOTRANS" },
	{ value: "SITC", label: "SITC" },
	{ value: "SM-LINE", label: "SM-LINE" },
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
	{ value: "AEROMEXICOCARGO", label: "AEROMEXICOCARGO" },
	{ value: "AIRALGERIE", label: "AIRALGERIE" },
	{ value: "AIRCANADA", label: "AIRCANADA" },
	{ value: "AIRCHINAAIRLINES", label: "AIRCHINAAIRLINES" },
	{ value: "AIRFRANCE", label: "AIRFRANCE" },
	{ value: "AIRSERBIA", label: "AIRSERBIA" },
	{ value: "AAIRTAHITINUI", label: "AIRTAHITINUI" },
	{ value: "ALASKAAIRLINES", label: "ALASKAAIRLINES" },
	{ value: "ALITALIA", label: "ALITALIA" },
	{ value: "ALLNIPPONAIRWAYS", label: "ALLNIPPONAIRWAYS" },
	{ value: "AMERICANAIRLINES", label: "AMERICANAIRLINES" },
	{ value: "AMERJEETAIRLINES", label: "AMERJEETAIRLINES" },
	{ value: "ASIANAAIRLINES", label: "ASIANAAIRLINES" },
	{ value: "ATLASAIR", label: "ATLASAIR" },
	{ value: "AVIANCA", label: "AVIANCA" },
	{ value: "AZULBRAZILIAN", label: "AZULBRAZILIAN" },
	{ value: "BELGIUMAIRWAYS", label: "BELGIUMAIRWAYS" },
	{ value: "BRITISHAIRWAYS", label: "BRITISHAIRWAYS" },
	{ value: "CARGOLUX", label: "CARGOLUX" },
	{ value: "CARGOLUXITALIA", label: "CARGOLUXITALIA" },
	{ value: "CATHAY", label: "CATHAY" },
	{ value: "CHINAAIRLINES", label: "CHINAAIRLINES" },
	{ value: "CHINACARGO", label: "CHINACARGO" },
	{ value: "CSN", label: "CSN" },
	{ value: "DELTAAIRLINES", label: "DELTAAIRLINES" },
	{ value: "DHLAVIATION", label: "DHLAVIATION" },
	{ value: "EMIRATESCARGO", label: "EMIRATESCARGO" },
	{ value: "ETHIOPIANAIRLINES", label: "ETHIOPIANAIRLINES" },
	{ value: "ETIHAD", label: "ETIHAD" },
	{ value: "EVAAIRWAYS", label: "EVAAIRWAYS" },
	{ value: "FEDEX", label: "FEDEX" },
	{ value: "FINNAIR", label: "FINNAIR" },
	{ value: "GULF", label: "GULF" },
	{ value: "HONGKONGAIRLINES", label: "HONGKONGAIRLINES" },
	{ value: "HONGKONGCARGOLTD", label: "HONGKONGCARGOLTD" },
	{ value: "IBERIAAIR", label: "IBERIAAIR" },
	{ value: "ICELANDAIR", label: "ICELANDAIR" },
	{ value: "ISRAELAIRLINES", label: "ISRAELAIRLINES" },
	{ value: "JAPANAIRLINES", label: "JAPANAIRLINES" },
	{ value: "KALITTAAIRLINES", label: "KALITTAAIRLINES" },
	{ value: "KLMCARGO", label: "KLMCARGO" },
	{ value: "KOREANAIRLINES", label: "KOREANAIRLINES" },
	{ value: "KUWAITAIRWAYS", label: "KUWAITAIRWAYS" },
	{ value: "LATAMAIRLINES", label: "LATAMAIRLINES" },
	{ value: "LOTPOLISHAIRLINES", label: "LOTPOLISHAIRLINES" },
	{ value: "MASAIR", label: "MASAIR" },
	{ value: "NIPPONAIRLINES", label: "NIPPONAIRLINES" },
	{ value: "POLARCARGO", label: "POLARCARGO" },
	{ value: "QANTASAIRWAYS", label: "QANTASAIRWAYS" },
	{ value: "QATAR", label: "QATAR" },
	{ value: "SAUDIARABIAN", label: "SAUDIARABIAN" },
	{ value: "SCANDINAVIANAIRLINES", label: "SCANDINAVIANAIRLINES" },
	{ value: "SILKAIRLINES", label: "SILKAIRLINES" },
	{ value: "SINGAPOREAIRLINES", label: "SINGAPOREAIRLINES" },
	{ value: "SWISS", label: "SWISS" },
	{ value: "TAMPA", label: "TAMPA" },
	{ value: "TAPAIRPORTUGAL", label: "TAPAIRPORTUGAL" },
	{ value: "UNITEDAIRLINES", label: "UNITEDAIRLINES" },
	{ value: "UPS", label: "UPS" },
	{ value: "UZBEKISTAN", label: "UZBEKISTAN" },
	{ value: "VIETNAM", label: "VIETNAM" },
	{ value: "VIRGINATLANTIC", label: "VIRGINATLANTIC" },
];

const terminalCarriers = [
	{ value: "APMCONTAINERTERMINAL", label: "APMCONTAINERTERMINAL" },
	{ value: "APMTERMINALELIZABETH", label: "APMTERMINALELIZABETH" },
	{ value: "APMTERMINALSMIAMI", label: "APMTERMINALSMIAMI" },
	{ value: "APMTERMINALSMOBILE", label: "APMTERMINALSMOBILE" },
	{ value: "BARBOURSCUT", label: "BARBOURSCUT" },
	{ value: "BAYPORT", label: "BAYPORT" },
	{ value: "BENENUTTER", label: "BENENUTTER" },
	{ value: "BLOUNTISLAND", label: "BLOUNTISLAND" },
	{ value: "CAST", label: "CAST" },
	{ value: "CENTERM", label: "CENTERM" },
	{ value: "CONLEY", label: "CONLEY" },
	{ value: "DELTAPORT", label: "DELTAPORT" },
	{ value: "EVERPORTANGELES", label: "EVERPORTANGELES" },
	{ value: "FENIX", label: "FENIX" },
	{ value: "FLORIDAINTERNATIONAL", label: "FLORIDAINTERNATIONAL" },
	{ value: "FRASERSURREY", label: "FRASERSURREY"},
	{ value: "GARDENCITY", label: "GARDENCITY"},
	{ value: "GCTBAYONNE", label: "GCTBAYONNE"},
	{ value: "GCTNEWYORK", label: "GCTNEWYORK"},
	{ value: "HUSKY", label: "HUSKY" },
	{ value: "ITSLONGBEACH", label: "ITSLONGBEACH" },
	{ value: "LONGBEACH", label: "LONGBEACH" },
	{ value: "MAHER", label: "MAHER" },
	{ value: "MAISONNEUVE", label: "MAISONNEUVE" },
	{ value: "NAPOLEONAVENUE", label: "NAPOLEONAVENUE" },
	{ value: "NORFOLK", label: "NORFOLK" },
	{ value: "OAKLANDINTERNATIONAL", label: "OAKLANDINTERNATIONAL" },
	{ value: "PACIFICCONTAINER", label: "PACIFICCONTAINER" },
	{ value: "PACKERAVENUEMARINE", label: "PACKERAVENUEMARINE" },
	{ value: "PIERCECOUNTY", label: "PIERCECOUNTY" },
	{ value: "POMTOC", label: "POMTOC" },
	{ value: "PORTNEWARKCONTAINER", label: "PORTNEWARKCONTAINER" },
	{ value: "PORTOFTAMPA", label: "PORTOFTAMPA" },
	{ value: "RACINE", label: "RACINE" },
	{ value: "SEAGIRTMARINE", label: "SEAGIRTMARINE" },
	{ value: "SOUTHENDCONTAINER", label: "SOUTHENDCONTAINER" },
	{ value: "SSATERMINAL18", label: "SSATERMINAL18" },
	{ value: "SSATERMINAL30", label: "SSATERMINAL30" },
	{ value: "SSATERMINALPIERA", label: "SSATERMINALPIERA" },
	{ value: "TOTALTERMINALS", label: "TOTALTERMINALS" },
	{ value: "TRAPACJACKSONVILLE", label: "TRAPACJACKSONVILLE" },
	{ value: "TRAPACLOSANGELES", label: "TRAPACLOSANGELES" },
	{ value: "TRAPACOAKLAND", label: "TRAPACOAKLAND" },
	{ value: "VANTERM", label: "VANTERM" },
	{ value: "WASHINGTON", label: "WASHINGTON" },
	{ value: "WBCT", label: "WBCT" },
];

const roadCarriers = [{ value: "NTG-CPKELCO", label: "NTG-CPKELCO" }];

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
		label: "Import",
		value: "IMPORT",
	},
	{
		label: "Export",
		value: "EXPORT",
	},
];

const roadRefType = [
	{
		label: "LTL",
		value: "LTL",
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
	return mode === "air"
		? airCarriers
		: mode === "ocean"
			? oceanCarriers
			: mode === "terminal"
				? terminalCarriers
				: mode === "road"
					? roadCarriers
					: [];
};

export const getQueueList = (mode: string) => {
	return mode === "ocean" ? oceanQueue : commonQueue;
};

export const getHistoryType = () => {
	return historyType;
};

export const getRefList = (mode: string) => {
	return mode === "air" ? airRefType : mode === "ocean" ? oceanRefType : mode === "terminal" ? terminalRefType : roadRefType;
};

export const getMonthList = (year: string) => {
	const currentYear = new Date().getFullYear().toString();
	const currentMonth = new Date().getMonth();
	const includeCurrentMonth = new Date().getDate() >= 2;

	if (year === currentYear) {
		return includeCurrentMonth ? months.slice(0, currentMonth + 1) : months.slice(0, currentMonth);
	}

	return months;
};

export const getYearList = () => {
	return year;
};

export const getDaysList = () => {
	return days;
};
