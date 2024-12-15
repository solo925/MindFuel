import { io, Socket } from "socket.io-client";
import store from "../../store";
import { addNotification } from "../../store/habits";

const socket: Socket = io("http://localhost:3000"); 


export const joinRoom = (userId: string): void => {
  socket.emit("join_room", userId);
};


socket.on("new_notification", (notification) => {
  console.log("New notification:", notification);
  store.dispatch(addNotification(notification));
});

export default socket;
