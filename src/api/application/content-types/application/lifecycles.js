// src/api/application/content-types/application/lifecycles.js
module.exports = {
  // KEEP THIS: For the Apply button
  async beforeCreate(event) {
    const ctx = strapi.requestContext.get();
    if (ctx?.state?.auth?.strategy?.name === "users-permissions") {
      event.params.data.user = ctx.state.user.id;
    }
  },
  
  // REMOVE beforeFindMany from here!
};