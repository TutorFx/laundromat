// --- Tipos Genéricos ---
type BaseMachineOption = {
  label: string
  description: string
}

// --- Tipos para a tela WASH_MORE ---
type WashAdditionalKey = typeof WASH_ADDITIONAL_KEYS[keyof typeof WASH_ADDITIONAL_KEYS]
type WashCycleKey = typeof WASH_CYCLE[keyof typeof WASH_CYCLE]

type WashCycleSpecifics = BaseMachineOption & {
  cycles: Record<WashCycleKey, string>
}

type WashMachineAdditionalType = Record<WashAdditionalKey, BaseMachineOption> & {
  [WASH_ADDITIONAL_KEYS.WASH_CYCLE]: WashCycleSpecifics
}

// --- Tipos para a tela DRY_MORE ---
type DryAdditionalKey = typeof DRY_ADDITIONAL_KEYS[keyof typeof DRY_ADDITIONAL_KEYS]
type DryTemperatureLevelKey = typeof DRY_TEMPERATURE_LEVEL[keyof typeof DRY_TEMPERATURE_LEVEL]
type DryCycleKey = typeof DRY_CYCLE[keyof typeof DRY_CYCLE]

type DryTemperatureSpecifics = BaseMachineOption & {
  levels: Record<DryTemperatureLevelKey, string>
}

type DryCycleSpecifics = BaseMachineOption & {
  cycles: Record<DryCycleKey, string>
}

type DryMachineAdditionalType = Record<DryAdditionalKey, BaseMachineOption> & {
  [DRY_ADDITIONAL_KEYS.TEMPERATURE_LEVEL]: DryTemperatureSpecifics
  [DRY_ADDITIONAL_KEYS.DRY_CYCLE]: DryCycleSpecifics
}

// --- Contrato Principal de Localização ---
export interface LocaleContract {
  [TOTEM_INDEX.START]: {
    title: string
    breadcrumb: string
  }
  [TOTEM_INDEX.WASH]: {
    title: string
    description: string
    breadcrumb: string
    button: string
  }
  [TOTEM_INDEX.WASH_MORE]: {
    title: string
    description: string
    breadcrumb: string
    booleans: {
      title: string
      description: string
    }
    selects: {
      title: string
      description: string
    }
    [TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL]: WashMachineAdditionalType
  }
  [TOTEM_INDEX.DRY]: {
    title: string
    description: string
    breadcrumb: string
    button: string
  }
  [TOTEM_INDEX.DRY_MORE]: {
    title: string
    description: string
    breadcrumb: string
    booleans: {
      title: string
      description: string
    }
    selects: {
      title: string
      description: string
    }
    [TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL]: DryMachineAdditionalType
  }
  [TOTEM_INDEX.PAYMENT]: {
    title: string
    description: string
    breadcrumb: string
  },
  branch: {
    title: string
  }
}