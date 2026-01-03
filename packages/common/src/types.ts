// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

/**
 * An exact coordinate within the world, including its
 * dimension and location.
 */
export interface ExactLocation {
  /**
   * Identifier of the dimension the location is in.
   */
  dimensionId: string
  /**
   * X component of this location.
   */
  x: number
  /**
   * Y component of this location.
   */
  y: number
  /**
   * Z component of this location.
   */
  z: number
}
