import { useState } from "react";
import { lobbyWs } from "api";
import { ReactComponent as DiceSvg } from "svg/dices.svg";
import styles from "./styles.module.scss";

export const RollPlayers = () => {
    const [disabled, setDisabled] = useState(false);
    const rollSound = new Audio("/sounds/dices.mp3");
    const buttonStyles = [styles.button];
    if (disabled) buttonStyles.push(styles.disabled);

    const roll = () => {
        if (disabled) return;
        lobbyWs.emit("player/roll");
        if (rollSound) {
            setDisabled(true);
            rollSound.play();
            setTimeout(() => setDisabled(false), 700);
        }
    };

    return (
        <div className={styles.wrapper}>
            <DiceSvg
                className={buttonStyles.join(" ")}
                onClick={roll}
            />
        </div>
    );
};
