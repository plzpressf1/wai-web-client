import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTransition, animated } from "react-spring";
import { GameStore } from "stores/GameStore";
import { Player, PlayerControls } from "interfaces/Player";
import { PlayerSlot } from "components/PlayerSlot";
import { PlayerControlsSlot } from "components/PlayerControlsSlot";
import { Notes } from "components/Notes";
import styles from "./styles.module.scss";

interface PlayersProps {
    players: Player[];
    controls: PlayerControls[];
    timer: number;
}

const PlayersComponent = ({ players, controls, timer }: PlayersProps) => {
    const [editingNotes, setEditingNotes] = useState(false);

    const width = 220;
    const gap = 20;
    const totalWidth = players.length * 220 + (players.length - 1) * gap;
    const transitions = useTransition(
        players.map((player, i) => ({ ...player, x: i * width + i * gap - totalWidth / 2 })),
        {
            from: { position: "absolute", opacity: 1 },
            leave: { width: 0, opacity: 0 },
            enter: ({ x }) => ({ x, opacity: 1 }),
            update: ({ x }) => ({ x }),
            key: (item: Player) => item?.id
        }
    );

    return (
        <div className={styles.wrapper}>
            {editingNotes && <Notes shutDown={() => setEditingNotes(false)}/>}
            <div className={styles.players}>
                {transitions((style, player) =>
                    <animated.div
                        //@ts-ignore
                        style={{
                            ...style
                        }}
                    >
                        <PlayerSlot
                            key={player.id}
                            player={player}
                            editingNotes={editingNotes}
                            setEditingNotes={setEditingNotes}
                        />
                    </animated.div>
                )}
            </div>
            {GameStore.settings.timer && GameStore.state.started &&
                <div className={styles.controls}>
                    {
                        controls.map((c, index) =>
                            <PlayerControlsSlot
                                key={index}
                                controls={c}
                                timer={timer}
                            />
                        )
                    }
                </div>
            }
        </div>
    );
};

export const Players = observer(PlayersComponent);
