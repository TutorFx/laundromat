<script setup lang="ts">
const model = defineModel<TotemModelGeneric>({ required: true })
const path = defineModel<TotemIndex>('path', { required: true })
function getIcon(index: ServiceType) {
  switch (index) {
    case SERVICE_TYPE.DRY:
      return '/secadora.png';
    case SERVICE_TYPE.WASH:
      return '/lavadora.png';
    default:
      break;
  }
}
</script>
<template>
  <TotemPath class="gap-3">
    <template #hero>
      <div class="grid gap-1">
        <LTitle>
          {{ $t(`${TOTEM_INDEX.START}.title`) }}
        </LTitle>
      </div>
    </template>
    <div class="@container grid gap-3">
      <label v-for="(currentIndex, i) in GRAPH[TOTEM_INDEX.START]" :key="currentIndex" class="grid">
        <input :id="`machine-${i}`" v-model="path" type="radio" :value="currentIndex" class="absolute opacity-0 -z-50">
        <div class="p-6 grid grid-flow-col justify-between text-4xl gap-1 bg-elevated rounded-2xl">
          <div class="grid grid-flow-col gap-5">
            <NuxtImg width="86" :src="getIcon(currentIndex)" />
            <div class="grid">
              <div>
                {{ $t(`${currentIndex}.button`) }}
              </div>
              <div class="text-xl">
                {{ $t(`${currentIndex}.description`) }}
              </div>
            </div>
          </div>
          <div>
            <USwitch :default-value="model[TOTEM_STATE_KEYS.RENTAL_TYPE] === currentIndex" size="lg" class="pointer-events-none" />
          </div>
        </div>
      </label>
    </div>
  </TotemPath>
</template>
