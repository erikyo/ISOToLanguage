import {
    Country,
    CountryData,
    CountryDataExtended,
    CountryDataFields,
    ISOCountryCode,
    ISOLangCode,
    LanguageData,
} from './types'
import { validateISO } from './validation'
import { countriesIso } from './data/countries-iso'
import { isExtraField, isGeoField } from './utils'
import { countriesExtra } from './data/countries-extra'
import { countriesGeo } from './data/countries-geo'
import { formatIso } from './formatIso'
import { getIso } from './getIso'

/**
 * This function retrieves country data by its name.
 *
 * @param {string} key - The name of the country to fetch data for.
 * @param {string} fields - The fields to retrieve. If not provided, all fields are returned.
 * @return {CountryData} Returns country data for the given name
 * or null if no matching country is found.
 */
export function getCountry(
    key: string,
    fields?: string | string[] | CountryDataFields | CountryDataFields[]
): ISOLangCode[] | Partial<CountryDataExtended> | LanguageData[] | string | string[] | false {
    let country: Country | false = false
    let countryIso: ISOCountryCode | false = false

    if (validateISO(key, 'country')) {
        country = countriesIso[key as ISOCountryCode] as Country
        countryIso = key as ISOCountryCode
    } else {
        // loop for each langIso item and find if the name matches the iso
        for (const currentCountry of Object.entries(countriesIso)) {
            if (
                currentCountry[1].name === key ||
                currentCountry[1].original === key ||
                currentCountry[1].iso3 === key
            ) {
                country = currentCountry[1] as Country
                countryIso = currentCountry[0] as ISOCountryCode
                break
            }
        }
    }

    if (country && countryIso !== false) {
        // If the requested fields is the code, return the iso country code
        if (fields) {
            if (typeof fields === 'string') {
                fields = [fields]
            }

            // Start to collect the country data
            let countryData: Partial<CountryDataExtended> = {}

            if (fields.includes('all')) {
                fields = [
                    'locale',
                    'language-code',
                    'iso2',
                    'language-extra',
                    'country-extra',
                    'country-geo',
                ]
            }

            if (fields.includes('country-geo') || isExtraField(fields)) {
                // merge the country geo data
                countryData = { ...countryData, ...countriesGeo[countryIso] }
            }

            if (fields.includes('country-extra') || isGeoField(fields)) {
                // merge the country extra data
                countryData = { ...countryData, ...countriesExtra[countryIso] }
            }

            if (fields.includes('locale')) {
                const localeCode = country.languages.map(
                    (langIso) =>
                        formatIso(langIso as ISOLangCode, countryIso as ISOCountryCode, 'locale') ??
                        countryIso
                ) as string[]
                countryData.locale = localeCode
            }

            if (fields.includes('language-code')) {
                const isoCodes = country.languages?.map(
                    (langIso) =>
                        formatIso(
                            langIso as ISOLangCode,
                            countryIso as ISOCountryCode,
                            'language-code'
                        ) ?? countryIso
                ) as string[]
                countryData['language-code'] = isoCodes
            }

            // If the requested fields is the code, return the iso country code
            if (fields.includes('iso2')) {
                countryData.iso2 = countryIso
            }

            // If the requested field is 'languageData', return the country with extended language data
            if (fields.includes('language-extra')) {
                const languageData =
                    country.languages.map((iso) => getIso(iso as ISOLangCode, 'language')) || []
                countryData.languages = languageData as LanguageData[]
            }

            // merge the country data with the requested fields
            countryData = {
                iso2: countryIso,
                ...countriesIso[countryIso],
                ...countryData,
            } as Partial<CountryDataExtended>

            // Check if fields are available, return only the requested fields otherwise return all
            let newCountryData: Partial<CountryDataExtended>
            if (fields.map((field) => field in countryData)) {
                newCountryData = fields.reduce(
                    (acc: Record<string, Partial<CountryDataExtended>>, field: string) => {
                        if (field in countryData) {
                            acc[field] = countryData[
                                field as keyof CountryDataExtended
                            ] as Partial<CountryDataExtended>
                        }
                        return acc
                    },
                    {}
                )
                // Check if all fields are available
                if (fields.every((field) => field in newCountryData)) {
                    // if there is only one field, return the value
                    if (Object.keys(newCountryData).length === 1) {
                        return Object.values(newCountryData)[0]
                    }
                    // Return the country data with the requested fields
                    return newCountryData
                }
            } else {
                // just return the country data
                newCountryData = countryData
            }

            if (fields.length === 1 && fields[0] in newCountryData) {
                // Return the new country data
                return Object.values(countryData)[1]
            } else if (Object.keys(newCountryData).length === fields.length) {
                return newCountryData
            }
            return countryData
        }

        // If no fields are provided, return all fields
        return { iso2: countryIso, ...country } as CountryData
    }

    return false
}
