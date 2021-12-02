import * as Yup from 'yup';

export const trainings = {
  Orientation: 'Orientation',
  DogTrainingLecture: 'Dog Training Lecture',
  HomeVisit: 'Home Visit',
  BodyLanguageWebinarAssessment: 'Body Language Webinar Assessment',
  BasicCareWebinarAssessment: 'Basic Care Webinar Assessment',
  Observation1: 'Observation/Mentor Outing 1',
  Observation2: 'Observation/Mentor Outing 2',
  Observation3: 'Observation/Mentor Outing 3',
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
