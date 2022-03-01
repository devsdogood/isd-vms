import {firestore} from "firebase-admin";
import {admin} from "../utils";

export const getEventData =
  async (eventId: string): Promise<firestore.DocumentData> => {
    const eventDoc = admin.firestore().collection("events").doc(eventId);

    const data = await eventDoc.get();
    return data.data()!;
  };

export const getRoleData =
  async (roleId: string): Promise<firestore.DocumentData> => {
    const roleDoc = admin.firestore().collection("roles").doc(roleId);

    const data = await roleDoc.get();
    return data.data()!;
  };
