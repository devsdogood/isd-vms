import moment from 'moment';

const getShiftDuration = (start, end) => moment.duration(moment(end).diff(moment(start))).asMinutes();

const getMinutesOverTime = (start, end, user, signups, events) => {
    const filteredSignups = signups
        .filter((signup) => {
            const event = events.find((ev) => ev.eventID === signup.event);

            return moment(event.start) > start && moment(event.end) < end;
        })
        .filter((signup) => signup.volunteer === user.userID);

    return filteredSignups.reduce((acc, { shiftStart, shiftEnd }) => acc + getShiftDuration(shiftStart, shiftEnd), 0);
};

export const eventReport = () => {};

export const hoursReport = (signups, events, users) => {
    const userHours = users.map((user) => ({ name: [user.firstName, user.lastName].join(' ') }));

    const start = moment('2021-11-1');
    const end = moment().endOf('month');

    let range = moment(start);
    while (range.isBefore(end)) {
        const curr = moment(range);
        const next = moment(range).add(1, 'month');

        users.forEach((user) => {
            const time = getMinutesOverTime(curr, next, user, signups, events);
            const fullName = [user.firstName, user.lastName].join(' ');
            const userHoursItem = userHours.find((uh) => uh.name === fullName);

            userHoursItem[curr.format('MM-yyyy')] = time;
        });

        range = next;
    }

    return userHours;
};
