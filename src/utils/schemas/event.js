import * as Yup from 'yup';

const eventSchema = Yup.object({
  contact: Yup
    .string('Contact for event')
    .required('Contact is required'),
  deleted: Yup
    .boolean('Hide event'),
  description: Yup
    .string('Description of event')
    .required('Description is required'),
  start: Yup
    .date()
    .min(
      new Date(),
      'Start date can\'t be before current date'
    )
    .required('Start date is required'),
  end: Yup
    .date()
    .min(
      Yup.ref('start'),
      'End date can\'t be before start date'
    )
    .required('End date is required'),
  locationAddress: Yup
    .string('Address for event location')
    .required('Address is required'),
  locationName: Yup
    .string('Name for the event\'s location')
    .required('Location name is required'),
  roles: Yup
    .array().of(
      Yup.object().shape({
        title: Yup.string().required(),
        roleID: Yup.string().required(),
      })
    )
    .min(1, 'Events must have at least one role'),
  slots: Yup
    .number('Number of slots available for the event')
    .integer()
    .required('Slots is required'),
  title: Yup
    .string('Event title')
    .required('Title is required')
});

export default eventSchema;
