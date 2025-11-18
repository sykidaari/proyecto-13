import { Schema } from 'mongoose';

// SCHEMA-BUILDER

export const buildSchema = (fields, collection, extraOptions = {}) =>
  new Schema(fields, {
    timestamps: true,
    collection,
    ...extraOptions
  });

export const requiredString = { type: String, required: true, trim: true };

// gets ref
export const ref = (model, required = false) => ({
  type: Schema.Types.ObjectId,
  ref: model,
  required
});

export const userRefRequired = ref('User', true);
export const userRef = ref('User');

export const mediaRef = ref('Media');
