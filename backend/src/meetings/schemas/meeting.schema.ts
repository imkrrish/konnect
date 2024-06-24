import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { generateSlug } from '../utils';

@Schema({ timestamps: true })
export class Meeting extends Document {
  @Prop({ unique: true, default: () => generateSlug() })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  host: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User', required: false })
  participants: Types.ObjectId[];

  @Prop({ required: false })
  startTime: Date;

  @Prop({ required: false })
  endTime: Date;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
