import "reflect-metadata"
import { ModuleContainer } from "./container"
import { Class, DependencyConfig } from "./types"

export function Controller(path: string) {
  return (cls: Class<any>) => {
    ModuleContainer.set(cls, { type: "Controller", path });
  };
}

export function Injectable(): ClassDecorator {
  return (cls: any) => {
    ModuleContainer.set(cls, { type: "Service" });
  };
}


export function Inject(cls: Class): ParameterDecorator {
  return (target, propertyKey, index) => {
    // console.log({ target, propertyKey, index, cls });
    const deps = Reflect.getMetadata("DEP", target) as DependencyConfig[] | undefined ?? [];
    Reflect.defineMetadata("DEP", [{ dep: cls, index}, ...deps], target);
  };
}

export function Module({injects, controllers}: {injects: Class[], controllers: Class[]}): ClassDecorator {
  return (cls: any) => {
    ModuleContainer.set(cls, { type: "Module", injects, controllers });
  };
}

