import moment from 'moment';
import * as Yup from 'yup';
import 'yup-phone';
import states from '../data/states';

export const shirtSizes = {
  'X-small': 'X-small',
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
  'X-Large': 'X-Large',
  '2x': '2x',
  '3x': '3x',
  '4x': '4x',
};

const userSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  phone: Yup.string().phone('US').required(),
  address1: Yup.string().required('Address 1 is required'),
  address2: Yup.string().optional().nullable(),
  city: Yup.string().required('City is required'),
  state: Yup.string().oneOf(Object.values(states)).required('State is required'),
  zip: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(5, 'Must be exactly 5 digits')
    .max(5, 'Must be exactly 5 digits'),
  occupation: Yup.string().optional(),
  birthday: Yup.date().required('Birthdate is required')
    .test("Birthdate must be before today's date", (birthdate) => (
      moment(birthdate).valueOf() < new Date().valueOf()
    )),
  shirtSize: Yup.string().oneOf(Object.values(shirtSizes)).required('Shirt size is required'),
});

export const userSchemaWithPassword = userSchema.concat(Yup.object().shape({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
}));

export default userSchema;
