const ERROR_CODES = {
  access: {
    alreadyLoggedIn: 'ACCESS_ALREADY_LOGGED_IN',
    unauthorized: 'ACCESS_UNAUTHORIZED',
    adminRequired: 'ACCESS_ADMIN_REQUIRED',
    notParticipantOrAdmin: 'ACCESS_NOT_PARTICIPANT_OR_ADMIN',
    notSelf: 'ACCESS_NOT_SELF',
    notSelfOrAdmin: 'ACCESS_NOT_SELF_OR_ADMIN'
  },

  body: {
    missingBody: 'BODY_MISSING',
    missingField: 'BODY_MISSING_FIELD',
    invalidField: 'BODY_INVALID_FIELD'
  },

  user: {
    notFound: 'USER_NOT_FOUND',
    validation: {
      wrongUserNameFormat: 'USER_WRONG_EMAIL_FORMAT',
      wrongEmailFormat: 'USER_WRONG_EMAIL_FORMAT',
      wrongPasswordFormat: 'USER_WRONG_PASSWORD_FORMAT',
      missingCredentials: 'USER_MISSING_CREDENTIALS'
    },
    auth: {
      incorrectCredentials: 'USER_INCORRECT_CREDENTIALS',
      incorrectPassword: 'USER_INCORRECT_PASSWORD'
    },
    img: {
      noneUploaded: 'NO_FILE_UPLOADED',
      noneToDelete: 'NO_PROFILE_PICTURE_TO_DELETE'
    }
  },

  request: {
    notFound: {
      request: 'REQUEST_NOT_FOUND',
      senderDoc: 'REQUEST_SENDER_DOC_NOT_FOUND',
      affectedSenderDoc: 'REQUEST_AFFECTED_SENDER_DOC_NOT_FOUND',
      recipientDoc: 'REQUEST_RECIPIENT_DOC_NOT_FOUND',
      affectedRecipientDoc: 'REQUEST_AFFECTED_RECIPIENT_DOC_NOT_FOUND'
    },
    conflict: {
      recipientAlreadyInvited: 'REQUEST_RECIPIENT_ALREADY_INVITED',
      alreadyExists: 'REQUEST_ALREADY_EXISTS',
      uniqueViolation: 'REQUEST_UNIQUE_CONNECTION_VIOLATION'
    },
    invalid: {
      invalidType: 'REQUEST_INVALID_TYPE',
      tooManyRecipients: 'REQUEST_TOO_MANY_RECIPIENTS',
      multiNotAllowed: 'REQUEST_MULTIPLE_NOT_ALLOWED',
      notFriend: 'REQUEST_RECIPIENT_NOT_FRIEND'
    }
  },
  session: {
    notFound: 'SESSION_NOT_FOUND',
    validation: { tooManyParticipants: 'SESSION_TOO_MANY_PARTICIPANTS' }
  },

  userChild: {
    notFound: {
      item: 'USER_CHILD_ITEM_NOT_FOUND'
    },

    conflict: {
      alreadyExists: 'USER_CHILD_ITEM_ALREADY_EXISTS'
    },

    invalid: {
      notInList: 'USER_CHILD_ITEM_NOT_IN_LIST'
    }
  },

  system: {
    duplicateValue: 'SYSTEM_DUPLICATE_VALUE',
    invalidIdFormat: 'SYSTEM_INVALID_ID_FORMAT',
    validationFailed: 'SYSTEM_VALIDATION_FAILED',
    jwtInvalid: 'SYSTEM_JWT_INVALID',
    jwtExpired: 'SYSTEM_JWT_EXPIRED',
    fileTooLarge: 'SYSTEM_FILE_TOO_LARGE',
    serverError: 'SYSTEM_SERVER_ERROR',

    cloudinaryDeleteFailed: 'CLD_DELETE_FAILED'
  }
};

export default ERROR_CODES;
