# di-example
A simpliest DI(Dependency Injection) example showing how dependency injection actually works.

## How to Run
1. Install dependency with your favorite package manager. pnpm, yarn, npm etc.
2. Compile with tsc, then run `index.js`  
  OR  
  run `index.ts` with `ts-node`

## File Structure
- index.ts           - The example usage
- decorators.ts      - Decorators implementation
- dependencyTree.ts  - Dependency tree analyzing
- bootstrap.ts       - DI and IOC logic
- containers.ts      - Instance and Module container
- types.ts           - Common type declaration
