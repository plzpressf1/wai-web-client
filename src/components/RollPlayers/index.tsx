import { lobbyWs } from "api";
import { ReactComponent as DiceSvg } from "svg/dices.svg";
import styles from "./styles.module.scss";

export const RollPlayers = () => {
    return (
        <div className={styles.wrapper}>
            <DiceSvg
                className={styles.button}
                onClick={() => lobbyWs.emit("player/roll")}
            />
        </div>
    );
};
