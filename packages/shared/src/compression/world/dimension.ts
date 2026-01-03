// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

import { MinecraftDimensionTypes } from "@minecraft/vanilla-data";

const dimensionCompressionMap: Record<MinecraftDimensionTypes, string> = {
  [MinecraftDimensionTypes.Overworld]: "o",
  [MinecraftDimensionTypes.Nether]: "n",
  [MinecraftDimensionTypes.TheEnd]: "e"
}

const reverseDimensionCompressionMap = Object.fromEntries(
  Object.entries(dimensionCompressionMap).map(([key, value]) => [value, key])
)

/**
 * Compresses dimensions for smaller storage.
 * @param dimensionId The dimension, e.g. `minecraft:overworld`.
 * @returns The compressed dimension id.
 * @remarks Modded dimensions will have to be added manually, they're not compressed by default.
 */
export function compressDimensionId(dimensionId: MinecraftDimensionTypes | string) {
  // @ts-expect-error There might not be a compressed id
  const compressedId = dimensionCompressionMap[dimensionId]
  if (!compressedId) {
    return dimensionId
  }
  // we can be sure that it exists now
  const compressedDimensionId = compressedId as string
  return compressedDimensionId
}

/**
 * Uncompresses a stored dimension id.
 * @param dimensionId The stored dimension id.
 * @returns The original dimension id.
 * @remarks Modded dimensions will have to be added manually, they're not compressed by default.
 */
export function decompressDimensionId(dimensionId: string): string {
  return reverseDimensionCompressionMap[dimensionId] ?? dimensionId
}
