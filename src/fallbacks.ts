/**
 * Generates a fallback country code for specific languages.
 *
 * @param {string} language - The language code for which to generate a fallback country code.
 * @return {string | undefined} - The generated fallback country code or undefined if no fallback is available.
 */
export function tryCountriesFallback(language: string): string | undefined {
	// Fallback for specific languages
	const fallbackMap: { [key: string]: string } = {
		en: "US", // Fallback English to en_US - the United States
		zh: "CN", // Fallback Chinese (Simplified) to zh_CN - China
		ar: "SA", // Fallback Arabic to ar_SA - Saudi Arabia
		ja: "JP", // Fallback Japanese to ja_JP - Japan
		ko: "KR", // Fallback Korean to ko_KR - South Korea
		sv: "SE", // Fallback Swedish to sv_SE - Sweden
		hi: "IN", // Fallback Hindi to hi_IN - India
	};

	// Check if there's a fallback for the given language
	if (fallbackMap[language]) {
		return fallbackMap[language];
	}
}
