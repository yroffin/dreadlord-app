import { injectable, Container } from "inversify";
import "reflect-metadata";

import { ManageJson } from "./types"

@injectable()
export class HelloService implements ManageJson {

    private value: any = {
        message: 'Hello World!!!',
        res: "rrr"
    };

    public hit() {
        this.value.message = this.value.message + '!';
        return this.value;
    }
}

export default HelloService;