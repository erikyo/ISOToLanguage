import type { countriesIso } from "./data/countries-iso";
import type { langIso } from "./data/lang-iso";
import type { LangIso3 } from "./data/lang-iso3";

/** Type of ISO */
export type IsoType = "country" | "language";

/** The Country code */
export interface Country {
	iso3: string;
	languages: ISOLangCode[] | LanguageData[];
	name: string;
	original: string;
}

export type CountryFields = keyof Country;

/** The Country code type e.g. 'GB' 'US' */
export type ISOCountryCode = keyof typeof countriesIso;

export interface CountryData extends Country {
	iso2: ISOCountryCode;
}

export type CountryExtendedFields = keyof CountryData;
export type ISOCountry = Record<ISOCountryCode, Country>;

export interface CountryLocaleData extends Country {
	locale: string[];
	"language-code": string[];
}

export interface CountryGeo {
	capital?: string;
	region: "Oceania" | "Americas" | "Europe" | "Africa" | "Asia" | "Antarctica";
	continent: "AF" | "AN" | "AS" | "EU" | "NA" | "OC" | "SA";
	subRegion:
		| "Antarctica"
		| "Northern Africa"
		| "Sub-Saharan Africa"
		| "Northern America"
		| "Melanesia"
		| "Micronesia"
		| "Polynesia"
		| "Northern Europe"
		| "Western Europe"
		| "Eastern Europe"
		| "Southern Europe"
		| "Latin America and the Caribbean"
		| "Australia and New Zealand"
		| "Eastern Asia"
		| "South-eastern Asia"
		| "Southern Asia"
		| "Central Asia"
		| "Western Asia";
	intermediateRegion?:
		| "Caribbean"
		| "Middle Africa"
		| "Eastern Africa"
		| "Southern Africa"
		| "Central America"
		| "South America"
		| "Western Africa"
		| "Channel Islands";
	nameFormal?: string;
}

export type CountryGeoFields = keyof CountryGeo;
export type ISOCountryGeo = Record<ISOCountryCode, CountryGeo>;

export interface CountryExtra {
	tld?: string;
	dial?: string;
	currency?: {
		code?: string;
		symbol?: string;
		original?: string;
		name: string;
	};
	flag: string;
	emoji: string;
	emojiU: string;
	coordinates?: number[];
}

export type CountryExtraFields = keyof CountryExtra;
export type ISOCountryExtra = Record<ISOCountryCode, CountryExtra>;

/**
 * Country data fields to retrieve.
 */
export type CountryDataCustomFields =
	| "language-extra"
	| "language-iso3"
	| "country-extra"
	| "country-geo"
	| "all";
export type CountryDataExtraFields =
	| CountryExtendedFields
	| CountryExtraFields
	| CountryGeoFields;
export type CountryDataFields =
	| CountryDataExtraFields
	| CountryDataCustomFields
	| IsoCodeFormat;
export type CountryDataExtended = CountryGeo &
	CountryExtra &
	CountryData &
	CountryLocaleData;

export type GenericCountryData = Partial<
	Record<
		string | CountryDataFields,
		string | string[] | number | boolean | object | LanguageData[]
	>
>;

/**
 * The Language code
 */
export interface Language {
	iso3: string;
	name: string;
	original: string;
}

export type LanguageFields = keyof Language;

export interface LanguageData extends Language {
	iso2: ISOLangCode;
}

export type LanguageDataFields = keyof LanguageData;

export interface LanguageIso3 {
	hierarchy?: ISO3LangCode[] | string[];
	name: string | string[];
}

export type ISO3LangCode = keyof typeof LangIso3 & string;
export type ISO3Language = Record<ISO3LangCode, LanguageIso3>;

// The Language code type e.g. 'en' 'fr'
export type ISOLangCode = keyof typeof langIso & string;
export type ISOLanguage = Record<ISOLangCode, Language>;

/**
 * The format of the ISO code
 */
export type IsoCodeFormat = "locale" | "language-code";

export type IsoFormat = IsoCodeFormat;
export type IsoCode = ISOCountryCode | ISOLangCode;
