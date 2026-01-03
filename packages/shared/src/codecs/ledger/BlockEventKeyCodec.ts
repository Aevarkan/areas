// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

import { type ExactLocation, type Logger, LogMessageLevel } from "@workspace/common"
import type { StringCodec } from "../codecDefinitions"
import { BlockEventKey } from "./BlockEventKey"
import { compressDimensionId, compressNumber, decompressDimensionId, decompressNumber } from "../../compression"

const blockEventPrefix = "b"

export class BlockEventKeyCodec implements StringCodec<BlockEventKey> {

  public encode(object: BlockEventKey, logger?: Logger): string {
    const compressedTimestamp = compressNumber(object.timestamp)
    const compressedDimensionId = compressDimensionId(object.location.dimensionId)
    const { x, y, z } = object.location
    const compressedX = compressNumber(x)
    const compressedY = compressNumber(y)
    const compressedZ = compressNumber(z)

    if (
      compressedTimestamp.toString().includes(",") ||
      compressedX.toString().includes(",") ||
      compressedY.toString().includes(",") ||
      compressedZ.toString().includes(",") ||
      compressedDimensionId.toString().includes(",")
    ) {
      logger?.log("BlockEventKeyCodec.encode error", LogMessageLevel.High)
      throw new Error("BlockEventKeyCodec.encode error")
    }

    logger?.log(`BlockEventKeyCodec.encode encoded ${object.timestamp} to ${compressedTimestamp}, ${object.location.dimensionId} to ${compressedDimensionId}...`, LogMessageLevel.VeryLow)

    const encodedString = `${blockEventPrefix}${compressedTimestamp},${compressedX},${compressedY},${compressedZ},${compressedDimensionId}`
    return encodedString
  }
  
  public decode(encodedString: string, logger?: Logger): BlockEventKey {
    const parts = encodedString.split(",")
    const prefixTimestamp = parts[0] // the prefix should be b here
    const compressedTimestamp = prefixTimestamp.slice(1)
    const decompressedTimestamp = decompressNumber(compressedTimestamp)

    const compressedX = parts[1]
    const compressedY = parts[2]
    const compressedZ = parts[3]
    
    const x = decompressNumber(compressedX)
    const y = decompressNumber(compressedY)
    const z = decompressNumber(compressedZ)
    
    const compressedDimensionId = parts[4]
    const dimensionId = decompressDimensionId(compressedDimensionId)

    const exactLocation: ExactLocation = { x, y, z, dimensionId }

    logger?.log(`BlockEventKeyCodec.encode decoded ${dimensionId}, ${decompressedTimestamp}...`, LogMessageLevel.VeryLow)
    
    const key = new BlockEventKey(decompressedTimestamp, exactLocation)
    return key
  }

}
