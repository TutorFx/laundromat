export default defineNuxtRouteMiddleware((to) => {
  if (!('step' in to.params))
    return navigateTo({ path: '/totem/start' })

  const currentStep = (Array.isArray(to.params.step) ? to.params.step[0] : to.params.step) as TotemIndex

  if (!Object.values(TOTEM_INDEX).includes(currentStep))
    return navigateTo({ params: { step: TOTEM_INDEX.START } })

  if (currentStep === TOTEM_INDEX.START)
    return

  const state = useState<TotemModelGeneric>('totem')

  if (!state.value)
    return navigateTo({ params: { step: TOTEM_INDEX.START } })

  const chosenBranch = state.value[TOTEM_STATE_KEYS.RENTAL_TYPE]
  if (!chosenBranch) {
    return navigateTo({ params: { step: TOTEM_INDEX.START } })
  }

  const path: TotemIndex[] = [TOTEM_INDEX.START]
  let currentNode: TotemIndex | undefined = chosenBranch
  let pathFound = false

  while (currentNode) {
    path.push(currentNode)
    if (currentNode === currentStep) {
      pathFound = true
      break
    }
    const nextNodes = GRAPH[currentNode as keyof typeof GRAPH]
    currentNode = nextNodes?.[0] as TotemIndex | undefined
  }

  if (!pathFound)
    return navigateTo({ params: { step: TOTEM_INDEX.START } })

  const prerequisites = path.slice(0, path.indexOf(currentStep))

  for (const step of prerequisites) {
    const schema = TOTEM_SCHEMAS[step as keyof typeof TOTEM_SCHEMAS]

    if (schema) {
      const validation = schema.safeParse(state.value)

      if (!validation.success) {
        console.warn(
          `[Totem Middleware] Validação falhou para a etapa '${step}'. Redirecionando.`,
          validation.error.flatten(),
        )
        return navigateTo({ params: { step } })
      }
    }
  }
})