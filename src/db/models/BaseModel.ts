import { Model } from 'sequelize-typescript';
import _ from 'lodash';

export abstract class BaseModel<T> extends Model<BaseModel<T>> {

   public readonly HIDDEN_FIELDS: Array<string> = [];

   public static filterQuery(query: any): any {
      return _.pick(query, _.keys(this.attributes));
   }

   public static cleanInput(input: any): any {
      return _.chain(input)
         .pick(_.keys(this.attributes))
         .omit('id')
         .value();
   }

   public toJSON(): any {
      let newUser = this.get({ plain: true, clone: true });

      this.HIDDEN_FIELDS.forEach((field) => {
         delete newUser[field];
      });

      return newUser;
   }

}
