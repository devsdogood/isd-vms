import {admin} from "../utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEventData = async (eventId: string): Promise<any> => {
  const eventDoc = admin.firestore().collection("events").doc(eventId);

  const data = await eventDoc.get();
  return data.data();
};
