import { useRef, useState } from "react";
import styles from "./styles.module.scss";

interface EditableProps {
    value: string;
    onUpdate: (value: string) => void;
}

export const Editable = ({ value, onUpdate }: EditableProps) => {
    const [edit, setEdit] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const onKeyUp = (key: string) => {
        if (key === "Enter") {
            setEdit(false);
            if (ref.current) {
                onUpdate(ref.current.value);
            }
        }
        if (key === "Escape") {
            setEdit(false);
        }
    };

    const onClick = () => {
        if (ref.current) {
            ref.current.value = value;
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
                {value}
            </span>
        </>
    );
};
