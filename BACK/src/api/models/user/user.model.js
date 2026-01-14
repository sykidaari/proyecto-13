import { model, Schema } from 'mongoose';
import { buildSchema, requiredString } from '../../../utils/modelUtils.js';
import { hash } from 'bcrypt';
import ERR from '../../../constants/domain/errorCodes.js';
import { LANGUAGE_CODES } from '../../../constants/domain/languages.js';
import { COUNTRY_CODES } from '../../../constants/domain/countriesAndServices.js';

// PUBLIC FIELDS HAVE SELECT:TRUE(DEFAULT, NOT WRITTEN) WHILE FIELDS THAT ARE MEANT FOR CURRENT-USER/ADMIN HAVE SELECT:FALSE AND ARE SELECTED IN CONTROLLERS WHEN NEEDED

const UserSchema = buildSchema(
  {
    role: {
      ...requiredString,
      enum: ['admin', 'user'],
      default: 'user',
      select: false
    },

    userName: {
      ...requiredString,
      unique: true,
      lowercase: true,
      match: [
        /^(?![.])[a-z0-9._]+$/,
        ERR.user.validation.wrongUserNameFormat
        // username can contain only lowercase letters, numbers, dots (.), and underscores (_)
      ],
      minlength: 3,
      maxlength: 30
    },

    emailAddress: {
      ...requiredString,
      unique: true,
      lowercase: true,
      minlength: 3,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        ERR.user.validation.wrongEmailFormat
      ],
      select: false
    },

    nickName: { ...requiredString, minlength: 3, maxlength: 30 },

    password: {
      ...requiredString,
      minlength: 8,
      maxlength: 100,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        ERR.user.validation.wrongPasswordFormat
        // password must contain at least one uppercase letter, one lowercase letter and one number
      ],
      select: false
    },

    countryCode: {
      ...requiredString,
      enum: COUNTRY_CODES,
      select: false
    },

    languageCode: {
      preferred: {
        ...requiredString,
        enum: LANGUAGE_CODES,
        select: false
      }
    },

    img: { type: String, trim: true },

    accountSettings: {
      type: new Schema(
        {
          isSharedInfo: {
            watchList: { type: Boolean, default: true },
            favorites: { type: Boolean, default: true }
          },
          tutorialCompleted: { type: Boolean, default: true }
        },
        { _id: false }
      ),
      select: false,
      default: {}
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

const User = model('User', UserSchema);

export default User;
