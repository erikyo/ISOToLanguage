import type {
	CountryExtraFields,
	CountryFields,
	CountryGeoFields,
	IsoCodeFormat,
	LanguageFields,
} from "./types";

export function isExtraField(fields: string[]): fields is CountryExtraFields[] {
	return (
		fields.includes("tld") ||
		fields.includes("dial") ||
		fields.includes("currency") ||
		fields.includes("flag") ||
		fields.includes("emoji") ||
		fields.includes("emojiU") ||
		fields.includes("coordinates")
	);
}

export function isGeoField(fields: string[]): fields is CountryGeoFields[] {
	return (
		fields.includes("capital") ||
		fields.includes("region") ||
		fields.includes("subRegion") ||
		fields.includes("intermediateRegion") ||
		fields.includes("name_formal")
	);
}

export function isLanguageCodeFormat(value: string): value is IsoCodeFormat {
	return value === "locale" || value === "language-code";
}

export function isCountryFormat(value: string): value is CountryFields {
	return (
		value === "iso3" ||
		value === "languages" ||
		value === "name" ||
		value === "original"
	);
}
export function isLanguageFormat(value: string): value is LanguageFields {
	return value === "iso3" || value === "name" || value === "original";
}

/**
 * Returns a separator based on the given type.
 *
 * @private
 * @param {('locale' | 'language-code')} type - The type of separator to get.
 * @return {string} - The separator.
 */
export function getSeparator(type?: string | IsoCodeFormat): string {
	if (type && isLanguageCodeFormat(type)) {
		return type === "locale" ? "_" : "-";
	}
	return type ?? "-";
}

export function parseIso5Code(isoCode: string) {
	return {
		language: isoCode[0] + isoCode[1],
		separator: isoCode[2],
		country: isoCode[3] + isoCode[4],
	};
}
