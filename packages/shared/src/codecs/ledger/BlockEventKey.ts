// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

import type { ExactLocation, Logger } from "@workspace/common"
import { BlockEventKeyCodec } from "./BlockEventKeyCodec"

export class BlockEventKey {

  private static readonly codec = new BlockEventKeyCodec()

  /** @internal */
  public readonly timestamp: number
  /** @internal */
  public readonly location: ExactLocation

  /**
   * @internal Used only by {@link BlockEventKeyCodec}.
   */
  public constructor(timestamp: number, location: ExactLocation) {
    this.timestamp = timestamp
    this.location = location
  }

  public static decode(encodedString: string, logger?: Logger) {
    return this.codec.decode(encodedString, logger)
  }

  public encode(logger?: Logger) {
    return BlockEventKey.codec.encode(this, logger)
  }

}
