import { IModuleConfig, InstanceContainer, ModuleContainer } from "./container";
import { calcDependencyTree } from "./dependencyTree";
import { Class, DependencyConfig } from "./types";

export function bootstrap() {
  const keys = Array.from(ModuleContainer.entries());
  const dependencyTreeResult = calcDependencyTree(keys.filter(k => k[1].type === "Service").map(k => k[0]));

  return keys.filter(([, v]) => v.type === "Module").forEach(([, config]: [Class, IModuleConfig]) => {
    const instantiateSorted = dependencyTreeResult.loadSequence.map(v => v.cls);
    instantiateSorted.forEach(cls => {
      const deps = Reflect.getMetadata("DEP", cls) as DependencyConfig[] ?? [];
      const args = deps.map(dep => InstanceContainer.get(dep.dep));
      InstanceContainer.set(cls, Reflect.construct(cls, args));
    });

    config.controllers.forEach(v => {
      const deps = Reflect.getMetadata("DEP", v) as DependencyConfig[] ?? [];
      const args = deps.map(dep => InstanceContainer.get(dep.dep));
      InstanceContainer.set(v, Reflect.construct(v, args));
    })
  })
}

