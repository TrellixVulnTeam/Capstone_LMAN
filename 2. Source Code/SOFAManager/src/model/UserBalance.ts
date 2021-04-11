import { Balance } from "./balance";

export class UserBalance {
    totalBalance: number;
    listBalance: Array<Balance> = new Array<Balance>();

    constructor() {
    }
}