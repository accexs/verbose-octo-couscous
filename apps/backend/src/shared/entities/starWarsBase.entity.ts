import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class StarWarsBase {
  _id?: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  extId: string;
}
