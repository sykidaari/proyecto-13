const TEXTS = {
  en: {
    ui: {
      slogan: { 1: 'Match what to watch.', 2: 'Together.' },
      form: {
        validation: { required: 'This field is required.' },
        fields: {
          password: { label: 'Password' },
          stayLoggedIn: 'Keep me logged in on this device'
        }
      },
      error: {
        serverProblem:
          'Something went wrong, please refresh the page or try again later.'
      }
    },

    features: {
      user: {
        userFormParts: {
          next: 'Next',
          locale: {
            labels: { country: 'Country', language: 'Language' }
          },
          email: {
            label: 'Email',
            validation: 'Enter a valid email address.',
            alreadyExists: 'This email is already in use.'
          },
          names: {
            userName: {
              label: 'Username',
              explanation:
                'Your username must be unique, and it can contain only lowercase letters, numbers, dots ( . ), and underscores ( _ )',
              validation: 'Incorrect username format.',
              alreadyExists: 'This username is already in use.'
            },
            nickName: { label: 'Nickname' },

            tooShort: 'Must be at least 3 characters long',
            tooLong: "Can't be over 30 characters long"
          },
          password: {
            password: {
              label: 'Password',
              tooShort: 'Must be at least 8 characters long',
              tooLong: "Can't be over 100 characters long",
              validation: 'Incorrect password format.',
              explanation:
                'Password must contain at least one uppercase letter, one lowercase letter and one number'
            },
            confirmPassword: {
              label: 'Confirm your password',
              doesNotMatch: 'The passwords do not match'
            }
          },
          img: {
            label: 'Profile picture',
            tooBig: 'File is too large (max 5MB).',
            wrongFormat: 'Only JPG, PNG, or WEBP formats are allowed.'
          }
        }
      }
    },

    layouts: {
      public: {
        nav: { feature: 'Feature' },
        footer: {
          devMessage: {
            1: 'Developed by',
            2: 'Demo App',
            3: 'For Showcase Purposes Only'
          }
        }
      }
    },

    pages: {
      public: {
        landing: {
          login: 'Login',
          register: 'Join now'
        }
      },
      auth: {
        login: {
          title: 'Login',
          rememberedUsers: {
            welcomeBack: {
              title: 'Welcome Back!',
              text: "Find your next great watch. Sign in to discover movies and series you'll enjoy together."
            },
            forgetAccount: 'Forget this account',
            otherAccount: 'Login using another account'
          },
          form: {
            labels: { userNameOrEmail: 'Username or Email' },

            errors: {
              userNotFound:
                'We couldn’t find an account with the provided details.',
              incorrectCredentials:
                'The email/username and password do not match.'
            }
          },
          switchNav: { text: 'New to Popcorn?', linkText: 'Join Now' }
        },
        register: {
          legends: {
            locale:
              'Please confirm your country and your preferred display language.',
            email: 'Please provide your email address',
            names: 'Choose a username and a nickname',
            password: 'Choose a secure password',
            img: 'Upload a profile picture (optional)'
          },
          skipAndFinish: 'Skip and finish registering',
          finish: 'Finish registering'
        }
      }
    }
  },
  es: {}
};

export default TEXTS;
