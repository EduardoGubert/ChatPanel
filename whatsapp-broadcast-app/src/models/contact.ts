import { Schema, model, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  phone: string;
  groups?: string[];
}

const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  groups: [{ type: String }]
});

export default model<IContact>('Contact', ContactSchema);
