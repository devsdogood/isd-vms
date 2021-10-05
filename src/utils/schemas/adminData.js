import * as Yup from 'yup';

export const trainings = {
  CanineCamp: 'Canine Camp',
  ExpectationsAssessment: 'Expectations Assessment',
  ExpectationsWebinar: 'Expectations Webinar',
  HouseVisits: 'House Visits',
  Observation1: 'Observation 1',
  Observation2: 'Observation 2',
  Observation3: 'Observation 3',
  Orientation: 'Orientation',
  TrainingCourse: 'Training Course',
};

const adminDataSchema = Yup.object().shape({
  verified: Yup.boolean().default(false),
  liabilityWaiver: Yup.string().url().optional().nullable(),
  volunteerApplication: Yup.string().url().optional().nullable(),
  roles: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required(),
      roleID: Yup.string().required(),
    })
  ),
  trainings: Yup.object().shape(
    Object.fromEntries(Object.keys(trainings).map(
      (k) => [k, Yup.boolean().default(false)]
    ))
  ),
});

export default adminDataSchema;
