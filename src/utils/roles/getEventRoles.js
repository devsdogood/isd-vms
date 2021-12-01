const isEventRole = (role, event) => event === role.event;

const isNotDeleted = (role) => !role.deleted;

export const isGlobalRole = (role) => [null, '', undefined].includes(role.event);

const getEventRoles = (roles, event) => roles
    .filter(isNotDeleted)
    .filter((role) => isEventRole(role, event))
    .filter(isGlobalRole);

export default getEventRoles;
