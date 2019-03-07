import { Column, Table, DataType, Default, AllowNull } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';

@Table({ tableName: 'Congregation' })
export class Congregation extends BaseModel<Congregation> {

   @AllowNull(false)
   @Column
   public name: string;

   @Column
   public address: string;

   @Column
   public zip: string;

   @Column
   public city: string;

   @Column
   public state: string;

   @AllowNull(false)
   @Column(DataType.DECIMAL(20, 16))
   public khLat: number;

   @AllowNull(false)
   @Column(DataType.DECIMAL(20, 16))
   public khLng: number;

   @Column
   public campaignMode: boolean;

   @Column
   public campaignEndDate: Date;

   @AllowNull(false)
   @Default(true)
   @Column
   public pubsCanCheckout: boolean;

   @AllowNull(false)
   @Column
   public territoryDesign: number;

   @AllowNull(false)
   @Default(true)
   @Column({
      field: 'IsActive',
   })
   public active: boolean;

}
