import { FOLLOW_TYPE } from "./follow.constants";

export class DFollow {
    type: FOLLOW_TYPE;

    constructor(type: FOLLOW_TYPE) {
        this.type = type;
    }
}
