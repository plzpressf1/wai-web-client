import openSocket, { Socket } from "socket.io-client";
import { User } from "../ls";

export let lobbyWs: Socket;

export const openLobbyWs = (user: User) => {
    if (process.env.REACT_APP_WS_URL) {
        lobbyWs = openSocket(process.env.REACT_APP_WS_URL, {
            path: "/game",
            query: { id: user.id, name: user.name }
        });
    }
};
