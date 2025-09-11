export default defineNuxtRouteMiddleware((to, from) => {
const toast = useToast()
if (!('step' in to.params)) return;
const params = Array.isArray(to.params.step) ?
to.params.step[0] as string : to.params.step
if (!Object.values(TOTEM_INDEX).includes(params as unknown as TotemIndex)) {
return navigateTo({ params: { step: TOTEM_INDEX.START } })
}
const state = useState<TotemModelGeneric>('totem')
if (!state.value && params !== TOTEM_INDEX.START) {
return navigateTo({ params: { step: TOTEM_INDEX.START } })
}
})
