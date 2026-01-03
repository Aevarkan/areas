// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

const BASE64 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/"

/**
 * Compresses an integer number into a base64 string.
 * @param number The number to compress.
 * @returns The compressed number as a string.
 * @remarks Any decimal numbers will be rounded to the nearest integer.
 */
export function compressNumber(number: number): string {
  let compressedNumber: string = ""

  const isNegativeNumber = number < 0 // This caused so many problems before I found out
  number = Math.abs(Math.round(number))

  if (number === 0) {
    compressedNumber = BASE64[0]
  } else {
    while (number > 0) {
      compressedNumber = BASE64[number % 64] + compressedNumber
      number = Math.floor( number / 64)
    }
  }

  const stringNumber = (isNegativeNumber ? "-" : "") + compressedNumber
  return stringNumber
}
