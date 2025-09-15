import { TOTEM_INDEX } from '../../shared/utils/totem/totem.constants'
import type { LocaleContract } from '../types'

export default defineI18nLocale<LocaleContract>(() => {
  return {
    [TOTEM_INDEX.START]: {
      title: 'Bem-vindo! O que vamos fazer hoje?',
      breadcrumb: 'Início'
    },
    [TOTEM_INDEX.WASH]: {
      title: 'Escolha uma lavadora',
      description: 'Lave suas roupas com eficiência e cuidado. As máquinas disponíveis estão prontas para uso.',
      button: 'Lavar Roupas',
      breadcrumb: 'Lavar'
    },
    [TOTEM_INDEX.WASH_MORE]: {
      title: 'Personalize sua Lavagem',
      description: 'Adicione itens extras ou ajuste o ciclo para um resultado perfeito.',
      breadcrumb: 'Preferências',
      booleans: {
        title: 'Opções Adicionais',
        description: 'Selecione os itens que deseja adicionar ao seu ciclo de lavagem.',
      },
      selects: {
        title: 'Tipo de Ciclo',
        description: 'Escolha o ciclo mais adequado para o tipo de roupa que você está lavando.',
      },
      [TOTEM_STATE_KEYS.WASH_MACHINE_ADDITIONAL]: {
        [WASH_ADDITIONAL_KEYS.SOFTENER]: {
          label: 'Amaciante Extra',
          description: 'Deixa suas roupas mais macias e com um perfume agradável.',
        },
        [WASH_ADDITIONAL_KEYS.DOUBLE_RINSE]: {
          label: 'Enxágue Duplo',
          description: 'Ideal para peles sensíveis, removendo qualquer resíduo de sabão.',
        },
        [WASH_ADDITIONAL_KEYS.EXTRA_SPIN]: {
          label: 'Centrifugação Extra',
          description: 'Suas roupas saem quase secas, otimizando o tempo na secadora.',
        },
        [WASH_ADDITIONAL_KEYS.WASH_CYCLE]: {
          label: 'Ciclo de Lavagem',
          description: 'Selecione o ciclo que melhor se adapta às suas roupas.',
          cycles: {
            [WASH_CYCLE.NORMAL]: 'Normal',
            [WASH_CYCLE.DELICATE]: 'Delicado',
            [WASH_CYCLE.HEAVY_DUTY]: 'Pesado / Edredom',
            [WASH_CYCLE.ECO]: 'Ecológico',
            [WASH_CYCLE.SPORTSWEAR]: 'Roupas Esportivas',
            [WASH_CYCLE.BEDDING]: 'Cama e Banho',
          },
        },
      },
    },
    [TOTEM_INDEX.DRY]: {
      title: 'Escolha uma secadora',
      description: 'Seque suas roupas rapidamente. As máquinas disponíveis estão prontas para uso.',
      breadcrumb: 'Secar',
      button: 'Secar Roupas',
    },
    [TOTEM_INDEX.DRY_MORE]: {
      title: 'Ajustes da Secagem',
      description: 'Configure a temperatura e o ciclo para proteger suas roupas e economizar energia.',
      breadcrumb: 'Preferências',
      booleans: {
        title: 'Opções Extras',
        description: 'Ative recursos adicionais para um cuidado especial com suas roupas.',
      },
      selects: {
        title: 'Ajustes Principais',
        description: 'Defina as configurações essenciais para o seu ciclo de secagem.',
      },
      [TOTEM_STATE_KEYS.DRY_MACHINE_ADDITIONAL]: {
        [DRY_ADDITIONAL_KEYS.TEMPERATURE_LEVEL]: {
          label: 'Nível de Temperatura',
          description: 'Escolha a temperatura ideal para seus tecidos.',
          levels: {
            [DRY_TEMPERATURE_LEVEL.LOW]: 'Baixa (Roupas Delicadas)',
            [DRY_TEMPERATURE_LEVEL.MEDIUM]: 'Média (Uso Geral)',
            [DRY_TEMPERATURE_LEVEL.HIGH]: 'Alta (Toalhas e Jeans)',
          },
        },
        [DRY_ADDITIONAL_KEYS.DRY_CYCLE]: {
          label: 'Ciclo de Secagem',
          description: 'Selecione um ciclo para otimizar o tempo e o cuidado com as peças.',
          cycles: {
            [DRY_CYCLE.NORMAL]: 'Normal',
            [DRY_CYCLE.DELICATE]: 'Delicado',
            [DRY_CYCLE.AIR_DRY]: 'Secagem a Frio / Ventilar',
            [DRY_CYCLE.ANTI_WRINKLE]: 'Anti-Rugas',
            [DRY_CYCLE.QUICK_DRY]: 'Secagem Rápida',
          },
        },
        [DRY_ADDITIONAL_KEYS.REFRESH]: {
          label: 'Ciclo Revitalizar',
          description: 'Um ciclo rápido para remover odores e pequenas rugas de roupas secas.',
        },
      },
    },
    [TOTEM_INDEX.PAYMENT]: {
      title: 'Pagamento',
      description: 'Selecione a forma de pagamento e finalize seu pedido.',
      breadcrumb: 'Pagamento',
    },
    branch: {
      title: 'Escolha de serviço'
    },
  } satisfies LocaleContract
})