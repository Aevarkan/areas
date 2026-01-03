// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

import type { Logger } from "@workspace/common"
 
export interface StringCodec<T> {
  encode(object: T, logger?: Logger): string
  decode(encodedString: string, logger?: Logger): T
}
