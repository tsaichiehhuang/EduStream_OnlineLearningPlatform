import { Elysia, t } from "elysia";

export const socket = (app: Elysia) =>
  app.ws("/live", {
    body: t.Object({
      message: t.String(),
      liveID: t.String(),
      userID: t.String(),
      name: t.String(),
    }),
    open(ws) {
      console.warn(`The socket is opened.`);
    },
    message(ws, data) {
      ws.subscribe(`live/${data.liveID}`);
      if (data.message == "EduStream_test_connection") {
        console.warn("Connect Initiated.");
      } else {
        ws.publish(`live/${data.liveID}`, JSON.stringify(data));
      }
    },
  });
