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
  <TotemPath>
    <template #hero>
      <div class="grid gap-1 p-4">
        <LTitle>
          {{ $t(`${TOTEM_INDEX.START}.title`) }}
        </LTitle>
      </div>
    </template>
    <div class="@container grid gap-3 p-4">
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
            <icon v-if="model[TOTEM_STATE_KEYS.RENTAL_TYPE] === currentIndex" name="ic:baseline-radio-button-checked" />
            <icon v-else name="ic:baseline-radio-button-unchecked" />
          </div>
        </div>
      </label>
    </div>
  </TotemPath>
</template>
