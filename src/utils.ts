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
		fields.includes("coordinates") ||
		fields.includes("coordinatesDMS")
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

/**
 * Returns a formatted string of coordinates in DMS format.
 *
 * @param coordinates
 */
export function formatCoordinatesToDMS(coordinates: number[]): string {
	const [latitude, longitude] = coordinates;

	const formatCoordinate = (coord: number, isLatitude: boolean) => {
		const absolute = Math.abs(coord);
		const degrees = Math.floor(absolute);
		const minutes = Math.floor((absolute - degrees) * 60);
		const seconds = ((absolute - degrees - minutes / 60) * 3600).toFixed(1);
		const direction = isLatitude
			? coord >= 0
				? "N"
				: "S"
			: coord >= 0
				? "E"
				: "W";
		return `${degrees}°${minutes}'${seconds}"${direction}`;
	};

	const latitudeDMS = formatCoordinate(latitude, true);
	const longitudeDMS = formatCoordinate(longitude, false);

	return `${latitudeDMS}, ${longitudeDMS}`;
}
