import Elysia from "elysia";

export type ElysiaRequest<T> = T extends (app: Elysia) => any
  ? ReturnType<T> extends Elysia<any, infer R, any, any, any, any>
    ? R["request"]
    : never
  : never;
