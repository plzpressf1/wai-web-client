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
                lobbyWs.emit("player/change", {
                    id: getUser().id,
                    field: "name",
                    value: ref.current.value,
                })
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

    const inputClasses = [styles.editable];
    const spanClasses = [styles.editable];
    if (edit) {
        spanClasses.push(styles.hidden);
    }
    else {
        inputClasses.push(styles.hidden);
    }
    return (
        <>
            <input
                className={inputClasses.join(" ")}
                type="text"
                ref={ref}
                onKeyUp={(e) => onKeyUp(e.key)}
            />
            <span
                className={spanClasses.join(" ")}
                onClick={() => onClick()}
            >
                {name}
            </span>
        </>
    );
};
