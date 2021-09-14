import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiProduces } from '@nestjs/swagger'

import { AppService } from './app.service'

@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiProduces('text/html')
  @ApiOkResponse({ description: 'Hello World!', type: String })
  getHello(): string {
    return this.appService.getHello()
  }
}

export { AppController }
