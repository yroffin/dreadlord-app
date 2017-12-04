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
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

// grab the things we need
import * as mongoose from 'mongoose';

import Mongodb from './mongodb';
import { AbstractDao } from './dao-abstract';

@Singleton
export class ChevalierDao extends AbstractDao<ChevalierBean> {

  @Inject
  private _mongoose: Mongodb;

  /**
   * constructor
   */
  constructor() {
    super({
      name: { type: String, required: true, unique: true },
      created_at: Date,
      updated_at: Date
    }, 'Chevalier');

    this.init(this._mongoose);
  };

  /**
   * 
   * @param name find one element
   */
  public findOne(name: string): Subject<ChevalierBean> {
    return this.findOneRaw({ 'name': name });
  }
}

export default ChevalierDao;
