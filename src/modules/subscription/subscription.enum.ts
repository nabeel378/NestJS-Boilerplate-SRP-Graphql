import { registerEnumType } from '@nestjs/graphql'

export enum SubscriptionType {
  Individual = 'Individual',
  Business = 'Business'
}

registerEnumType(SubscriptionType, {
  name: 'SubscriptionType'
})
