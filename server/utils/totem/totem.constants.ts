const now = new Date();
export const MACHINE_LIST = {
  [SERVICE_TYPE.DRY]: [
    {
      availableAt: null,
      name: 'Secadora #1',
      id: 'cjld2cyuq0000t3rmniod1foy',
      price: 17.99,
    },
    {
      availableAt: now.setMinutes(now.getMinutes() + 5),
      name: 'Secadora #2',
      id: 'ckqtls7040000h3d8suihro21',
      price: 17.99,
    },
    {
      availableAt: null,
      name: 'Secadora #3',
      id: 'cixf02ym000001b66m45ae4k8',
      price: 17.99,
    },
  ],
  [SERVICE_TYPE.WASH]: [
    {
      availableAt: null,
      name: 'Lavadora #1',
      id: 'cjld2cyuq0000t3rmniod1foy',
      price: 17.99,
    },
    {
      availableAt: now.setMinutes(now.getMinutes() + 5),
      name: 'Lavadora #2',
      id: 'ckqtls7040000h3d8suihro21',
      price: 17.99,
    },
    {
      availableAt: now.setMinutes(now.getMinutes() + 8),
      name: 'Lavadora #3',
      id: 'cixf02ym000001b66m45ae4k8',
      price: 17.99,
    },
  ],
} as const satisfies Record<ServiceType, Machine[]>;
