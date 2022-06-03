import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import { Player } from "interfaces/Player";
import { PlayerSlot } from "../PlayerSlot";
import { Notes } from "../Notes";
import styles from "./styles.module.scss";

interface PlayersProps {
    players: Player[];
}

export const Players = ({ players }: PlayersProps) => {
    const [editingNotes, setEditingNotes] = useState(false);

    const width = 220;
    const gap = 20;
    const totalWidth = players.length * 220 + (players.length - 1) * gap;
    const transitions = useTransition(
        players.map((player, i) => ({ ...player, x: i * width + i * gap - totalWidth / 2 })),
        {
            from: { position: "absolute" },
            leave: { width: 0 },
            enter: ({ x }) => ({ x }),
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
        </div>
    );
};
