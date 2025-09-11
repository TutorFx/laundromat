import type { SERVICE_TYPE, TOTEM_INDEX } from './totem.constants';
import type { dryMachineAdditionalSchema, MachineSchema, washMachineAdditionalSchema } from './totem.schemas';
import type { z } from 'zod/v4';
import { defu } from 'defu';
import { GRAPH } from './totem.constants'
export type TotemIndex = typeof TOTEM_INDEX[keyof typeof TOTEM_INDEX];
export type ServiceType = typeof SERVICE_TYPE[keyof typeof SERVICE_TYPE];
export type Machine = z.infer<typeof MachineSchema>
type Prettify<T> = { [K in keyof T]: T[K] } & {};
type ReverseGraph<TGraph extends Readonly<Record<string, readonly string[]>>> = {
  [DestinationNode in TGraph[keyof TGraph][number]]: (
    Extract<
      keyof TGraph,
      {
        [SourceNode in keyof TGraph]: DestinationNode extends TGraph[SourceNode][number]
        ? SourceNode
        : never;
      }[keyof TGraph]
    >
  )[];
};
type ElementsOf<T> = T extends readonly (infer E)[] ? E : never;
type Concat<T, U> = (ElementsOf<T> | ElementsOf<U>)[];
type MergeGraphs<TReversed, TForward> = {
  [K in keyof TReversed | keyof TForward]:
  // Caso 1: A chave existe em AMBOS os grafos.
  K extends keyof TReversed & keyof TForward
  ? Concat<TReversed[K], TForward[K]>
  // Caso 2: A chave existe APENAS no grafo invertido.
  : K extends keyof TReversed
  ? TReversed[K]
  // Caso 3: A chave existe APENAS no grafo original.
  : K extends keyof TForward
  ? TForward[K]
  : never;
};
type CreateBidirectionalGraph<TGraph extends Readonly<Record<string, readonly string[]>>> =
  Prettify<MergeGraphs<ReverseGraph<TGraph>, TGraph>>;
export type TotemPathsType = CreateBidirectionalGraph<typeof GRAPH>;
const _reversedGraph = {} as ReverseGraph<typeof GRAPH>;
for (const [sourceNode, destinationNodes] of Object.entries(GRAPH)) {
  for (const destinationNode of destinationNodes) {
    if (!(_reversedGraph as any)[destinationNode]) {
      (_reversedGraph as any)[destinationNode] = [];
    }
    (_reversedGraph as any)[destinationNode]!.push(sourceNode);
  }
}
export const TOTEM_PATHS = defu(_reversedGraph, GRAPH) as TotemPathsType;
export type GetMachineByService = { machines: Machine[] }
export type WashMachineAdditional = z.infer<typeof washMachineAdditionalSchema>
export type DryMachineAdditional = z.infer<typeof dryMachineAdditionalSchema>
