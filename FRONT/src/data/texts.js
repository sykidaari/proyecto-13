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
      },
      searchBar: { noResults: 'No results found' },
      next: 'Next',

      keywordSuggestions: [
        'zombie movies',
        'sci-fi thrillers',
        'romantic comedies',
        'time travel movies',
        'heist films',
        'psychological thrillers',
        'fantasy adventure',
        'cozy movies',
        'post-apocalyptic',
        'mind-bending films',
        'superhero movies',
        'space adventure'
      ]
    },

    features: {
      user: {
        relation: { self: 'Me', friend: 'Friend' },
        userFormParts: {
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
        },
        currentUser: {
          friendsSection: {
            title: 'Friends',
            noFriends: 'Your friends list is empty.',
            search: 'Search your friends'
          },
          sessionsSection: {
            title: 'Sessions',
            noSessions: "You're not part of any sessions right now."
          },
          receivedRequests: {
            from: 'From',
            noRequests: 'You have no pending requests.',
            friends: {
              title: 'Friend requests'
            },
            sessions: {
              title: 'Received session requests',
              invitationFrom: 'Invited by'
            }
          },
          sentRequests: {
            to: 'To',
            invited: 'Invited',
            noRequests: 'You have no pending sent requests.',
            sessions: {
              title: 'Sent session requests'
            }
          }
        }
      },
      media: {
        showTypes: { movie: 'Movie', series: 'Series' },
        detailsTitles: {
          releaseYear: 'Release year',
          rating: 'Rating',
          directors: 'Directors',
          creators: 'Creators',
          cast: 'Cast',
          runtime: 'Runtime',
          seasonCount: 'Seasons',
          streamingOptions: 'Stream at'
        },
        noResults: 'Sorry! No results found for your preferences.',
        noneLeft: 'Sorry! No more results match your preferences.'
      },
      people: {
        usersSearch: { placeholder: 'Find other users' },
        friendship: {
          requestFriendship: 'Send friend request',
          acceptFriendship: 'Accept friend request',
          cancelFriendRequest: 'Cancel friend request',
          rejectFriendship: 'Reject friend request',
          removeFriendship: 'Remove friend'
        }
      },
      sessions: {
        invitations: {
          sendInvitation: 'Send session invitation',
          acceptInvitation: 'Accept and join',
          rejectInvitation: 'Reject invitation',
          cancelInvitation: 'Cancel session invitation'
        },
        openSession: 'Open Session',
        createSession: 'Create new session',
        noFriends:
          'You have no friends yet! Add friends first to start a session',
        session: {
          untitled: 'Untitled session',

          invite: {
            title: 'Invite friends',
            maxAmount: 'Sessions can have up to 6 participants'
          },
          parameters: {
            title: 'Design your session',
            name: {
              legend: 'Name your session (optional)',
              tooShort: 'Must be at least 3 characters long',
              tooLong: "Can't be over 30 characters long"
            },
            mediaType: {
              legend: 'What shows do you want to see?',
              options: { all: 'All', movie: 'Movies', series: 'Series' }
            },
            genres: {
              legend: 'Choose genres (optional — defaults to all)',
              info: 'Fewer genres make results more focused.',
              options: {
                action: 'Action',
                adventure: 'Adventure',
                animation: 'Animation',
                comedy: 'Comedy',
                crime: 'Crime',
                documentary: 'Documentary',
                drama: 'Drama',
                family: 'Family',
                fantasy: 'Fantasy',
                history: 'History',
                horror: 'Horror',
                music: 'Music',
                mystery: 'Mystery',
                news: 'News',
                reality: 'Reality',
                romance: 'Romance',
                scifi: 'SciFi',
                talk: 'Talk',
                thriller: 'Thriller',
                war: 'War',
                western: 'Western'
              }
            },
            keyword: {
              legend: 'Write down any additional keywords (optional)'
            },
            services: {
              legend: 'Select platforms to filter results (optional)'
            },
            country: {
              legend: 'Select country (required if platforms are selected)',
              info: "Availability varies by country. Select which country's platforms to check for this session."
            }
          },
          create: 'Create',
          created: {
            title: 'Session created! Now waiting for others to join.',
            button: 'Ok!'
          },
          participants: 'Participants',
          menu: {
            open: 'Open menu',
            close: 'Close menu',
            sessionDetails: 'Session details',
            sessionOptions: {
              title: 'Options',
              options: {
                leaveSession: {
                  title: 'Leave session',
                  confirmation: 'Are you sure you wish to leave this session?',
                  yes: 'Yes, leave',
                  no: 'No, stay'
                }
              }
            },
            matchedMedias: {
              title: 'Matched shows',
              none: "You've matched no medias yet. Keep swiping!"
            }
          },
          newMatch: 'NEW MATCH!'
        }
      },
      isNewItem: 'NEW',
      isUpdatedItem: 'NEW ACTIVITY'
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
      },
      private: {
        pageTitles: {
          discover: 'Discover',
          people: 'People',
          sessions: 'Sessions',
          // notifications: 'Notifications',
          profile: 'Profile'
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
          finish: 'Finish registering',
          errors: {
            loginProblem:
              'Account created, but automatic login failed. Please login manually'
          }
        }
      }
    }
  },
  es: {
    ui: {
      slogan: { 1: 'Encuentra qué ver.', 2: 'Juntos.' },
      form: {
        validation: { required: 'Este campo es obligatorio.' },
        fields: {
          password: { label: 'Contraseña' },
          stayLoggedIn: 'Mantener sesión iniciada en este dispositivo'
        }
      },
      error: {
        serverProblem:
          'Algo salió mal. Por favor, actualiza la página o inténtalo de nuevo más tarde.'
      }
    },

    features: {
      user: {
        userFormParts: {
          next: 'Siguiente',
          locale: {
            labels: { country: 'País', language: 'Idioma' }
          },
          email: {
            label: 'Correo electrónico',
            validation: 'Introduce una dirección de correo válida.',
            alreadyExists: 'Este correo ya está en uso.'
          },
          names: {
            userName: {
              label: 'Nombre de usuario',
              explanation:
                'Tu nombre de usuario debe ser único y solo puede contener letras minúsculas, números, puntos ( . ) y guiones bajos ( _ )',
              validation: 'Formato de nombre de usuario incorrecto.',
              alreadyExists: 'Este nombre de usuario ya está en uso.'
            },
            nickName: { label: 'Apodo' },

            tooShort: 'Debe tener al menos 3 caracteres',
            tooLong: 'No puede tener más de 30 caracteres'
          },
          password: {
            password: {
              label: 'Contraseña',
              tooShort: 'Debe tener al menos 8 caracteres',
              tooLong: 'No puede tener más de 100 caracteres',
              validation: 'Formato de contraseña incorrecto.',
              explanation:
                'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número'
            },
            confirmPassword: {
              label: 'Confirma tu contraseña',
              doesNotMatch: 'Las contraseñas no coinciden'
            }
          },
          img: {
            label: 'Foto de perfil',
            tooBig: 'El archivo es demasiado grande (máx. 5MB).',
            wrongFormat: 'Solo se permiten formatos JPG, PNG o WEBP.'
          }
        }
      }
    },

    layouts: {
      public: {
        nav: { feature: 'Funcionalidades' },
        footer: {
          devMessage: {
            1: 'Desarrollado por',
            2: 'App de demostración',
            3: 'Solo con fines de exhibición'
          }
        }
      }
    },

    pages: {
      public: {
        landing: {
          login: 'Iniciar sesión',
          register: 'Únete ahora'
        }
      },
      auth: {
        login: {
          title: 'Iniciar sesión',
          rememberedUsers: {
            welcomeBack: {
              title: '¡Bienvenido de nuevo!',
              text: 'Encuentra tu próxima película o serie. Inicia sesión para descubrir qué ver juntos.'
            },
            forgetAccount: 'Olvidar esta cuenta',
            otherAccount: 'Iniciar sesión con otra cuenta'
          },
          form: {
            labels: { userNameOrEmail: 'Nombre de usuario o correo' },
            errors: {
              userNotFound:
                'No hemos encontrado ninguna cuenta con los datos proporcionados.',
              incorrectCredentials:
                'El usuario/correo y la contraseña no coinciden.'
            }
          },
          switchNav: {
            text: '¿Nuevo en Popcorn?',
            linkText: 'Únete ahora'
          }
        },
        register: {
          legends: {
            locale:
              'Por favor, confirma tu país y tu idioma de visualización preferido.',
            email: 'Introduce tu dirección de correo electrónico',
            names: 'Elige un nombre de usuario y un apodo',
            password: 'Elige una contraseña segura',
            img: 'Sube una foto de perfil (opcional)'
          },
          skipAndFinish: 'Omitir y finalizar registro',
          finish: 'Finalizar registro'
        }
      }
    }
  }
};

export default TEXTS;
