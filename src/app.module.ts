import { Module, ValidationPipe } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default'
import { ConfigModule } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/core/environments/${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: (process.env.DB_PORT as unknown as number) ?? 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [join(__dirname, './**/**/*.entity{.ts,.js}')],
      synchronize: (process.env.DB_SYNC as unknown as boolean) ?? false,
      ssl: (process.env.DB_SSL as unknown as boolean) ?? false,
      extra: {
        ssl: { rejectUnauthorized: process.env.DB_REJECT_AUTHORIZED ?? true }
      },
      logging: (process.env.DB_LOGGING as unknown as boolean) ?? true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      driver: ApolloDriver,
      playground: false,
      plugins:
        process.env.GRAPHQL_PLAYGROUND == 'true'
          ? process.env.NODE_ENV === 'production'
            ? [
                ApolloServerPluginLandingPageProductionDefault({
                  graphRef: 'my-graph-id@my-graph-variant',
                  footer: false
                })
              ]
            : [ApolloServerPluginLandingPageLocalDefault({ footer: false })]
          : []
    }),
    UserModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
