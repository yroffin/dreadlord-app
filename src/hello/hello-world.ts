/* 
 * Copyright 2017 Yannick Roffin.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 import { Singleton, AutoWired, Inject } from "typescript-ioc";

import * as express from 'express';

import { ExpressWrapper } from "../express/express-wrapper";
import { HelloService } from "../services/hello-service";

@Singleton 
export class HelloWorld {

  @Inject
  private _express: ExpressWrapper;

  @Inject
  private _service: HelloService;

  constructor () {
  }

  public init () {
    /**
     * get
     */
    this._express.getApp().get('/', (req, res) => {
        res.json(this._service.hit());
      }
    );
  }

}

export default HelloWorld;
