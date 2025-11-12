import mongoose from 'mongoose';
import { requiredString } from '../../utils/modelUtils';

const userSchema = new mongoose.Schema(
  {
    account: {
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
      img: { type: String, trim: true }
    },
    favorites: {
      genres: [
        { type: mongoose.Schema.Types.ObjectId, ref: '', required: true }
      ],
      media: {
        series: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
          }
        ],
        movies: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
          }
        ]
      }
    }
  },
  { timestamps: true, collection: 'users' }
);

const User = mongoose.model('user', userSchema, 'users');

export default User;
