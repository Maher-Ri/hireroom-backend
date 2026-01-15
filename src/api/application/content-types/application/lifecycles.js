// src/api/user-detail/content-types/user-detail/lifecycles.js

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    // ctx is the "Context" of the request (the person logged in)
    const ctx = strapi.requestContext.get();

    // If there is a logged-in user, link the new record to them automatically
    if (ctx && ctx.state && ctx.state.user) {
      // Set the 'user' field to the ID of the person making the request
      // (Change 'user' to 'owner' if you kept that name)
      event.params.data.user = ctx.state.user.id;
    }
  },

  // This handles the STATUS CHECK (GET)
  async beforeFindMany(event) {
    const ctx = strapi.requestContext.get();

    // Check if the request is coming from the Website API
    // Admin panel requests use a different strategy (usually 'admin')
    if (ctx?.state?.auth?.strategy?.name === "users-permissions") {
      const userId = ctx.state.user.id;

      event.params.filters = {
        ...event.params.filters,
        user: { id: userId },
      };
    }
  },
};
