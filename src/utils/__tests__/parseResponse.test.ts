import { parseResponse } from '../parseResponse'

describe('parseResponse test', () => {
    const encoder = new TextEncoder()

    it('should be a function', () => {
        expect(typeof parseResponse).toBe('function')
    })

    it('should return "hello world', () => {
        let hello = encoder.encode('hello world')
        expect(parseResponse(hello)).toEqual(['hello world'])
    })

    it('should return "[hello, world]"', () => {
        let hello = encoder.encode('hello\nworld')
        expect(parseResponse(hello, '\n')).toEqual(['hello', 'world'])
    })

    it('should return "[hello, world]" 2', () => {
        let hello = encoder.encode('hello \n world')
        expect(parseResponse(hello, '\n')).toEqual(['hello', 'world'])
    })

    it('should return "[]"', () => {
        expect(parseResponse(null, null)).toEqual([])
    })

    it('should return "[]" 2', () => {
        expect(parseResponse(new Uint8Array(), null)).toEqual([])
    })

    it('should return "[]" 3', () => {
        expect(parseResponse(new Uint8Array(), '-')).toEqual([])
    })
})
