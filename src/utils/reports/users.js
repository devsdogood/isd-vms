import moment from 'moment';

export const getFullName = (user) => [user.firstName, user.lastName].join(' ');

export const birthdaysReport = (users) => {
    const birthdays = users.map((user) => [
        getFullName(user),
        moment(user.birthday.toDate()).format('MM-DD-YYYY')
    ]);

    return [
        ['Name', 'Birthday'],
        ...birthdays
    ];
};

export const shirtSizesReport = () => {};
