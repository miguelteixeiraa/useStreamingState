export const parseResponse = (
  byteArr: Uint8Array | BufferSource | null | undefined,
  separator?: string | null
): string[] => {
  if (!byteArr) {
    return [];
  }

  const utf8decoder = new TextDecoder();
  let rawResponse: string;
  try {
    rawResponse = utf8decoder.decode(byteArr);
  } catch (e) {
    throw new Error(`unable to decode byte array ${e}`);
  }

  if (rawResponse && separator) {
    return rawResponse.split(separator).reduce((res, curr) => {
      res.push(curr.trim());

      return res;
    }, [] as string[]);
  }

  return rawResponse ? [rawResponse] : [];
};
