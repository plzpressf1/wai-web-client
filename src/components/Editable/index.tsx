import { useRef, useState } from "react";
import { lobbyWs } from "api";
import { getUser } from "ls";
import styles from "./styles.module.scss";

export const Editable = ({ name } : { name: string }) => {
    const [edit, setEdit] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const onKeyUp = (key: string) => {
        if (key === "Enter") {
            setEdit(false);
            if (ref.current) {
                lobbyWs.emit("player/name", { id: getUser().id, name: ref.current.value })
            }
        }
        if (key === "Escape") {
            setEdit(false);
        }
    };

    const onClick = () => {
        if (ref.current) {
            ref.current.value = name;
        }
        setEdit(true);
    };

    if (edit) {
        return (
            <input
                className={styles.editable}
                type="text"
                ref={ref}
                onKeyUp={(e) => onKeyUp(e.key)}
            />
        );
    }
    else {
        return (
            <span
                className={styles.editable}
                onClick={() => onClick()}
            >
                {name}
            </span>
        );

    }
};
