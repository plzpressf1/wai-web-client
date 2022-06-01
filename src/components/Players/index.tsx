import React from "react";
import { getUser } from "ls";
import { Player } from "interfaces/Player";
import { Editable } from "../Editable";
import styles from "./styles.module.scss";

interface PlayerSlotProps {
    player: Player;
    me: boolean;
}

const PlayerSlot = ({ player, me }: PlayerSlotProps) => {
    const name = player.name ? player.name : "[Имя не задано]";
    const nameStyles = [styles.name];
    if (me) nameStyles.push(styles.editable);

    return (
        <div className={styles.slot}>
            <span className={nameStyles.join(" ")}><Editable name={name}/></span>
            <div className={styles.image}></div>
        </div>
    );
};

interface PlayersProps {
    players: Player[];
}

export const Players = ({ players }: PlayersProps) => {
    const user = getUser();

    return (
        <div className={styles.wrapper}>
            <div className={styles.players}>
                {
                    players.map(player =>
                        <PlayerSlot
                            key={player.id}
                            player={player}
                            me={user.id === player.id}
                        />
                    )
                }
            </div>
        </div>
    );
};
