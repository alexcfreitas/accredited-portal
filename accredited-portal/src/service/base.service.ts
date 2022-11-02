import { Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { BaseUuidLog } from '../api-doc/base.uuid';

export class BaseService extends BaseUuidLog {
  
    protected logger : Logger;
  
    constructor(
        protected entityManagerBase: EntityManager,
    ) {
        super();
    }

    protected async getSequence(owner:string, sequenceName:string): Promise<number> {

        this.logger.log(`${this.uuidLog}::getSequence::Entrada::Obtendo a sequencia [${owner}.${sequenceName}]`);

        let sequencial : number;
        const result = await this.entityManagerBase.query(`SELECT ${owner}.${sequenceName}.NEXTVAL AS SEQ FROM DUAL`)
        if (result[0].SEQ) {
            sequencial = result[0].SEQ;
        } else {
            this.logger.error(`${this.uuidLog}::getSequence::Nao foi possivel oter a sequencia`);
            throw new Error('Nao foi possivel obter a sequencia');
        }

        this.logger.log(`${this.uuidLog}::getSequence::Saida`);

        return sequencial;   
    }

}
