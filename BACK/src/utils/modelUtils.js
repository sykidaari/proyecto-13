import { Schema } from 'mongoose';

// SCHEMA-BUILDERS

export const buildSchema = (fields, collection, extraOptions = {}) =>
  new Schema(fields, {
    timestamps: true,
    collection,
    ...extraOptions
  });

export const buildUserChildSchema = (fields, collection, extraOptions = {}) =>
  buildSchema(
    {
      user: userRefRequiredUnique,
      ...fields
    },
    collection,
    extraOptions
  );

export const requiredString = { type: String, required: true, trim: true };

// gets ref
export const ref = (model, required = false, unique = false) => ({
  type: Schema.Types.ObjectId,
  ref: model,
  required,
  unique
});

export const userRefRequiredUnique = ref('User', true, true);
export const userRef = ref('User');

export const mediaRef = ref('Media');
