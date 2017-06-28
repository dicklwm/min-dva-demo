
// API的前缀
const apiPrefix = '';

module.exports = {
  apiPrefix,
  index: {
    login: `${apiPrefix}/admin/admin_user/login`,
    logout: `${apiPrefix}/admin/admin_user/logout`,
  },
};
