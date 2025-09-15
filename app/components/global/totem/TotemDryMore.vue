<script setup lang="ts">
const model = defineModel<TotemModelGeneric<typeof SERVICE_TYPE.DRY>>({ required: true })
const emits = defineEmits<{
  change: [value: TotemIndex]
}>()

const CURRENT_INDEX = TOTEM_INDEX.DRY_MORE

const i18nBasePath = computed(() => `${CURRENT_INDEX}.${TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL}`);

const temperatureItems = computed(() => Object.values(DRY_TEMPERATURE_LEVEL).map(item => ({
  id: item,
  label: $t(`${i18nBasePath.value}.${DRY_ADDITIONAL_KEYS.TEMPERATURE_LEVEL}.levels.${item}`)
})))

const cycleItems = computed(() => Object.values(DRY_CYCLE).map(item => ({
  id: item,
  label: $t(`${i18nBasePath.value}.${DRY_ADDITIONAL_KEYS.DRY_CYCLE}.cycles.${item}`)
})))

function triggerNext() {
  const data = TOTEM_SCHEMAS[CURRENT_INDEX].safeParse(model.value)
  if (data.success) {
    emits('change', GRAPH[CURRENT_INDEX][0])
  } else {
    console.error(data.error.flatten().fieldErrors)
  }
}
</script>

<template>
  <TotemPath class="gap-12">
    <template #hero>
      <div class="grid gap-1">
        <LTitle>
          {{ $t(`${CURRENT_INDEX}.title`) }}
        </LTitle>
        <div>
          {{ $t(`${CURRENT_INDEX}.description`) }}
        </div>
      </div>
    </template>

    <div class="grid gap-6">
      <UPageCard
        :title="$t(`${TOTEM_INDEX.DRY_MORE}.selects.title`)"
        :description="$t(`${TOTEM_INDEX.DRY_MORE}.selects.description`)" variant="naked" />
      <UPageCard variant="subtle" class="grid gap-4">
        <UFormField
          :name="`${TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL}.${DRY_ADDITIONAL_KEYS.TEMPERATURE_LEVEL}`"
          :label="$t(`${i18nBasePath}.${DRY_ADDITIONAL_KEYS.TEMPERATURE_LEVEL}.label`)"
          :description="$t(`${i18nBasePath}.${DRY_ADDITIONAL_KEYS.TEMPERATURE_LEVEL}.description`)"
          class="flex flex-wrap items-center justify-between gap-2"
        >
          <USelect
            v-model="model[TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL][DRY_ADDITIONAL_KEYS.TEMPERATURE_LEVEL]"
            value-key="id"
            label-key="label"
            :items="temperatureItems"
            size="lg"
            class="w-xs"
          />
        </UFormField>

        <UFormField
          :name="`${TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL}.${DRY_ADDITIONAL_KEYS.DRY_CYCLE}`"
          :label="$t(`${i18nBasePath}.${DRY_ADDITIONAL_KEYS.DRY_CYCLE}.label`)"
          :description="$t(`${i18nBasePath}.${DRY_ADDITIONAL_KEYS.DRY_CYCLE}.description`)"
          class="flex flex-wrap items-center justify-between gap-2"
        >
          <USelect
            v-model="model[TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL][DRY_ADDITIONAL_KEYS.DRY_CYCLE]"
            value-key="id"
            label-key="label"
            :items="cycleItems"
            size="lg"
            class="w-xs"
          />
        </UFormField>
      </UPageCard>

      <UPageCard
        :title="$t(`${TOTEM_INDEX.DRY_MORE}.booleans.title`)"
        :description="$t(`${TOTEM_INDEX.DRY_MORE}.booleans.description`)" variant="naked" />
      <UPageCard variant="subtle" class="grid gap-4">
        <UFormField
          v-for="key in DRY_ADDITIONAL_BOOLEANS"
          :key="`${TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL}.${key}`"
          :name="`${TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL}.${key}`"
          :label="$t(`${i18nBasePath}.${key}.label`)"
          :description="$t(`${i18nBasePath}.${key}.description`)"
          class="flex items-center justify-between gap-2"
        >
          <USwitch v-model="model[TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL][key]" size="lg" />
        </UFormField>
      </UPageCard>
    </div>
    <template #footer>
      <div class="p-3">
        <UButton size="xl" block @click="triggerNext">
          Próxima etapa
        </UButton>
      </div>
    </template>
  </TotemPath>
</template>