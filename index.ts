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

@Injectable()
class InjectableBandC {
  constructor(@Inject(InjectableB) b: InjectableB, @Inject(InjectableC) c: InjectableC) { }
}
@Controller("/hello")
export class ControllerA {
  constructor(@Inject(InjectableC) c: InjectableC) {
    c.helloWorld();
  }
}

@Module({
  injects: [InjectableB, InjectableC, InjectableBandC],
  controllers: [ControllerA]
})
export class ModuleA {

}

bootstrap()

