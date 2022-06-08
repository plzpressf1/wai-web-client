import React, { useEffect, useState } from "react";
import { GameStore } from "stores/GameStore";
import { lobbyWs, openLobbyWs } from "api";
import { getUser, updateUser } from "ls";
import { Player, PlayerControls } from "interfaces/Player";
import { Players } from "components/Players";
import { ControlButtons } from "components/ControlButtons";
import "./global.scss";

interface GameFlow {
    controls: PlayerControls[];
    timer: number;
}

function App() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [gameFlow, setGameFlow] = useState<GameFlow>({ controls:[], timer: 0 });

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
            lobbyWs.on("settings/list", (resp) => GameStore.setSettings(resp.settings));
            lobbyWs.on("state/list", (resp) => GameStore.setState(resp.state));
            lobbyWs.on("controls/list", (resp) => setGameFlow(resp));

            return () => {
                lobbyWs.close();
            };
        }
    }, []);

    if (players.length === gameFlow.controls.length) {
        for (let i = 0; i < players.length; i++) {
            gameFlow.controls[i].connected = players[i].connected;
        }
    }
    return (
        <>
            <header>
                <ControlButtons/>
            </header>
            <main>
                <Players
                    players={players}
                    controls={gameFlow.controls}
                    timer={gameFlow.timer}
                />
            </main>
        </>
    );
}

export default App;
