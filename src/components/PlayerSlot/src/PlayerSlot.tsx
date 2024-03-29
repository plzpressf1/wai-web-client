import { observer } from "mobx-react";
import { lobbyWs } from "api";
import { getUser, updateUser } from "ls";
import { Player } from "interfaces/Player";
import { GameStore } from "stores/GameStore";
import { Editable } from "components/Editable";
import { PlayerImage } from "components/PlayerImage";
import { ReactComponent as PictureSvg } from "svg/picture.svg";
import { ReactComponent as KickSvg } from "svg/kick.svg";
import { ReactComponent as MemoSvg } from "svg/notes.svg";
import { ReactComponent as CorrectSvg } from "svg/correct.svg";
import styles from "./styles.module.scss";

interface PlayerSlotProps {
    player: Player;
    editingNotes: boolean;
    setEditingNotes: (v: boolean) => void;
}

const PlayerSlotComponent = ({ player, editingNotes, setEditingNotes }: PlayerSlotProps) => {
    const me = getUser().id === player.id;
    const correct = player.correct === "yes";

    const slotStyles = [styles.slot];
    if (!me && !player.connected) slotStyles.push(styles.disconnected);

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
        if (value !== null) {
            lobbyWs.emit("player/change", { id: player.id, field: "picture", value });
        }
    };

    const onKickPlayer = () => {
        lobbyWs.emit("player/kick", { id: player.id });
    };

    return (
        <div className={slotStyles.join(" ")}>
            <span className={nameStyles.join(" ")}>
            {me
                ? <Editable
                    value={name}
                    onUpdate={(value) => {
                        const user = getUser();
                        user.name = value;
                        updateUser(user);
                        onUpdate("name", value)
                    }}
                />
                : <div className={styles.nameDetail}>
                    {player.connected
                        ? <PictureSvg onClick={onChangePicture} />
                        : <>{!GameStore.state.started && <KickSvg onClick={onKickPlayer}/>}</>
                    }
                    <span>{name}</span>
                    <CorrectSvg onClick={() => onUpdate("correct", "yes")} />
                </div>
            }
            </span>
            <span className={secretStyles.join(" ")}>
                {(!me || correct) && <>
                    {player.connected
                        ? <>
                            {me ?
                                <span>{secret}</span>
                                : <Editable
                                    value={secret}
                                    onUpdate={(value) => onUpdate("secret", value)}
                                />
                            }
                        </>
                        : <span>не в сети</span>
                    }
                </>}
            </span>
            <div className={styles.image}>
                {(me && !correct)
                    ? <div className={styles.notes}>
                        {!editingNotes && <MemoSvg onClick={() => setEditingNotes(true)} />}
                    </div>
                    : <PlayerImage player={player}/>
                }
            </div>
        </div>
    );
};

export const PlayerSlot = observer(PlayerSlotComponent);
