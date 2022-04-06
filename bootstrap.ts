import { IModuleConfig, InstanceContainer, ModuleContainer } from "./container";
import { Class, DependencyConfig } from "./types";

export function bootstrap() {
  const keys = Array.from(ModuleContainer.entries());
  return keys.filter(([k, v]) => v.type === "Module").forEach(([cls, config]: [Class, IModuleConfig]) => {
    const instantiateSorted = config.injects.sort((a, b) => (Reflect.getMetadata("DEP", a) ?? []).length - (Reflect.getMetadata("DEP", b) ?? []).length);
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
