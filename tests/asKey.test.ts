import { describe, expect } from '@jest/globals'
import ISOToLanguage from '../src'
import { isoList } from '../src/iso'

describe('getBy', () => {
    let isoToLanguage: ISOToLanguage

    beforeEach(() => {
        isoToLanguage = new ISOToLanguage()
    })

    describe('asKey', () => {
        it('should return an object with languages as keys', () => {
            const result = isoToLanguage.asKey('languages')
            const expectedKeys = Object.keys(result)
            const expectedLanguages = isoList['AD'].languages

            expect(expectedKeys.length).toBeGreaterThan(10)
        })

        it('should return an object with names as keys', () => {
            const result = isoToLanguage.asKey('name')
            const expectedKeys = Object.keys(result)
            const expectedNames = isoToLanguage.getAllNames()

            expect(expectedKeys).toEqual(expectedNames)
        })

        it('should return an object with original data as keys', () => {
            const result = isoToLanguage.asKey('original')
            const expectedKeys = Object.keys(result)
            const expectedOriginals = isoToLanguage.getAllOriginalNames()

            expect(expectedKeys).toEqual(expectedOriginals)
        })
    })
})