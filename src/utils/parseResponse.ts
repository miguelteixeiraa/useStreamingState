export const parseResponse = (
    byteArr: Uint8Array | BufferSource | null | undefined,
    separator: string | null | undefined = undefined
): string[] => {
    if (!byteArr) {
        return []
    }

    const utf8decoder = new TextDecoder()
    let rawResponse: string
    try {
        rawResponse = utf8decoder.decode(byteArr)
    } catch (e) {
        throw new Error(`unable to decode byte array ${e}`)
    }

    if (rawResponse && separator) {
        return rawResponse
            .split(separator)
            .map((value) => value.trim())
            .filter((value) => value != '')
    }

    return rawResponse ? [rawResponse] : []
}
