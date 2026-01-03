// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

/**
 * Debug logger, intended only for development.
 */
export interface Logger {
  /**
   * Logs a message.
   * @param logLevel The message's importance.
   */
  log(message: any, logLevel: LogMessageLevel): void
}

export enum LogMessageLevel {
  VeryLow = 1,
  Low = 2,
  Medium = 3,
  High = 4,
  VeryHigh = 5
}
