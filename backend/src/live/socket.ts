import { Elysia, t } from "elysia";

export const socketChat = (app: Elysia) =>
  app.ws("/ws", {
    body: t.Object({
      message: t.String(),
      liveID: t.String(),
      userID: t.String(),
      name: t.String()
    }),
    open(ws) {
      console.warn(`The socket is opened.`);
    },
    message(ws, data) {
      ws.subscribe(`live/${data.liveID}`);
      ws.publish(`live/${data.liveID}`, `${data.message}`);
    },
  });
