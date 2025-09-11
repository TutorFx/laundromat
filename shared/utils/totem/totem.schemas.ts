import { z } from 'zod/v4'
import { DRY_ADDITIONAL_KEYS, DRY_CYCLE, DRY_TEMPERATURE_LEVEL, SERVICE_TYPE, TOTEM_INDEX, TOTEM_STATE_KEYS, WASH_ADDITIONAL_KEYS, WASH_CYCLE } from './totem.constants'
import type { DryMachineAdditional, TotemIndex, WashMachineAdditional } from './totem';
type RentalType = TotemIndex | null;
export type TotemModelGeneric<T extends RentalType = RentalType> = {
  [TOTEM_STATE_KEYS.RENTAL_TYPE]: null | typeof SERVICE_TYPE[keyof typeof SERVICE_TYPE]
  [TOTEM_STATE_KEYS.WASH_MACHINE_SELECTED]: T extends typeof SERVICE_TYPE.WASH ? string : null;
  [TOTEM_STATE_KEYS.DRY_MACHINE_SELECTED]: T extends typeof SERVICE_TYPE.DRY ? string : null;
  [TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL]: T extends typeof SERVICE_TYPE.WASH ? WashMachineAdditional : null;
  [TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL]: T extends typeof SERVICE_TYPE.DRY ? DryMachineAdditional : null;
};
export const TOTEM_DEFAULTS: TotemModelGeneric = {
  [TOTEM_STATE_KEYS.RENTAL_TYPE]: null,
  [TOTEM_STATE_KEYS.WASH_MACHINE_SELECTED]: null,
  [TOTEM_STATE_KEYS.DRY_MACHINE_SELECTED]: null,
  [TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL]: null,
  [TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL]: null
} as const
const totemStartSchema = z.object({
  [TOTEM_STATE_KEYS.RENTAL_TYPE]: z.union([
    z.literal(TOTEM_INDEX.DRY),
    z.literal(TOTEM_INDEX.WASH)
  ])
})
const washSelectSchema = z.object({
  [TOTEM_STATE_KEYS.RENTAL_TYPE]: z.literal(TOTEM_INDEX.WASH),
  [TOTEM_STATE_KEYS.WASH_MACHINE_SELECTED]: z.cuid()
})
const drySelectSchema = z.object({
  [TOTEM_STATE_KEYS.RENTAL_TYPE]: z.literal(TOTEM_INDEX.DRY),
  [TOTEM_STATE_KEYS.DRY_MACHINE_SELECTED]: z.cuid()
})
export const washMachineAdditionalSchema = z.object({
  [WASH_ADDITIONAL_KEYS.SOFTENER]: z.boolean(),
  [WASH_ADDITIONAL_KEYS.DOUBLE_RINSE]: z.boolean(),
  [WASH_ADDITIONAL_KEYS.WASH_CYCLE]: z.enum(WASH_CYCLE),
  [WASH_ADDITIONAL_KEYS.EXTRA_SPIN]: z.boolean(),
})
const washAdditionalSchema = z.object({
  [TOTEM_STATE_KEYS.RENTAL_TYPE]: z.literal(TOTEM_INDEX.WASH),
  [TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL]: washMachineAdditionalSchema
})
export const dryMachineAdditionalSchema = z.object({
  [DRY_ADDITIONAL_KEYS.TEMPERATURE_LEVEL]: z.enum(DRY_TEMPERATURE_LEVEL),
  [DRY_ADDITIONAL_KEYS.DRY_CYCLE]: z.enum(DRY_CYCLE),
  [DRY_ADDITIONAL_KEYS.REFRESH]: z.boolean(),
})
const dryAdditionalSchema = z.object({
  [TOTEM_STATE_KEYS.RENTAL_TYPE]: z.literal(TOTEM_INDEX.DRY),
  [TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL]: dryMachineAdditionalSchema
})
export const TOTEM_SCHEMAS = {
  [TOTEM_INDEX.START]: totemStartSchema,
  [TOTEM_INDEX.WASH]: washSelectSchema,
  [TOTEM_INDEX.WASH_MORE]: washAdditionalSchema,
  [TOTEM_INDEX.DRY]: drySelectSchema,
  [TOTEM_INDEX.DRY_MORE]: dryAdditionalSchema
} as const
export const serviceTypeSchema = z.enum(SERVICE_TYPE)
export const getTenantServices = z.object({
  tenantId: z.string(),
  serviceType: serviceTypeSchema
})
export const MachineSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  availableAt: z.number().nullable(),
})
