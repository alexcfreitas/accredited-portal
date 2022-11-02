import { Injectable } from '@nestjs/common';

import * as MOCKED_RESOURCE_DATA from '../util/recurso.json';

@Injectable()
export class ResourceService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async getResource(_resourceId: string): Promise<any> {
    return {
      resource: MOCKED_RESOURCE_DATA,
    };
  }
}
