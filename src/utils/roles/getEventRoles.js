const isEventRole = (role, event) => event === role.event;

const isNotDeleted = (role) => !role.deleted;

export const isGlobalRole = (role) => [null, '', undefined].includes(role.event);

const isEventOrGlobal = (role, event) => isEventRole(role, event) || isGlobalRole(role);

const getEventRoles = (roles, event) => roles
    .filter(isNotDeleted)
    .filter((role) => isEventOrGlobal(role, event));

export default getEventRoles;
