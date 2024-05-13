import { countriesGeo } from "./data/countries-geo";
import { countriesIso } from "./data/countries-iso";
import type {
	Country,
	CountryData,
	CountryGeo,
	ISOCountryCode,
	IsoCode,
} from "./types";

export function getGroupedBy(
	field: "region" | "continent" | "subRegion",
	groupValue: string,
) {
	const grouped = Object.entries(countriesGeo).reduce(
		(
			accumulator: Record<string, Record<string, CountryData | CountryGeo>>,
			value: [string, CountryGeo],
		) => {
			const [iso, country] = value;
			const key = country[field as keyof CountryGeo] as string;
			if (key) {
				if (!accumulator[key]) {
					accumulator[key] = {};
				}
				accumulator[key][iso as IsoCode] = {
					...countriesIso[iso as ISOCountryCode],
					...country,
				};
			}
			return accumulator;
		},
		{},
	);

	if (groupValue) {
		return { [groupValue]: grouped[groupValue] || [] };
	}

	return grouped;
}

/**
 * Returns a list of countries that speak the given languages.
 * For example, if you pass in ["en", "fr"], it will return all countries that speak English or French.
 * TODO: Add support for AND/OR
 *
 * @param {string[]} languages - An array of languages to check against.
 * @return {{[key: string]: Country}[]} Returns an array of countries that speak any of the
 * given languages.
 */
export function getCountriesByLanguage(languages: string[]): {
	[key: string]: Country;
} {
	const result: { [K in IsoCode]?: Country } = {};

	for (const iso in countriesIso) {
		const currentIso = iso as ISOCountryCode;
		const isoData = countriesIso[currentIso];

		for (const language of languages) {
			// Check if the iso code is valid and the language matches
			if ((isoData.languages as string[]).includes(language)) {
				result[currentIso] = isoData as Country;
			}
		}
	}

	return result;
}
