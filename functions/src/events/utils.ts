import {firestore} from "firebase-admin";
import {admin} from "../utils";

export const getEventData =
  async (eventId: string): Promise<firestore.DocumentData> => {
    const eventDoc = admin.firestore().collection("events").doc(eventId);

    const data = await eventDoc.get();
    return data.data()!;
  };
