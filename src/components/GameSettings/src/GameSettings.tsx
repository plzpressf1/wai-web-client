import { observer } from "mobx-react";
import { GameStore } from "stores/GameStore";
import { printTime } from "utils/time";
import { SwitchButton } from "components/SwitchButton";
import styles from "./styles.module.scss";

/*
    [.....................O...]
    ----
    [x] Игра с таймером
    ----
    [3] Вопросов с ответом "Да"
    [1:00] Время на ход
    [0:05] "хз.." экстра таймер
 */

interface InputNumberProps {
    value: number;
    step?: number;
    onClick: (v: number) => void;
    width?: number;
    textConvert?: (v: number) => string;
}

const InputNumber = ({ value, step, onClick, width, textConvert }: InputNumberProps) => {
    const delta = step || 1;
    width = width || 30;
    let text = value.toString();
    if (textConvert) text = textConvert(value);
    return (
        <div
            className={styles.number}
            style={{ width: width + 40 }}
        >
            <span
                className={styles.minus}
                onClick={() => onClick(value - delta)}
            />
            <span
                className={styles.value}
                style={{ width }}
            >
                {text}
            </span>
            <span
                className={styles.plus}
                onClick={() => onClick(value + delta)}
            />
        </div>
    );
};

const GameSettingsComponent = () => {
    const onGameTypeSwitch = () => {
        GameStore.updateSettings({ ...GameStore.settings, timer: !GameStore.settings.timer });
    };

    return (
        <div className={styles.wrapper}>
            <h2>Настройки</h2>
            <div className={styles.option}>
                <div className={styles.controller}>
                    <SwitchButton
                        checked={GameStore.settings.timer}
                        onSwitch={onGameTypeSwitch}
                        switchOnColor="orange"
                    />
                </div>
                <span>Игра с таймером <sup>Experimental</sup></span>
            </div>
            {!GameStore.state.started &&
                <>
                    <div className={styles.option}>
                        <div className={styles.controller}>
                            <InputNumber
                                value={GameStore.settings.questionsNumber}
                                onClick={(v) => GameStore.updateSettings({ ...GameStore.settings, questionsNumber: v })}
                            />
                        </div>
                        <span>Вопросов с ответом "Да"</span>
                    </div>
                    <div className={styles.option}>
                        <div className={styles.controller}>
                            <InputNumber
                                value={GameStore.settings.playerTime}
                                step={15}
                                onClick={(v) => GameStore.updateSettings({ ...GameStore.settings, playerTime: v })}
                                width={65}
                                textConvert={printTime}
                            />
                        </div>
                        <span>Время на ход</span>
                    </div>
                    <div className={styles.option}>
                        <div className={styles.controller}>
                            <InputNumber
                                value={GameStore.settings.extraTime}
                                step={5}
                                onClick={(v) => GameStore.updateSettings({ ...GameStore.settings, extraTime: v })}
                                width={65}
                                textConvert={printTime}
                            />
                        </div>
                        <span>"хз.." экстра таймер</span>
                    </div>
                </>
            }
        </div>
    );
};

export const GameSettings = observer(GameSettingsComponent);
