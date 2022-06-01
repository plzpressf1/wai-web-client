import { useEffect, useRef, useState } from "react";
import debounce from "../utils/debounce";
import { getMemo, updateMemo } from "ls";
import { ReactComponent as MemoSvg } from "svg/notes.svg";
import styles from "./styles.module.scss";

const Memo = ({ shutDown }: { shutDown: () => void }) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (ref.current) {
            const { text, cols, rows } = getMemo();
            ref.current.value = text;
            ref.current.cols = cols;
            ref.current.rows = rows;
            ref.current.focus();
        }
    }, []);

    const saveMemo = () => {
        const target = ref.current;
        if (target) {
            const text = target.value;
            const cols = Math.ceil(target.clientWidth / 15);
            const rows = Math.ceil(target.clientHeight / 28.5);
            updateMemo(text, cols, rows);
        }
    };
    const memoDebounce = debounce(saveMemo, 500);

    const closeMemo = () => {
        saveMemo();
        shutDown();
    };

    const onKeyUp = (key: string) => {
        if (key === "Escape") {
            closeMemo();
        }
    };

    return (
        <div className={styles.memo}>
            <textarea
                ref={ref}
                name="memo"
                onChange={() => memoDebounce()}
                onKeyUp={(e) => onKeyUp(e.key)}
                onBlur={() => closeMemo()}
            ></textarea>
        </div>
    );
};

export const Notes = () => {
    const [active, setActive] = useState(false);

    return (
        <div className={styles.wrapper}>
            {active
                ? <Memo shutDown={() => setActive(false)}/>
                : <MemoSvg onClick={() => setActive(true)}/>
            }
        </div>
    );
};
