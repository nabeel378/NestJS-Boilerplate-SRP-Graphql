import { registerEnumType } from '@nestjs/graphql'

export enum Status {
  Active = 'Active',
  InActive = 'InActive'
}

export enum OrgType {
  Individual = 'individual',
  business = 'business'
}

registerEnumType(Status, {
  name: 'Status'
})
