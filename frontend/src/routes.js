const routes = {
  frontend: {
    homePagePath: () => '/',
    loginPagePath: () => '/login',
    signupPagePath: () => '/signup',
    notFoundPagePath: () => '*',
  },
  api: {
    channels: () => '/api/v1/channels',
    messages: () => '/api/v1/messages',
  },
};

export default routes;
