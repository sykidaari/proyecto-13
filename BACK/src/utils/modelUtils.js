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

// can't name isNew, isNew is reserved by mongoose
export const isNewItem = { type: Boolean, default: true, required: true };

// gets ref
export const ref = (model, type = Schema.Types.ObjectId) => ({
  type,
  ref: model
});

export const userRef = ref('User');
export const userRefRequired = { ...userRef, required: true };
export const userRefRequiredUnique = { ...userRefRequired, unique: true };

export const mediaRef = ref('Media', String);
export const sessionRef = ref('Session');
