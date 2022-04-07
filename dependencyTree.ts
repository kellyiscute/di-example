import { Class, DependencyConfig } from "./types";

class CustomMap<K, V> extends Map<K, V> {
  public setNX(key: K, value: V): boolean {
    if (!this.has(key)) {
      this.set(key, value);
      return true;
    }
    return false;
  }

  public getWithDefault(key: K, defaultValue: V): V {
    if (!this.has(key)) {
      return defaultValue;
    } else {
      return this.get(key);
    }
  }
}

interface dependencyNode {
  cls: Class;
  parents?: dependencyNode[];
  dependents?: dependencyNode[];
}

interface dependencyTreeResult {
  tree: dependencyNode[];
  loadSequence: dependencyNode[];
}

const dependencyMap = new CustomMap<Class, dependencyNode>(); 

export function calcDependencyTree(classes: Class[]): dependencyTreeResult {
  const tree: dependencyNode[] = [];

  classes.forEach(cls => {
    if (dependencyMap.has(cls)) return;

    const node: dependencyNode = { cls };
    const deps: DependencyConfig[] = Reflect.getMetadata("DEP", cls) ?? [];
    console.log(cls, deps)

    if (deps.length === 0) {
      tree.push(node);
    }

    deps.forEach(dep => {
      const parentNode = dependencyMap.getWithDefault(dep.dep, {
        cls: dep.dep,
        dependents: [],
      });

      parentNode.dependents ? parentNode.dependents.push(node) : parentNode.dependents = [node];
      dependencyMap.set(cls, parentNode);
      node.parents = node.parents ? [...node.parents, parentNode] : [parentNode];
    });
    dependencyMap.setNX(cls, node);
  });

  function getSequence(node: dependencyNode): dependencyNode[] {
    const result: dependencyNode[] = [];
    result.push(node);
    node.dependents?.forEach(n => result.push(...getSequence(n)));
    return result;
  }
  const loadSequence: dependencyNode[] = tree.reduce<dependencyNode[]>((prev, curr) => [...prev, ...getSequence(curr)], []);

  return {
    tree,
    loadSequence,
  };
}

