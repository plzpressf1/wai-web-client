import React from "react";
import { Player } from "interfaces/Player";
import { PlayerSlot } from "../PlayerSlot";
import styles from "./styles.module.scss";

interface PlayersProps {
    players: Player[];
}

export const Players = ({ players }: PlayersProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.players}>
                {
                    players.map(player =>
                        <PlayerSlot
                            key={player.id}
                            player={player}
                        />
                    )
                }
            </div>
        </div>
    );
};
