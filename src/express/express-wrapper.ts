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

@Singleton 
export class ExpressWrapper {

  private app: express;
  
  constructor () {
    console.log(`construct express`);
    this.app = express();
  }

  public router(): express.Router {
    return express.Router();
  }

  public ignite(port: number): void {
    console.log(`server will listening on ${port} ...`);

    this.app.listen(port, (err) => {
      if (err) {
        return console.log(err)
      }
    
      return console.log(`server is now listening on ${port} ...`);
    });
  }

  public getApp(): any {
    return this.app;
  }
}

export default ExpressWrapper;
