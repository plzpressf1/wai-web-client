import { useEffect, useRef, MouseEvent } from "react";
import debounce from "utils/debounce";
import { getMemo, PosSize, updateMemo } from "ls";
import { Modal } from "components/Modal";
import styles from "./styles.module.scss";

const numberToPixels = (num: number) => num === 0 ? "0" : `${num}px`;
const pixelsToNumber = (px: string) => parseInt(px);

export const Notes = ({ shutDown }: { shutDown: () => void }) => {
    const headerHeight = 30;
    const headerRef = useRef<HTMLDivElement>(null);
    const memoRef = useRef<HTMLTextAreaElement>(null);
    let isDragging = false, shiftX: number, shiftY: number;

    useEffect(() => {
        if (memoRef.current) {
            const { text, posSize } = getMemo();
            memoRef.current.value = text;
            memoRef.current.focus();
            setMemoPosSize(posSize);

            document.addEventListener("mousemove", onDrag);
            document.addEventListener("mouseup", onDragEnd);

            return () => {
                document.removeEventListener("mousemove", onDrag);
                document.removeEventListener("mouseup", onDragEnd);
            };
        }
        // TODO: ...
        // eslint-disable-next-line
    }, []);

    const setMemoPosSize = (posSize: PosSize) => {
        if (headerRef.current && memoRef.current) {
            // minimum top/width/height restrictions
            if (posSize.w < 100) posSize.w = 100;
            if (posSize.h < 50) posSize.h = 50;
            if (posSize.y < headerHeight) posSize.y = headerHeight;

            headerRef.current.style.left = numberToPixels(posSize.x);
            headerRef.current.style.top = numberToPixels(posSize.y - headerHeight);
            headerRef.current.style.width = numberToPixels(posSize.w);
            headerRef.current.style.height = numberToPixels(headerHeight);

            memoRef.current.style.left = numberToPixels(posSize.x);
            memoRef.current.style.top = numberToPixels(posSize.y);
            memoRef.current.style.width = numberToPixels(posSize.w);
            memoRef.current.style.height = numberToPixels(posSize.h);
        }
    };

    const moveMemo = (x: number, y: number) => {
        if (headerRef.current && memoRef.current) {
            headerRef.current.style.left = numberToPixels(x);
            headerRef.current.style.top = numberToPixels(y - headerHeight);
            memoRef.current.style.left = numberToPixels(x);
            memoRef.current.style.top = numberToPixels(y);
        }
    };

    const saveMemo = () => {
        if (memoRef.current) {
            const text = memoRef.current.value;
            const x = memoRef.current.style.left;
            const y = memoRef.current.style.top;
            const w = memoRef.current.style.width;
            const h = memoRef.current.style.height;
            const posSize: PosSize = {
                x: pixelsToNumber(x),
                y: pixelsToNumber(y),
                w: pixelsToNumber(w),
                h: pixelsToNumber(h)
            };
            updateMemo(text, posSize);
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

    const onDrag = (e: globalThis.MouseEvent) => {
        if (isDragging) {
            moveMemo(e.clientX - shiftX, e.clientY + shiftY);
        }
        else {
            if (headerRef.current && memoRef.current) {
                headerRef.current.style.width = memoRef.current.style.width;
            }
        }
    };

    const onDragStart = (e: MouseEvent) => {
        if (headerRef.current) {
            isDragging = true;
            shiftX = e.clientX - headerRef.current.getBoundingClientRect().x;
            shiftY = e.clientY - headerRef.current.getBoundingClientRect().y;
            shiftY = headerHeight - shiftY;
        }
    };

    const onDragEnd = () => {
        isDragging = false;
    };

    return (
        <Modal
            onClose={closeMemo}
            className={`${styles.memo}`}
            opacity={0}
        >
            <div
                ref={headerRef}
                className={styles.header}
                onMouseDown={(e) => onDragStart(e)}
            />
            <textarea
                ref={memoRef}
                name="memo"
                onChange={() => memoDebounce()}
                onKeyUp={(e) => onKeyUp(e.key)}
            />
        </Modal>
    );
};
