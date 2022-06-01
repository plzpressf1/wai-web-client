import styles from "./styles.module.scss";

export const PlayerImage = ({ picture }: { picture: string }) => {
    if (!picture) return null;
    return (
        <div className={styles.wrapper}>
            <img src={picture}
                 alt="подсказка"
                //onClick={}
            />
        </div>
    );
};
