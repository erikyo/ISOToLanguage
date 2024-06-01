import type {
	CountryData,
	CountryDataExtended,
	CountryDataFields,
	ISO3LangCode,
	ISO3Language,
	ISOCountryCode,
	ISOLangCode,
	IsoCode,
	IsoCodeFormat,
	IsoFormat,
	IsoType,
	LanguageData,
	LanguageDataFields,
} from "./types.js";

import { countriesIso } from "./data/countries-iso.js";
import { langIso } from "./data/lang-iso.js";
import { LangIso3 } from "./data/lang-iso3.js";
import { formatIso } from "./formatIso.js";
import { getCountry } from "./getCountry.js";
import { getIso } from "./getIso.js";
import {
	isCountryFormat,
	isExtraField,
	isGeoField,
	isLanguageFormat,
} from "./utils.js";

/**
 * Returns an array of languages divided by a custom separator.
 *
 * @private
 * @param {string} type - The separator used to join the language and country code. Defaults to '_'.
 * @returns {string[]} - An array of language codes.
 */
function getIso5Code(type: IsoCodeFormat = "locale"): string[] {
	const languageCodes: Record<string, boolean> = {};
	const countriesList = countriesIso;
	for (const country in countriesList) {
		const current = countriesList[country as ISOCountryCode];
		if (current?.languages.length === 0) continue;
		for (const language of current.languages) {
			const languageCode = formatIso(language, country, type);
			if (languageCode) {
				languageCodes[languageCode] = true;
			}
		}
	}
	// return the result sorted alphabetically
	return Object.keys(languageCodes).sort((a, b) => a.localeCompare(b));
}

/**
 * Retrieves all items of a specified type.
 *
 * @param from
 * @param {string} field - Type of items to retrieve. It Can be "iso", "languages",
 * "names", "original", "language-codes", or "locale". If no type is provided, return the isoCountries.
 * @param asKey - Whether to return the items as keys of the object.
 * @return Depending on the type parameter, either a list of ISOs, languages,
 * names, original names, or the isoCountries.
 */
export function getAll(
	field?: IsoFormat | CountryDataFields,
	from: IsoType = "country",
):
	| Record<
			string,
			| Record<string, Partial<LanguageData | CountryDataExtended>>
			| Partial<LanguageData | CountryDataExtended>
	  >
	| Partial<LanguageData | CountryDataExtended>[]
	| string[]
	| string {
	const subject = from === "language" ? langIso : countriesIso;
	if (field !== undefined) {
		switch (field) {
			case "iso2":
				return Object.keys(subject);
			case "iso3":
				if (from === "country")
					return Object.values(countriesIso).map((country) => country?.iso3);
				return Object.keys(LangIso3);
			case "locale":
			case "language-code":
				return getIso5Code(field);
			default:
				if (field) {
					let termList = { ...subject } as Record<
						string,
						Partial<LanguageData | CountryDataExtended>
					>;

					if (from === "country" && isCountryFormat(field)) {
						for (const item in subject) {
							const countryData = getIso(
								item,
								from,
								field as CountryDataFields,
							) as CountryData;
							if (countryData) termList[item as IsoCode] = countryData;
						}
					}

					if (from === "language") {
						if (isLanguageFormat(field)) {
							for (const item in subject) {
								const languageData = getIso(
									item,
									from,
									field as LanguageDataFields,
								) as LanguageData;
								if (languageData) termList[item as ISOLangCode] = languageData;
							}
						}

						if (field === "language-iso3") {
							const newTermList: ISO3Language = { ...LangIso3 };
							for (const iso3 in newTermList) {
								const iso: boolean | string = getIso(
									iso3,
									"language",
									"iso2",
								) as string;
								if (iso) {
									newTermList[iso3 as ISO3LangCode] = {
										...termList[iso],
										...newTermList[iso3 as ISO3LangCode],
									};
								}
								if (newTermList[iso3 as ISO3LangCode].hierarchy) {
									const newHierarchy: string[] = [];
									// for each language in the hierarchy add the name of the language
									newTermList[iso3 as ISO3LangCode].hierarchy?.forEach(
										(iso) => {
											if (
												typeof LangIso3[iso as ISO3LangCode]?.name === "object"
											) {
												(
													LangIso3[iso as ISO3LangCode]?.name as string[]
												).forEach((name) => {
													newHierarchy.push(name ?? iso);
												});
											} else {
												newHierarchy.push(
													(LangIso3[iso as ISO3LangCode]?.name as string) ??
														iso,
												);
											}
										},
									);
									newTermList[iso3 as ISO3LangCode].hierarchy =
										newHierarchy as string[];
								}
							}
							termList = { ...newTermList } as Record<
								string,
								LanguageData | Partial<CountryDataExtended>
							>;
						}
					}

					if (field === "all") {
						for (const item in subject) {
							const data = getIso(item, from, field);
							if (data) termList[item as IsoCode] = data as CountryDataExtended;
						}
					}

					if (field === "country-geo" || isGeoField([field])) {
						for (const item in subject) {
							const data = getCountry(item, [field]) as CountryData;
							if (data) termList[item as IsoCode] = data;
						}
					}

					if (field === "country-extra" || isExtraField([field])) {
						for (const item in subject) {
							const data = getCountry(item, [field]) as CountryData;
							if (data) termList[item as IsoCode] = data;
						}
					}

					// will return an array of fields if requested
					if (
						isCountryFormat(field) ||
						isLanguageFormat(field) ||
						isGeoField([field]) ||
						isExtraField([field])
					) {
						return Object.values(termList)
							.flat()
							.sort((a, b) => (a as string).localeCompare(b as string));
					}
					// otherwise, return an object with as a key the iso code
					return termList;
				}
		}
	}

	return subject;
}
