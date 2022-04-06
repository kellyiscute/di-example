export interface Class<C = any> extends Function {
  new(...args: any[]): C;
}
export type DependencyConfig = { dep: Class, index: number }

