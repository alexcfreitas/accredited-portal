import { ApiProperty } from "@nestjs/swagger";

export class MensagemRetorno  {

    @ApiProperty()
    public codigo: number;
  
    @ApiProperty()
    public mensagem: string;

}

export class ServiceMessage  {

    @ApiProperty()
    public codigo: number;

    @ApiProperty()
    public mensagemRetorno: Array<MensagemRetorno>;

}

export class ResponseBase {

    @ApiProperty()
    public serviceMessage: ServiceMessage;

}



