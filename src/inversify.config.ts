import { Container } from "inversify";
import { makeProvideDecorator } from "inversify-binding-decorators";

import { ManageJson } from "./services/types";
import { HelloWorld } from "./hello/hello-world";
import { HelloService } from "./services/hello-service";

export var myContainer = new Container();
export var provide = makeProvideDecorator(myContainer);

myContainer.bind<ManageJson>("HelloService").to(HelloService);
myContainer.bind<HelloWorld>("HelloWorld").to(HelloWorld);

export default {
    myContainer,
    provide
}