import { useState } from "react";
import { observer } from "mobx-react";
import { lobbyWs } from "api";
import { GameStore } from "stores/GameStore";
import { ReactComponent as DiceSvg } from "svg/dices.svg";
import styles from "./styles.module.scss";

const RollPlayersButtonComponent = () => {
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

    if (GameStore.settings.timer && GameStore.state.started) return null;
    return (
        <DiceSvg
            className={buttonStyles.join(" ")}
            onClick={roll}
        />
    );
};

export const RollPlayersButton = observer(RollPlayersButtonComponent);
