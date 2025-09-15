<script lang="ts">
import type { StepperItem } from '@nuxt/ui'
import { useEventListener } from '@vueuse/core'
</script>
<script setup lang="ts" generic="">
definePageMeta({
  layout: 'totem',
  middleware: ['totem'],
})
const data = useState<TotemModelGeneric>('totem', () => TOTEM_DEFAULTS)
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const step = computed<TotemIndex>({
  get() {
    if (!('step' in route.params)) return TOTEM_INDEX.START
    const currentRouteStep = Array.isArray(route.params.step)
      ? route.params.step[0] : route.params.step
    if (!currentRouteStep)
      return TOTEM_INDEX.START
    if (!Object.values(TOTEM_INDEX).includes(currentRouteStep as unknown as TotemIndex))
      return TOTEM_INDEX.START
    return currentRouteStep as TotemIndex
  },
  set(suggestedRoute) {
    if (!Object.values(TOTEM_INDEX).includes(suggestedRoute as unknown as TotemIndex))
      return;
    if (([TOTEM_INDEX.DRY, TOTEM_INDEX.WASH] as string[]).includes(suggestedRoute)) {
      data.value[TOTEM_STATE_KEYS.RENTAL_TYPE] = suggestedRoute as typeof TOTEM_INDEX.DRY | typeof TOTEM_INDEX.WASH
    }
    router.push({ params: { step: suggestedRoute } })
  }
})
const stepper = computed<{ stepper: StepperItem[], stepperIndex: number }>(() => {
  const path: TotemIndex[] = [TOTEM_INDEX.START];
  let stepperAmount = 0;
  let stepperIndex = 0;
  const chosenBranch = data.value[TOTEM_STATE_KEYS.RENTAL_TYPE];

  if (chosenBranch) {
    let currentNode: TotemIndex | undefined = chosenBranch;

    while (currentNode) {
      path.push(currentNode);
      ++stepperAmount;
      if (currentNode === step.value) { stepperIndex = stepperAmount }
      const nextNodes = GRAPH[currentNode as keyof typeof GRAPH];
      currentNode = nextNodes?.[0] as TotemIndex | undefined;
    }
  }

  const stepper = path.map<StepperItem>((stepKey: TotemIndex)=> { 
    const schema = stepKey in TOTEM_SCHEMAS ? TOTEM_SCHEMAS[stepKey as keyof typeof TOTEM_SCHEMAS] : null
    const validatedData = schema?.safeParse(data.value) ?? null
    return {
      title: t(`${stepKey}.breadcrumb`),
      to: `/totem/${stepKey}`,
      icon: TOTEM_INDEX_ICON[stepKey],
      key: stepKey,
      disabled: validatedData ? !validatedData.success : false
    }
  });

  if (!chosenBranch){
    stepper.push({
      title: t('branch.title'),
      icon: 'mdi:source-branch',
      disabled: true
    })
  }

  return { stepper, stepperIndex }
});
const handledStepper = computed({
  get() {
    return stepper.value.stepperIndex
  },
  set(index){
    step.value = stepper.value.stepper[index]?.key
  }
})
watch(() => data.value[TOTEM_STATE_KEYS.DRY_MACHINE_SELECTED], (newMachine, oldMachine) => {
  const rentalType = TOTEM_INDEX.DRY_MORE
  if (newMachine !== oldMachine) {
    if (newMachine) {
      step.value = rentalType
      data.value[TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL] = DEFAULT_DRY_ADDITIONAL
      data.value[TOTEM_STATE_KEYS.WASH_MACHINE_SELECTED] = null
      data.value[TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL] = null
    }
  }
})
watch(() => data.value[TOTEM_STATE_KEYS.WASH_MACHINE_SELECTED], (newMachine, oldMachine) => {
  const rentalType = TOTEM_INDEX.WASH_MORE
  if (newMachine !== oldMachine) {
    if (newMachine !== null) {
      step.value = rentalType
      data.value[TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL] = DEFAULT_WASH_ADDITIONAL
      data.value[TOTEM_STATE_KEYS.DRY_MACHINE_SELECTED] = null
      data.value[TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL] = null
    }
  }
})
const clBackButton = useEventListener(window, 'popstate', () => {
  console.log('teste')
})
onMounted(() => {
  window.addEventListener('beforeunload', function (e) {
    if (TOTEM_INDEX.START !== step as unknown) {
      e.preventDefault();
      e.returnValue = '';
      return 'Você está prestes a sair da página de cadastro. Você tem certeza?';
    }
  });
})
onBeforeUnmount(() => {
  clBackButton()
})
function redirect(route: TotemIndex) {
  step.value = route
}
</script>
<template>
  <div class="grid grid-rows-[max-content_1fr] gap-3 p-6">
    <div>
      <UStepper v-model="handledStepper" :items="stepper.stepper" class="w-full" />
    </div>

    <TotemStart v-if="step === TOTEM_INDEX.START" v-model="data" v-model:path="step" />
    <LazyTotemDry v-else-if="step === TOTEM_INDEX.DRY" v-model="data" @change="redirect(GRAPH[step][0])" />
    <LazyTotemDryMore v-else-if="step === TOTEM_INDEX.DRY_MORE" v-model="data" @change="redirect(GRAPH[step][0])" />
    <LazyTotemWash v-else-if="step === TOTEM_INDEX.WASH" v-model="data" @change="redirect(GRAPH[step][0])" />
    <LazyTotemWashMore v-else-if="step === TOTEM_INDEX.WASH_MORE" v-model="data" @change="redirect(GRAPH[step][0])" />
    <LazyTotemPayment v-else-if="step === TOTEM_INDEX.PAYMENT" v-model="data" />
  </div>
</template>
