import React from "react";
import { lobbyWs } from "api";
import { getUser, updateUser } from "ls";
import { Player } from "interfaces/Player";
import { Editable } from "../Editable";
import { ReactComponent as PictureSvg } from "svg/picture.svg";
import styles from "./styles.module.scss";

interface PlayerSlotProps {
    player: Player;
    me: boolean;
}

const PlayerSlot = ({ player, me }: PlayerSlotProps) => {
    const name = player.name ? player.name : "[Имя не задано]";
    const nameStyles = [styles.name];
    if (me) nameStyles.push(styles.editable);

    const secret = player.secret ? player.secret : "[Кто он/она?]";
    const secretStyles = [styles.secret];
    if (!me) secretStyles.push(styles.editable);

    const onUpdate = (field: string, value: string) => {
        lobbyWs.emit("player/change", { id: player.id, field, value });
    };

    const onChangePicture = () => {
        const value = prompt("Полный url картинки (https://*.*/***/image.jpg)");
        lobbyWs.emit("player/change", { id: player.id, field: "picture", value });
    };

    return (
        <div className={styles.slot}>
            <span className={nameStyles.join(" ")}>
            {
                me ? <Editable
                        value={name}
                        onUpdate={(value) => {
                            const user = getUser();
                            user.name = value;
                            updateUser(user);
                            onUpdate("name", value)
                        }}
                    /> :
                    <div className={styles.nameDetail}>
                        <PictureSvg onClick={onChangePicture}/>
                        <span>{name}</span>
                    </div>
            }
            </span>
                <span className={secretStyles.join(" ")}>
                {
                    !me && <>
                        <Editable
                            value={secret}
                            onUpdate={(value) => onUpdate("secret", value)}
                        />
                    </>
                }
            </span>
            <div className={styles.image}>
            {
                !me && <>
                    {player.picture &&
                        <img src={player.picture}
                             alt="подсказка"
                             //onClick={}
                        />
                    }
                </>
            }
            </div>
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
