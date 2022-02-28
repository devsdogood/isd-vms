import {admin} from "../utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserData = async (userId: string): Promise<any> => {
  const userDoc = admin.firestore().collection("users").doc(userId);

  const data = await userDoc.get();
  return data.data();
};
