import * as express from 'express';
import HelloWorld from './hello/hello-world';

import { myContainer } from "./inversify.config";

import { ManageJson } from "./services/types";
import { HelloService } from "./services/hello-service";

export default class App {
  public express: any;

  constructor () {
    myContainer.isBound("HelloService");
    let service: ManageJson = myContainer.get<ManageJson>("HelloService");
    console.info(service.hit());

    this.express = express();
    let cl = new HelloWorld(this.express);
    cl.check();
  }

  listen(port: number): void {
    this.express.listen(port, (err) => {
      if (err) {
        return console.log(err)
      }
    
      return console.log(`server is listening on ${port} ...`)
    });
  }
}
