<script lang="ts">
const TOTEM_PATH_KEYS = {
  NAV: 'nav',
  HERO: 'hero',
  CONTENT: 'default',
} as const;
export interface CardSlots {
  [TOTEM_PATH_KEYS.NAV]: (props?: {}) => any
  [TOTEM_PATH_KEYS.HERO]: (props?: {}) => any
  [TOTEM_PATH_KEYS.CONTENT]: (props?: {}) => any
}
</script>
<script setup lang="ts">
const slots = defineSlots<CardSlots>()
const gridTemplateAreas = computed(() => {
  const area = []
  if (TOTEM_PATH_KEYS.NAV in slots) {
    area.push(TOTEM_PATH_KEYS.NAV)
  }
  if (TOTEM_PATH_KEYS.HERO in slots) {
    area.push(TOTEM_PATH_KEYS.HERO)
  }
  if (TOTEM_PATH_KEYS.CONTENT in slots) {
    area.push('content')
  }
  return area.map(line => `"${line}"`).join(' ')
})
const gridTemplateRows = computed(() => {
  const row = []
  if (TOTEM_PATH_KEYS.NAV in slots) {
    row.push('max-content')
  }
  if (TOTEM_PATH_KEYS.HERO in slots) {
    row.push('max-content')
  }
  if (TOTEM_PATH_KEYS.CONTENT in slots) {
    row.push('1fr')
  }
  return row.join(' ')
})
</script>
<template>
  <div class="grid" :style="{ gridTemplateAreas, gridTemplateRows }">
    <div v-if="TOTEM_PATH_KEYS.NAV in slots" :style="{ gridArea: TOTEM_PATH_KEYS.NAV }">
      <slot :name="TOTEM_PATH_KEYS.NAV" />
    </div>
    <div v-if="TOTEM_PATH_KEYS.HERO in slots" :style="{ gridArea: TOTEM_PATH_KEYS.HERO }">
      <slot :name="TOTEM_PATH_KEYS.HERO" />
    </div>
    <div v-if="TOTEM_PATH_KEYS.CONTENT in slots" :style="{ gridArea: 'content' }">
      <slot :name="TOTEM_PATH_KEYS.CONTENT" />
    </div>
  </div>
</template>
