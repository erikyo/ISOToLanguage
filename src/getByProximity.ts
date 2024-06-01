import { countriesExtra } from "./data/countries-extra.js";
import { getIso } from "./getIso.js";

/**
 * Calculate the distance between two sets of coordinates using the Haversine formula.
 *
 * @param {Array<number>} coordinates - The first set of coordinates [latitude, longitude]
 * @param {Array<number>} coordinates2 - The second set of coordinates [latitude, longitude]
 * @return {number} The distance between the two sets of coordinates in kilometers
 */
function getDistance(
	coordinates: [number, number],
	coordinates2: [number, number],
) {
	const lat1 = coordinates[0];
	const lon1 = coordinates[1];
	const lat2 = coordinates2[0];
	const lon2 = coordinates2[1];
	// radius of the Earth in kilometers (6371 km)
	const R = 6371;
	const dLat = ((lat2 - lat1) * Math.PI) / 180;
	const dLon = ((lon2 - lon1) * Math.PI) / 180;
	// Haversine formula
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c;
	return d;
}

/**
 * Retrieves a list of countries within a specified proximity of the given country.
 *
 * @param {string} country - the name of the country
 * @param {number} maxDistance - the maximum distance in kilometers
 * @return {Record<string, any> | undefined} a record of countries within the specified proximity
 */
export function getNearestCountries(
	country: string,
	maxDistance: number,
): { iso: string; coordinates: number[] | undefined; distance: number }[] {
	const countryCoordinates = getIso(country, "country", "coordinates") as
		| [number, number]
		| null;
	if (!countryCoordinates) {
		throw new Error("Country not found");
	}
	return getByProximity(countryCoordinates, maxDistance);
}

export function getByProximity(
	coordinates: [number, number],
	maxDistance: number,
): { iso: string; coordinates: number[] | undefined; distance: number }[] {
	const countriesbyDistance: {
		iso: string;
		coordinates: number[] | undefined;
		distance: number;
	}[] = [];
	for (const [iso, extras] of Object.entries(countriesExtra)) {
		const distance = getDistance(
			coordinates,
			extras.coordinates as [number, number],
		);
		if (distance <= maxDistance) {
			countriesbyDistance.push({
				iso,
				coordinates: extras.coordinates,
				distance,
			});
		}
	}
	// return the countries sorted by distance
	countriesbyDistance.sort((a, b) => a.distance - b.distance);
	return countriesbyDistance;
}
