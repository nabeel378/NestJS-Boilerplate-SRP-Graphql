import { Module, ValidationPipe } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default' //was 'apollo-server-core'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { SubscriptionModule } from './modules/subscription/subscription.module'
import { PlanModule } from './modules/plan/plan.module'
import { APP_PIPE } from '@nestjs/core'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/core/environments/${process.env.NODE_ENV}.env`
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
      { dbName: process.env.DB_NAME }
    ),
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
    SubscriptionModule,
    PlanModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
