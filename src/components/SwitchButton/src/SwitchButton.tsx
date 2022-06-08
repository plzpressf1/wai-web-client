import styles from "./styles.module.scss";

export interface SwitchButtonProps {
    checked: boolean;
    onSwitch: () => void;
    switcherColor?: string;
    switchOnColor?: string;
    switchOffColor?: string;
}

export const SwitchButton = ({ checked, onSwitch, switcherColor, switchOnColor, switchOffColor }: SwitchButtonProps) => {
    if (!switcherColor) switcherColor = "#fff";
    if (!switchOnColor) switchOnColor = "#2196f3";
    if (!switchOffColor) switchOffColor = "#ccc";

    return (
        <label className={styles.switch}>
            <style dangerouslySetInnerHTML={{
                __html: `
                    .${styles.input}:checked + .${styles.slider} {
                        background-color: ${switchOnColor};
                    }
                    .${styles.slider} {
                        background-color: ${switchOffColor}
                    }
                    .${styles.slider}:before {
                        background-color: ${switcherColor};
                    }
                `
            }} />
            <input
                type="checkbox"
                checked={checked}
                readOnly={true}
                className={styles.input}
                onClick={onSwitch}
            />
            <span className={styles.slider}/>
        </label>
    );
};
