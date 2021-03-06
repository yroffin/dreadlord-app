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

import ExpressWrapper from './express/express-wrapper';
import HelloWorld from './hello/hello-world';
import { HelloService } from "./services/hello-service";
import { ChevaliersApi } from "./api/chevaliers";

@Singleton 
export default class App {

  @Inject
  private helloWorld: HelloWorld;
  @Inject
  private chevaliersApi: ChevaliersApi;
  @Inject
  private expressWrapper: ExpressWrapper;

  constructor (
  ) {
    this.helloWorld.init();
    this.chevaliersApi.init();
  }

  listen(port: number): void {
    this.expressWrapper.ignite(port);
  }

  getApp() {
    return this.expressWrapper.getApp();
  }
}
