import { model } from 'mongoose';
import { buildSchema, requiredString } from '../../../utils/modelUtils';
import { hash } from 'bcrypt';

const UserSchema = buildSchema(
  {
    role: {
      ...requiredString,
      enum: ['admin', 'user'],
      default: 'user'
    },
    userName: {
      ...requiredString,
      unique: true,
      lowercase: true,
      match: [
        /^(?![.])[a-z0-9._]+$/,
        'Invalid username format. Username can contain only lowercase letters, numbers, dots (.), and underscores (_).'
      ],
      minlength: 3,
      maxlength: 30
    },
    emailAddress: {
      ...requiredString,
      unique: true,
      lowercase: true,
      minlength: 3,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format']
    },
    nickName: { ...requiredString, minlength: 3, maxlength: 30 },
    password: {
      ...requiredString,
      minlength: 8,
      maxlength: 100,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        'invalid password format. Password must contain at least one uppercase letter, one lowwercase letter and one number'
      ]
    },
    country: { ...requiredString },
    languageCode: { ...requiredString, minlength: 2, maxlength: 2 },

    img: { type: String, trim: true },

    accountSettings: {
      // is sharedInfo shared only with friends or everyone
      isPublicAccount: boolean,

      // what info is shared with others
      isSharedInfo: {
        watchList: Boolean,
        favorites: Boolean,
        friends: Boolean,
        country: Boolean
      }
    }
  },
  'users'
);

UserSchema.pre('save', async function () {
  // only hash if password is new or modified
  if (!this.isModified('password')) return;

  // using async-hash to avoid blocking entire server
  this.password = await hash(this.password, 10);
});

const User = model('User', UserSchema, 'users');

export default User;
