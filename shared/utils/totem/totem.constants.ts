import type { DryMachineAdditional, WashMachineAdditional } from "./totem";
export const SERVICE_TYPE = {
  WASH: 'wash',
  DRY: 'dry',
} as const;
export const TOTEM_INDEX = {
  START: 'start',
  WASH: SERVICE_TYPE.WASH,
  DRY: SERVICE_TYPE.DRY,
  WASH_MORE: 'wm',
  DRY_MORE: 'dm',
  PAYMENT: 'pay',
} as const;
export const GRAPH = {
  [TOTEM_INDEX.START]: [TOTEM_INDEX.WASH, TOTEM_INDEX.DRY],
  [TOTEM_INDEX.WASH]: [TOTEM_INDEX.WASH_MORE],
  [TOTEM_INDEX.DRY]: [TOTEM_INDEX.DRY_MORE],
  [TOTEM_INDEX.DRY_MORE]: [TOTEM_INDEX.PAYMENT],
  [TOTEM_INDEX.WASH_MORE]: [TOTEM_INDEX.PAYMENT],
} as const;
export const WASH_CYCLE = {
  NORMAL: 'normal',
  DELICATE: 'delicate',
  HEAVY_DUTY: 'heavyDuty',
  ECO: 'eco',
  SPORTSWEAR: 'sportswear',
  BEDDING: 'bedding',
} as const;
export const DRY_TEMPERATURE_LEVEL = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;
export const DRY_CYCLE = {
  NORMAL: 'normal',
  DELICATE: 'delicate',
  AIR_DRY: 'airDry',
  ANTI_WRINKLE: 'antiWrinkle',
  QUICK_DRY: 'quickDry',
} as const;
export const WASH_ADDITIONAL_KEYS = {
  SOFTENER: 'softener',
  DOUBLE_RINSE: 'doubleRinse',
  EXTRA_SPIN: 'extraSpin',
  WASH_CYCLE: 'washCycle',
} as const;
export const WASH_ADDITIONAL_BOOLEANS = [
  WASH_ADDITIONAL_KEYS.SOFTENER,
  WASH_ADDITIONAL_KEYS.DOUBLE_RINSE,
  WASH_ADDITIONAL_KEYS.EXTRA_SPIN
] as const;
export const DEFAULT_WASH_ADDITIONAL: WashMachineAdditional = {
  [WASH_ADDITIONAL_KEYS.SOFTENER]: false,
  [WASH_ADDITIONAL_KEYS.DOUBLE_RINSE]: false,
  [WASH_ADDITIONAL_KEYS.EXTRA_SPIN]: false,
  [WASH_ADDITIONAL_KEYS.WASH_CYCLE]: WASH_CYCLE.NORMAL,
} as const;
export const DRY_ADDITIONAL_KEYS = {
  TEMPERATURE_LEVEL: 'temperatureLevel',
  DRY_CYCLE: 'dryCycle',
  REFRESH: 'refresh',
} as const;
export const DEFAULT_DRY_ADDITIONAL: DryMachineAdditional = {
  [DRY_ADDITIONAL_KEYS.TEMPERATURE_LEVEL]: DRY_TEMPERATURE_LEVEL.MEDIUM,
  [DRY_ADDITIONAL_KEYS.DRY_CYCLE]: DRY_CYCLE.NORMAL,
  [DRY_ADDITIONAL_KEYS.REFRESH]: false,
} as const;
export const DRY_ADDITIONAL_BOOLEANS = [
  DRY_ADDITIONAL_KEYS.REFRESH
] as const;
export const TOTEM_STATE_KEYS = {
  RENTAL_TYPE: 'rentalType',
  WASH_MACHINE_SELECTED: 'washMachineSelected',
  DRY_MACHINE_SELECTED: 'dryMachineSelected',
  WASH_MACHINE_ADDITIONAL: 'washMachineAdditional',
  DRY_MACHINE_ADDITIONAL: 'dryMachineAdditional'
} as const;
