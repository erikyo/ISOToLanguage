import { tryCountriesFallback } from "./fallbacks";
import { getIso } from "./getIso";
import type { IsoCodeFormat } from "./types";
import { getSeparator } from "./utils";
import { validateISO } from "./validation";

/**
 * Formats the language and country into a single string.
 *
 * @param language - The language code.
 * @param country - The country code. Fallback to the same value as `language` if not provided but may fail or produce unexpected results.
 * @param separator - The separator used to join the language and country code. Can be a string or a LanguageCodeFormat. Defaults to '-'.
 * @returns The formatted string combining the language and country code.
 */
export function formatIso(
	language: string | undefined,
	country?: string | undefined,
	separator?: string | IsoCodeFormat,
): string | false {
	let isoLanguage =
		language && validateISO(language, "language") ? language : undefined;
	let isoCountry =
		country && validateISO(country, "country") ? country : undefined;
	separator = getSeparator(separator);

	if (!isoLanguage && language) {
		isoLanguage = (getIso(language, "language", "iso2") as string) || undefined;
	}

	if (!isoCountry && language) {
		isoCountry = tryCountriesFallback(language);
	}

	if (!isoCountry && country) {
		isoCountry = (getIso(country, "country", "iso2") as string) || undefined;
	}

	// Return the formatted string if both language and country are found
	if (!!isoLanguage && !!separator && !!isoCountry) {
		return isoLanguage + separator + isoCountry;
	}

	// Return false if either language or country is not found
	return false;
}
