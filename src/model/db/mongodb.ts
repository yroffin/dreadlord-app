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
import * as mongodb from 'mongodb';
import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';

@Singleton
export class Mongodb {

  constructor() {
    mongoose.Promise = bluebird;
    mongoose.connect('mongodb://localhost:27017/db', { useMongoClient: true })
    .then(function(){
      console.log(" Connected to dbName ");
    }).catch(err => console.error(err));
  }

  info(): void {
  }
}

export default Mongodb;
