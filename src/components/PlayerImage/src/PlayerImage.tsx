import { Player } from "interfaces/Player";
import { ReactComponent as DisconnectedSvg } from "svg/disconnected.svg";
import styles from "./styles.module.scss";

export const PlayerImage = ({ player }: { player: Player }) => {
    if (player.connected) {
        if (!player.picture) return null;
        return (
            <div className={styles.wrapper}>
                <img src={player.picture}
                     alt="Неправильный URL"
                />
            </div>
        );
    }

    return (
        <div className={styles.disconnected}>
            <DisconnectedSvg/>
        </div>
    );
};
