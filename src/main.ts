import { NestFactory } from '@nestjs/core'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger'

import { version } from '../package.json'
import { App } from './app'

const configureApp = (app: INestApplication) => {
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
}

const configureSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Mit-e-Kat')
    .setDescription('Mit-e-Kat: meetup managing application.')
    .setVersion(version)
    .build()
  const document = SwaggerModule.createDocument(app, config)

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  }

  SwaggerModule.setup('api/swagger', app, document, customOptions)
}

const bootstrap = async () => {
  const app = await NestFactory.create(App)

  configureApp(app)
  configureSwagger(app)

  await app.listen(5000)
}

bootstrap()
