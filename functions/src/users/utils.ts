import {firestore} from "firebase-admin";
import {admin} from "../utils";

export const getUserData =
  async (userId: string): Promise<firestore.DocumentData> => {
    const userDoc = admin.firestore().collection("users").doc(userId);

    const data = await userDoc.get();
    return data.data()!;
  };
