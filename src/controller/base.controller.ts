import { BaseUuidLog } from "../api-doc/base.uuid";

export abstract class BaseController extends BaseUuidLog {
    
    constructor(    
    ) {
        super();
    }

    protected abstract createLogUuid(): Promise<void>;

}
