const now = new Date();
export const MACHINE_LIST = {
[SERVICE_TYPE.DRY]: [
{
availableAt: null,
name: 'Secadora #1',
id: 'tz4a98xxat96iws9zmbrgj3a',
price: 17.99,
},
{
availableAt: now.setMinutes(now.getMinutes() + 5),
name: 'Secadora #2',
id: 'pfh0haxfpzowht3oi213cqos',
price: 17.99,
},
{
availableAt: null,
name: 'Secadora #3',
id: 'nc6bzmkmd014706rfda898to',
price: 17.99,
},
],
[SERVICE_TYPE.WASH]: [
{
availableAt: null,
name: 'Lavadora #1',
id: 'tz4a98xxat96iws9zmbrgj3a',
price: 17.99,
},
{
availableAt: now.setMinutes(now.getMinutes() + 5),
name: 'Lavadora #2',
id: 'pfh0haxfpzowht3oi213cqos',
price: 17.99,
},
{
availableAt: now.setMinutes(now.getMinutes() + 8),
name: 'Lavadora #3',
id: 'nc6bzmkmd014706rfda898to',
price: 17.99,
},
],
} as const satisfies Record<ServiceType, Machine[]>;
