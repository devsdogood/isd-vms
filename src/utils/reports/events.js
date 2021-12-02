import moment from 'moment';

const getSignupsForEvent = (event, signups) => signups.filter(
    (signup) => signup.event === event.eventID
);

const getSlotsForEvent = (event) => event.roles.reduce((acc, role) => acc + role.slots, 0);

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

export const eventReport = (events, signups) => {
    const sorted = events.sort((left, right) => moment.utc(left.start).diff(moment.utc(right.start)));

    const titles = sorted.map(({ title }) => title);
    const times = sorted
        .map(({ start, end }) => [start, end]
        .map((time) => moment(time).format('MM/DD/YY hh:mm A'))
        .join(' - '));
    const volunteered = sorted
        .map((event) => getSignupsForEvent(event, signups)
            .map((signup) => getShiftDuration(signup.shiftStart, signup.shiftEnd))
            .reduce((acc, time) => acc + time, 0));
    const slots = sorted.map(getSlotsForEvent);
    const unfilled = sorted.map((event) => getSlotsForEvent(event) - getSignupsForEvent(event, signups).length);

    const eventDetails = [
        titles,
        times,
        volunteered,
        slots,
        unfilled,
    ];

    const columns = eventDetails[0].map((_, col) => eventDetails.map((row) => row[col]));

    return [
        ['Event Title', 'Event Timeframe', 'Minutes Volunteered', 'Slots Available', 'Slots Unfilled'],
        ...columns,
    ];
};

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
