import { useState } from "react";
import { Modal } from "components/Modal";
import { GameSettings } from "components/GameSettings";
import { ReactComponent as SettingsSvg } from "svg/settings.svg";

export const SettingsButton = () => {
    const [active, setActive] = useState(false);

    return (
        <>
            {active && <Modal
                    onClose={() => setActive(false)}
                    opacity={0.8}
                >
                    <GameSettings/>
                </Modal>
            }
            <SettingsSvg onClick={() => setActive(true)}/>
        </>
    );
};
