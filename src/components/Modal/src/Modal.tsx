import { ReactNode } from "react";
import styles from "./styles.module.scss";

export interface ModalProps {
    children?: ReactNode;
    onClose?: () => void;
    className?: string;
    backgroundColor?: string;
    opacity?: number;
}

export const Modal = ({ children, onClose, className, backgroundColor, opacity }: ModalProps) => {
    if (!className) className = "";
    return (
        <div
            className={`${styles.fs} ${className}`}
            style={{ zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center" }}
        >
            <div
                className={styles.fs}
                onClick={onClose}
                style={{ zIndex: -1, backgroundColor: backgroundColor ?? "#000", opacity: opacity ?? 0.8 }}
            />
            {children}
        </div>
    );
};
