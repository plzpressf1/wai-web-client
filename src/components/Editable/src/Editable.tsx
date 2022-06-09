import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

interface EditableInputProps {
    text: string;
    shutDown: (text: string | void) => void;
}

const EditableInput = ({ text, shutDown }: EditableInputProps) => {
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.value = text;
            ref.current.focus();
            ref.current.select();
        }
    }, [text]);

    const onKeyUp = (key: string) => {
        if (key === "Enter") {
            shutDown(ref.current?.value);
        }
        if (key === "Escape") {
            shutDown();
        }
    };

    return (
        <input
            ref={ref}
            type="text"
            onKeyUp={(e) => onKeyUp(e.key)}
            onBlur={() => shutDown()}
        />
    );
};

interface EditableProps {
    value: string;
    onUpdate: (value: string) => void;
}

export const Editable = ({ value, onUpdate }: EditableProps) => {
    const [edit, setEdit] = useState(false);

    const onInputShutDown = (text: string | void) => {
        if (text) {
            onUpdate(text);
        }
        setEdit(false);
    };

    if (edit) {
        return <EditableInput
            text={value}
            shutDown={onInputShutDown}
        />;
    }
    return (
        <span
            className={styles.editable}
            onClick={() => setEdit(true)}
        >
            {value}
        </span>
    );
};
