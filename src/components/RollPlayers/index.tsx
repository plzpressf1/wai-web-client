import { lobbyWs } from "api";
import styles from "./styles.module.scss";
import { ReactComponent as DiceSvg } from "svg/dices.svg";

export const RollPlayers = () => {
    return (
        <div className={styles.wrapper}>
            <DiceSvg
                className={styles.button}
                onClick={() => {
                    console.log("player/roll");
                    lobbyWs.emit("player/roll");
                }}
            />
        </div>
    );
};
