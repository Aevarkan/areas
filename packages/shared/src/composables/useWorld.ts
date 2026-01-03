// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

import { Dimension, world } from "@minecraft/server";

export function useWorld() {

  const cachedDimensions = new Map<string, Dimension>()

  /**
   * @remarks
   * Returns a dimension object. Repeat calls are cached.
   *
   * @param dimensionId
   * The name of the dimension. For example, "overworld",
   * "nether" or "the_end".
   * @returns
   * The requested dimension
   * @throws
   * Throws if the given dimension name is invalid
   */
  function getDimension(dimensionId: string) {
    let dimension = cachedDimensions.get(dimensionId)
    if (!dimension) {
      dimension = world.getDimension(dimensionId)
      cachedDimensions.set(dimensionId, dimension)
    }
    return dimension
  }


  return { getDimension }
}