<script setup lang="ts">
const model = defineModel<TotemModelGeneric>({ required: true })
const emits = defineEmits<{
  change: [value: void | never]
}>()
const CURRENT_INDEX = TOTEM_INDEX.WASH
const { data } = useFetch<GetMachineByService>(`/api/tenant/${'goiania-1'}/services/${SERVICE_TYPE.WASH}`)
</script>
<template>
  <TotemPath class="gap-6">
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
    <form v-if="data" class="grid gap-3">
      <label v-for="(machine, i) in data.machines" :key="machine.id" class="grid" @click="emits('change')">
        <div class="p-3 grid grid-flow-col justify-between gap-1 text-3xl bg-elevated rounded-2xl">
          <input
            :id="`machine-${i}`" v-model="model.washMachineSelected" type="radio" :value="machine.id"
            class="absolute opacity-0 -z-50">
          <div class="grid grid-cols-[max-content_1fr] gap-3">
            <NuxtImg width="64" src="/lavadora.png" />
            <div class="grid gap-1">
              <div>
                {{ machine.name }}
              </div>
              <div class="text-sm">
                {{ machine.price }}
              </div>
            </div>
          </div>
          <div class="grid">
            <div>
              <USwitch :default-value="model?.washMachineSelected === machine.id" size="lg" />
            </div>
          </div>
        </div>
      </label>
    </form>
  </TotemPath>
</template>
