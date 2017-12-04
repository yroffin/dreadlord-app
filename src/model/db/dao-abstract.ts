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

export class AbstractDao<T> {

    private mogodb: Mongodb;
    protected schema: mongoose.Schema;
    protected entity: mongoose.model;

    /**
     * constructor
     * @param _schemaStructure 
     */
    constructor(
        protected _schemaStructure: any,
        private _modelName: string) {
    }

    /**
     * init
     * @param _mongoose init
     */
    protected init(_mongoose: Mongodb) {
        // check connection
        this.mogodb = _mongoose;
        _mongoose.info();

        // create schema
        this.schema = new mongoose.Schema(this._schemaStructure);

        // the schema is useless so far
        // we need to create a model using it
        this.entity = mongoose.model(this._modelName, this.schema);
    }

    /**
     * create entity
     * @param bean
     */
    create(bean: T): Observable<T> {
        let beans: Subject<T> = new Subject<T>();
        // create a new user called chris
        var tuple = new this.entity(bean);
        // call the built-in save method to save to the database
        tuple.save((err) => {
            if (err) {
                console.log(this._modelName + ' was not saved successfully!', err);
                beans.next(bean);
                return;
            }
            console.log(this._modelName + ' saved successfully!');
            beans.next(bean);
        });
        return beans;
    }

    /**
     * 
     * @param source field copy
     */
    private copy(source: any): T {
        let res: T = <T> {};
        _.each(this._schemaStructure, (value, key) => {
            res[key] = eval("source." + key);
        });
        return res;
    }

    /**
     * find all
     */
    findAll(): Observable<Array<T>> {
        let beans: Subject<Array<T>> = new Subject<Array<T>>();
        Observable.fromPromise(this.entity.find().exec()).subscribe((result: Array<any>) => {
            let tx = new Array<T>();
            _.each(result, (element) => {
                tx.push(this.copy(element));
            });
            beans.next(tx);
        });
        return beans;
    }

    /**
     * find raw
     * @param query
     */
    findOneRaw(query: object): Subject<T> {
        let bean: Subject<T> = new Subject<T>();
        Observable.fromPromise(this.entity.findOne(query).exec()).subscribe((result: any) => {
            bean.next(this.copy(result));
        });
        return bean;
    }
}

export default AbstractDao;
