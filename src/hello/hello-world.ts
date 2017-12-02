import { decorate, injectable, inject } from "inversify";
import "reflect-metadata";

import { myContainer } from "../inversify.config";

import * as express from 'express';
import { ManageJson } from "../services/types";

export class HelloWorld {

  private _service: ManageJson = myContainer.get<ManageJson>("HelloService");

  constructor (exp: any) {
    let router = express.Router();
    let that = this;
    console.info('autowired', this._service);

    router.get('/', (req, res) => {
      res.json(this._service.hit())});
    exp.use('/', router);
  }

  check() {
    console.info('autowired', this._service);
  }

}

export default HelloWorld;
