<script setup lang="ts">
const model = defineModel<TotemModelGeneric<typeof SERVICE_TYPE.WASH>>({ required: true })
const emits = defineEmits<{
  change: [value: TotemIndex]
}>()
const CURRENT_INDEX = TOTEM_INDEX.WASH_MORE
function triggerNext() {
  const data = TOTEM_SCHEMAS[CURRENT_INDEX].safeParse(model.value)
  if (data.success) {
    emits('change', GRAPH[CURRENT_INDEX][0])
  }
}
</script>
<template>
  <TotemPath>
    <template #nav />
    <template #hero>
      <div class="grid gap-1 p-4">
        <LTitle>
          {{ $t(`${CURRENT_INDEX}.title`) }}
        </LTitle>
        <div>
          {{ $t(`${CURRENT_INDEX}.description`) }}
        </div>
      </div>
    </template>
    <div class="p-3 lg:py-12 grid">
      <UPageCard
        :title="$t(`${TOTEM_INDEX.WASH_MORE}.booleans.title`)"
        :description="$t(`${TOTEM_INDEX.WASH_MORE}.booleans.description`)" variant="naked" class="mb-4" />
      <UPageCard variant="subtle" class="grid gap-1 mb-4">
        <UFormField
          v-for="key in WASH_ADDITIONAL_BOOLEANS" :key="`${TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL}.${key}`"
          :name="`${TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL}.${key}`"
          :label="$t(`${TOTEM_INDEX.WASH_MORE}.${TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL}.${key}.label`)"
          :description="$t(`${TOTEM_INDEX.WASH_MORE}.${TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL}.${key}.description`)"
          class="flex items-center justify-between not-last:pb-4 gap-2">
          <USwitch v-model="model[TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL][key]" />
        </UFormField>
      </UPageCard>
      <UPageCard
        :title="$t(`${TOTEM_INDEX.WASH_MORE}.selects.title`)"
        :description="$t(`${TOTEM_INDEX.WASH_MORE}.selects.description`)" variant="naked" class="mb-4" />
      <UPageCard variant="subtle" class="grid gap-1 mb-4">
        <UFormField
          :key="`${TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL}.${WASH_ADDITIONAL_KEYS.WASH_CYCLE}`"
          :name="`${TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL}.${WASH_ADDITIONAL_KEYS.WASH_CYCLE}`"
          :label="$t(`${TOTEM_INDEX.WASH_MORE}.${TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL}.${WASH_ADDITIONAL_KEYS.WASH_CYCLE}.label`)"
          :description="$t(`${TOTEM_INDEX.WASH_MORE}.${TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL}.${WASH_ADDITIONAL_KEYS.WASH_CYCLE}.description`)"
          class="flex flex-wrap items-center justify-between not-last:pb-4 gap-2">
          <USelect
            v-model="model[TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL][WASH_ADDITIONAL_KEYS.WASH_CYCLE]"
            value-key="id" label-key="label" :items="Object.values(WASH_CYCLE).map(item => ({
              id: item,
              label: $t(`${TOTEM_INDEX.WASH_MORE}.${TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL}.${WASH_ADDITIONAL_KEYS.WASH_CYCLE}.cycles.${item}`)
            }))" size="lg" class="w-xs" />
        </UFormField>
      </UPageCard>
      <UButton size="lg" block @click="triggerNext">
        Próxima etapa
      </UButton>
    </div>
  </TotemPath>
</template>
