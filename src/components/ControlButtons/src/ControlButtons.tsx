import { RollPlayersButton } from "./RollPlayersButton";
import { SettingsButton } from "./SettingsButton";
import { PlayPauseButton } from "./PlayPauseButton";
import styles from "./styles.module.scss";

export const ControlButtons = () => {
    return (
        <div className={styles.wrapper}>
            <SettingsButton/>
            <RollPlayersButton/>
            <PlayPauseButton/>
        </div>
    );
};
