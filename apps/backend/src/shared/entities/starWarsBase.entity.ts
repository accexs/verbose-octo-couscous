import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class StarWarsBase {
  @Prop({ required: true })
  extId: string;
}
