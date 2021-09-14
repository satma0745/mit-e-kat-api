import { NestFactory } from '@nestjs/core'
import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { version } from '../package.json'
import { AppModule } from './app.module'

const configureSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Mit-e-Kat')
    .setDescription('Mit-e-Kat: meetup managing application.')
    .setVersion(version)
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/swagger', app, document)
}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  configureSwagger(app)
  await app.listen(3000)
}

bootstrap()
