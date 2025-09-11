export default defineEventHandler(async (event) => {
const query = await getValidatedRouterParams(event, getTenantServices.safeParse)
if (!query.success)
return createError({
statusCode: 404,
statusText: 'Invalid service type',
})
return { machines: MACHINE_LIST[query.data.serviceType] }
})
