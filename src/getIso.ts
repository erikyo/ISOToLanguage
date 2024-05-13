import { getCountry } from "./getCountry";
import { getLanguage } from "./getLanguage";
import type {
	CountryDataExtended,
	CountryDataFields,
	CountryExtendedFields,
	ISOCountryCode,
	ISOLangCode,
	IsoType,
	LanguageData,
	LanguageDataFields,
} from "./types";

/**
 * Retrieves the ISO value for a given code, type, and fields.
 *
 * @param {string} code - The code to retrieve the ISO value for.
 * @param {IsoType} [type] - The type of ISO value to retrieve (language or country). Defaults to undefined.
 * @param {string} [fields] - The fields to retrieve the ISO value for. Defaults to undefined.
 * @return {string | ISOLanguage | ISOCountry | false} - The ISO value corresponding to the given code, type, and fields.
 */
export function getIso(
	code: string,
	type?: IsoType,
	fields?:
		| string
		| string[]
		| CountryDataFields
		| CountryDataFields[]
		| LanguageDataFields
		| LanguageDataFields[],
):
	| string
	| string[]
	| number[]
	| LanguageData
	| LanguageData[]
	| CountryExtendedFields
	| Partial<CountryDataExtended>
	| ISOLangCode
	| ISOCountryCode
	| false {
	// if the type is not defined, find the language or country based on the fields
	if (!type) {
		// try first to get the language
		const lang = getLanguage(code, fields);
		if (lang) return lang;

		// if the language is not found, try to get the country
		const country = getCountry(code, fields);
		if (country) return country;

		// if the country is not found, return false
		return false;
	}

	// if the type is defined, return the selected data fields
	switch (type) {
		case "language":
			return getLanguage(code, fields);
		case "country":
			return getCountry(code, fields);
	}
}
