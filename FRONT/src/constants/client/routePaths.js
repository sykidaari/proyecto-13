const ROUTE_PATHS = {
  public: {
    landing: {
      rel: '',
      abs: '/'
    },
    feature: {
      rel: 'feature',
      abs: '/feature'
    }
  },
  auth: {
    login: {
      rel: 'login',
      abs: '/login'
    },
    register: {
      rel: 'register',
      abs: '/register'
    }
  },

  private: {
    discover: {
      rel: 'discover',
      abs: '/app/discover'
    },
    profile: {
      rel: 'profile',
      abs: '/app/profile'
    },
    // notifications: {
    //   rel: 'notifications',
    //   abs: '/app/notifications'
    // },
    sessions: {
      rel: 'sessions',
      abs: '/app/sessions'
    },
    settings: {
      rel: 'settings',
      abs: '/app/settings'
    },
    people: {
      rel: 'people',
      abs: '/app/people'
    }
  }
};

export default ROUTE_PATHS;
