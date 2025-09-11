<script setup lang="ts">
const model = defineModel<TotemModelGeneric>({ required: true })
</script>
<template>
  <div>
    <div>
      <div>
        {{ $t(`${TOTEM_INDEX.PAYMENT}.title`) }}
      </div>
      <div>
        {{ $t(`${TOTEM_INDEX.PAYMENT}.description`) }}
      </div>
    </div>
  </div>
</template>
