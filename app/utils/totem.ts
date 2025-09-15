export const TOTEM_INDEX_ICON = {
  [TOTEM_INDEX.START]: 'heroicons:home-solid',
  [TOTEM_INDEX.WASH]: 'mdi:washing-machine',
  [TOTEM_INDEX.DRY]: 'mdi:tumble-dryer',
  [TOTEM_INDEX.WASH_MORE]: 'heroicons:cog-6-tooth-solid',
  [TOTEM_INDEX.DRY_MORE]: 'heroicons:adjustments-horizontal-solid',
  [TOTEM_INDEX.PAYMENT]: 'heroicons:credit-card-solid',
} as const satisfies Record<TotemIndex, string>;