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

// grab the things we need
import * as mongoose from 'mongoose';

import Mongodb from './mongodb';

@Singleton
export class ChevalierDao {

  @Inject
  private _mongoose: Mongodb;

  private schema: mongoose.Schema;
  private entity: mongoose.model;

  constructor() {
    this._mongoose.info();
    this.schema = new mongoose.Schema({
      name: { type: String, required: true, unique: true },
      created_at: Date,
      updated_at: Date
    });

    // the schema is useless so far
    // we need to create a model using it
    this.entity = mongoose.model('Chevalier', this.schema);
  }

  create(chevalier: ChevalierBean) {
    // create a new user called chris
    var tuple = new this.entity(chevalier);
    // call the built-in save method to save to the database
    tuple.save((err) => {
      if (err) {
        console.log('Chevalier was not saved successfully!', err);
        return;
      }
      console.log('Chevalier saved successfully!');
    });
  }

  get(name: string): ChevalierBean {
    var result = this.entity.findOne({ 'name': name });
    return result;
  }
}

export default ChevalierDao;
