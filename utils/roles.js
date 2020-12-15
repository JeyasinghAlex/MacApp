const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (() => {
    ac.grant("employee")
    .readOwn("profile")
    .updateOwn("profile")

    ac.grant("supervisor")
    .extend("employee")
    .readAny("profile")

    ac.grant("admin")
    .extend("employee")
    .extend("supervisor")
    .updateAny("profile")
    .deleteAny("profile")

    return ac;
})();