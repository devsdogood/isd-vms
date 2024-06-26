import {firestore} from "firebase-admin";
import {admin} from "../utils";

export const getUserData =
  async (userId: string): Promise<firestore.DocumentData> => {
    const userDoc = admin.firestore().collection("users").doc(userId);

    const data = await userDoc.get();
    return data.data()!;
  };

export const defaultAdminUserData = {
  deleted: false,
  verified: false,
  volunteerApplication: null,
  liabilityWaiver: null,
  roles: [],
  trainings: {
    Orientation: false,
    DogTrainingLecture: false,
    HomeVisit: false,
    BodyLanguageWebinarAssessment: false,
    BasicCareWebinarAssessment: false,
    Observation1: false,
    Observation2: false,
    Observation3: false,
  },
};
