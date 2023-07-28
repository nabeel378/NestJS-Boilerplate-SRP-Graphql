import { registerEnumType } from '@nestjs/graphql'

export enum PlanType {
  Owner = 'Owner',
  Reseller = 'Reseller'
}

registerEnumType(PlanType, {
  name: 'PlanType'
})
