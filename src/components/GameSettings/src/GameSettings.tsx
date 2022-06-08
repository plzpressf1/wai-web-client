import { observer } from "mobx-react";
import { SwitchButton } from "components/SwitchButton";
import styles from "./styles.module.scss";
import { GameStore } from "stores/GameStore";

/*
    [.....................O...]
    ----
    [x] Игра с таймером
    ----
    [3] Вопросов с ответом "Да"
    [1:00] Время на ход
    [0:05] Время между ходами
 */

const GameSettingsComponent = () => {
    const onGameTypeSwitch = () => {
        GameStore.updateSettings({ ...GameStore.settings, timer: !GameStore.settings.timer });
    };

    return (
        <div className={styles.wrapper}>
            <h2>Настройки</h2>
            <div className={styles.option}>
                <SwitchButton
                    checked={GameStore.settings.timer}
                    onSwitch={onGameTypeSwitch}
                    switchOnColor="orange"
                />
                <span>Игра с таймером</span>
            </div>
        </div>
    );
};

export const GameSettings = observer(GameSettingsComponent);
