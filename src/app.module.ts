import { Module } from '@nestjs/common'
import { SubscriptionResolver } from './modules/subscription/subscription.resolver'
import { SubscriptionService } from './modules/subscription/subscription.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default' //was 'apollo-server-core'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { SubscriptionModule } from './modules/subscription/subscription.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/core/enviroments/${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
      { dbName: process.env.DB_NAME },
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    SubscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
