// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

import type { ExactLocation } from "./types"

export type AreasEvent = InventoryEvent | EntityEvent | BlockEvent | FullBlockEvent
export type AreasEventActor = PlayerEventActor | BlockEventActor | EntityEventActor | WorldEventActor | NoneEventActor

interface PlayerEventActor {
  type: AreasEventActorType.Player,
  playerId: number
}

interface EntityEventActor {
  type: AreasEventActorType.Entity,
  entityId: string
}

interface BlockEventActor {
  type: AreasEventActorType.Block,
  blockLocation: ExactLocation
}

interface WorldEventActor {
  type: AreasEventActorType.World
}

interface NoneEventActor {
  type: AreasEventActorType.None
}

/**
 * An actor involved in an event.
 */
export enum AreasEventActorType {
  Player = "player",
  None = "none",
  Block = "block",
  World = "world",
  Entity = "player"
}

interface BaseEvent {
  /**
   * The absolute unix time of the event happening.
   */
  time: number
}

export interface InventoryEvent extends BaseEvent {
  type: InteractionTypes.Inventory,
  /**
   * The actor that contained the inventory.
   */
  target: PlayerEventActor | EntityEventActor | BlockEventActor,
  itemTypeId: string,
  quantity: number,
  interactionType: InventoryInteraction,
  /**
   * The inventory slot index that the interaction affected, if known.
   */
  slot?: number
}

/**
 * Including players.
 */
export interface EntityEvent extends BaseEvent {
  type: InteractionTypes.Entity,
  interaction: EntityInteraction,
  location: ExactLocation,
  target: PlayerEventActor | EntityEventActor
  source: AreasEventActor
}

export interface BlockEvent extends BaseEvent {
  type: InteractionTypes.Block,
  interaction: BlockInteraction
  location: ExactLocation,
  blockTypeId: string
  source: AreasEventActor
}

export interface FullBlockEvent extends BaseEvent {
  type: InteractionTypes.FullBlock,
  interaction: BlockInteraction,
  location: ExactLocation,
  beforeBlockTypeId: string,
  afterBlockTypeId: string
  source: AreasEventActor
}

export enum InteractionTypes {
  /**
   * An interaction involving inventory items.
   */
  Inventory = "inventory",
  /**
   * An interaction involving entities, including players.
   */
  Entity = "entity",
  /**
   * An interaction involving blocks.
   */
  Block = "block",
  /**
   * An interaction involving blocks will additional information.
   */
  FullBlock = "fullBlock"
}

export enum BlockInteraction {
  BlockPlace = "blockPlace",
  BlockBreak = "blockBreak"
}

export enum EntityInteraction {
  EntityDie = "entityDie",
  EntityKilled = "entityKilled",
  EntitySpawn = "entitySpawn"
}

export enum InventoryInteraction {
  AddItem = "addItem",
  RemoveItem = "removeItem",
  ModifyItem = "modifyItem"
}
