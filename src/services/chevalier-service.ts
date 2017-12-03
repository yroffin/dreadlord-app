
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

import { ChevalierDao } from '../model/db/dao-chevalier';

@Singleton
export class ChevalierService {

    @Inject
    private _chevalier: ChevalierDao;

    public create(name: string) {
        let chevalier: ChevalierBean = {
            name: name
        };

        this._chevalier.create(chevalier);

        return chevalier;
    }
    public get(name: string) {
        let chevalier = this._chevalier.get(name);
        return chevalier;
    }
}

export default ChevalierService;
