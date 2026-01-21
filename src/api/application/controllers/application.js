// src/api/application/controllers/application.js
'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::application.application', ({ strapi }) => ({
  async find(ctx) {
    // 1. Check if the request is from a website user
    if (ctx.state.auth.strategy.name === 'users-permissions') {
      const userId = ctx.state.user.id;

      // 2. Add the user filter to the query
      // This only affects the Application table, not the populated Jobs/Companies
      ctx.query.filters = {
        ...ctx.query.filters,
        user: userId
      };
    }

    // 3. Call the standard Strapi logic with our new filter
    const { data, meta } = await super.find(ctx);

    return { data, meta };
  },
}));