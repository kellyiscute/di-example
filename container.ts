import { Class } from "./types";

export interface IControllerConfig {
  type: "Controller";
  path: string;
}

export interface IServiceConfig {
  type: "Service";
}

export interface IRouteConfig {
  type: "Route";
  path: string;
  cls: Class;
}

export interface IModuleConfig {
  type: "Module";
  injects: Class[];
  controllers: Class[];
}

export type IModule = IControllerConfig | IServiceConfig | IRouteConfig | IModuleConfig;

export const ModuleContainer = new Map<Class<any>, IModule>();
export const InstanceContainer = new Map<Class, Object>();

