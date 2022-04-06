import { bootstrap } from "./bootstrap";
import { Controller, Inject, Injectable, Module } from "./decorators";

@Injectable()
class InjectableB {
  public hello() {
    console.log("Hello DI");
  }
}

@Injectable()
export class InjectableC {
  constructor(@Inject(InjectableB) private b: InjectableB) {}

  public helloWorld() {
    this.b.hello();
  }
}

@Controller("/hello")
export class ControllerA {
  constructor(@Inject(InjectableC) c: InjectableC) {
    c.helloWorld();
  }
}

@Module({
  injects: [InjectableB, InjectableC],
  controllers: [ControllerA]
})
export class ModuleA {

}

bootstrap()

