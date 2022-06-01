import React, { useEffect, useState } from "react";
import { Player } from "./interfaces/Player";
import { lobbyWs, openLobbyWs } from "./api";
import { getUser, updateUser } from "./ls";
import { Players } from "./components/Players";
import "./global.scss";

function App() {
    const [players, setPlayers] = useState<Player[]>([]);
    useEffect(() => {
        const user = getUser();
        openLobbyWs(user);
        if (lobbyWs) {
            lobbyWs.on("connect_error", (err) => {
                console.log(`connect_error due to ${err.message}`);
            });
            lobbyWs.on("player/id", (id) => {
                user.id = id;
                updateUser(user);
            });
            lobbyWs.on("player/list", (resp) => setPlayers(resp.players));

            return () => {
                lobbyWs.close();
            };
        }
    }, []);

    return (
        <>
            <header></header>
            <main>
                <Players players={players}/>
            </main>
        </>
    );
}

export default App;
