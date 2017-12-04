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

import { Observable } from 'rxjs/Observable';

import * as express from 'express';

import { ExpressWrapper } from "../express/express-wrapper";
import { ChevalierService } from "../services/chevalier-service";

@Singleton
export class ChevaliersApi {

  @Inject
  private _express: ExpressWrapper;

  @Inject
  private _service: ChevalierService;

  constructor() {
  }

  /**
   * init
   */
  public init() {
    /**
     * post
     */
    this._express.getApp().post('/api/chevaliers', (req, res) => {
      let subject: Observable<ChevalierBean> = this._service.create({
        "name": req.body.name
      });
      subject.subscribe((result) => {
        res.json(result);
      });
    });

    /**
     * get
     */
    this._express.getApp().get('/api/chevaliers', (req, res) => {
      let subject: Observable<Array<ChevalierBean>> = this._service.findAll();
      subject.subscribe((result) => {
        res.json(result);
      });
    });

    /**
     * get
     */
    this._express.getApp().get('/api/chevaliers/:id', (req, res) => {
      let subject: Observable<ChevalierBean> = this._service.findOne(req.params.id);
      subject.subscribe((result) => {
        res.json(result);
      });
    }
    );
  }

}

export default ChevaliersApi;
