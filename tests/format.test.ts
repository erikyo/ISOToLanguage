import { describe, expect, it } from "vitest";
import { formatIso } from "../src/";

describe("format", () => {
	it("should formatIso the language and country into a single string with default options", () => {
		const formattedString = formatIso("en", "US");
		expect(formattedString).toBe("en-US");
	});

	it("should fallback to the language if the country is not provided", () => {
		const formattedString = formatIso("en");
		expect(formattedString).toBe("en-US"); // assuming en_US is the default country for en
	});

	it("should fallback to the language if the country is not provided and isValidCountry returns false", () => {
		const formattedString = formatIso("EN");
		expect(formattedString).toBeFalsy();
	});

	it("should return null if the language is not found", () => {
		const formattedString = formatIso("hh");
		expect(formattedString).toBeFalsy();
	});

	it("Should return null if the language is passed at the place of the country", () => {
		const formattedString = formatIso("us");
		expect(formattedString).toBeFalsy();
	});

	it("Should fallback to the language if the country is not provided", () => {
		const formattedString = formatIso("id");
		expect(formattedString).toBeFalsy();
	});

	it("should use the provided separator if options.separator is specified", () => {
		const formattedString = formatIso("en", "US", "-");
		expect(formattedString).toBe("en-US");
	});

	it("should use the separator based on the options.type if options.separator is not specified", () => {
		const formattedString = formatIso("en", "US", "language-code");
		expect(formattedString).toBe("en-US");
	});
});
