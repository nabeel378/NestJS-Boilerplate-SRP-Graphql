import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as chalk from 'chalk'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './common/utils/http-exception.filter'

async function bootstrap() {
  const PORT = 3000
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(PORT)

  const LOGO = `
  ░▒█▀▀▀█░▄▀▀▄░█▀▀▄░█▀▀▄░█░▄
  ░░▀▀▀▄▄░█▄▄█░█▄▄█░█▄▄▀░█▀▄
  ░▒█▄▄▄█░█░░░░▀░░▀░▀░▀▀░▀░▀
 `
  console.log(
    `\n\n\n\n\n\n${chalk.greenBright.bold(LOGO)}
  \n   ${chalk.red.bold('❤️')}  ${chalk.yellow.bold(
      'Spark',
    )} 🖥️ 🚀 Server 🏁 is 🆙 on 🚪 port ${PORT} 🔌  in 🚧 ${
      process.env.NODE_ENV
    } 🏭\n `,
    chalk.blue.bold.underline(`localhost:${PORT}/`),
    '\n',
  )
}
bootstrap()
