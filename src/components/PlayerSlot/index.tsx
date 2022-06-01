import { Player } from "interfaces/Player";
import styles from "./styles.module.scss";
import { lobbyWs } from "api";
import { Editable } from "../Editable";
import { getUser, updateUser } from "ls";
import { ReactComponent as PictureSvg } from "svg/picture.svg";

interface PlayerSlotProps {
    player: Player;
}

export const PlayerSlot = ({ player }: PlayerSlotProps) => {
    const me = getUser().id === player.id;

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
                {!me && <PlayerImage picture={player.picture}/>}
            </div>
        </div>
    );
};
