import { ReactNode } from "react";
import { lobbyWs } from "api";
import { getUser } from "ls";
import { printTime } from "utils/time";
import { DecisionStatus, PlayerControls, QuestionStatus } from "interfaces/Player";
import { ReactComponent as QuestionSvg } from "svg/question.svg";
import { ReactComponent as YesSvg } from "svg/yes.svg";
import { ReactComponent as NoSvg } from "svg/no.svg";
import { ReactComponent as DoubtSvg } from "svg/doubt.svg";
import styles from "./styles.module.scss";

const Questions = ({ questions }: { questions: QuestionStatus[] }) => {
    const pickIcon = (q: QuestionStatus, i: number) => {
        switch (q) {
            case QuestionStatus.Default: return <QuestionSvg key={i} className={`${styles.svg} ${styles.question}`}/>;
            case QuestionStatus.Yes: return <YesSvg key={i} className={`${styles.svg} ${styles.yes}`}/>;
            case QuestionStatus.No: return <NoSvg key={i} className={`${styles.svg} ${styles.no}`}/>;
        }
    }

    return (
        <div className={styles.questions}>
            {questions.map((q, i) => pickIcon(q, i))}
        </div>
    );
};

const Timer = ({ time }: { time: number }) => {
    return <div>{printTime(time)}</div>;
}

interface PossibleDecisionProps {
    type: DecisionStatus;
    btnStyles: string;
    svgComponent: ReactNode;
    text: string;
}

const Decisions = ({ decision }: { decision: DecisionStatus } ) => {
    const possibleDecisions: PossibleDecisionProps[] = [];
    possibleDecisions.push({
        type: DecisionStatus.Yes,
        btnStyles: styles.button,
        svgComponent: <YesSvg className={`${styles.svg} ${styles.yes}`}/>,
        text: "Да",
    });
    possibleDecisions.push({
        type: DecisionStatus.No,
        btnStyles: styles.button,
        svgComponent: <NoSvg className={`${styles.svg} ${styles.no}`}/>,
        text: "Нет",
    });
    possibleDecisions.push({
        type: DecisionStatus.Doubt,
        btnStyles: styles.button,
        svgComponent: <DoubtSvg className={`${styles.svg} ${styles.doubt}`}/>,
        text: "хз...",
    });

    switch (decision) {
        case DecisionStatus.Yes: possibleDecisions[0].btnStyles += ` ${styles.active}`; break;
        case DecisionStatus.No: possibleDecisions[1].btnStyles += ` ${styles.active}`; break;
        case DecisionStatus.Doubt: possibleDecisions[2].btnStyles += ` ${styles.active}`; break;
    }

    const onDecisionClick = (decision: DecisionStatus) => {
        lobbyWs?.emit("flow/decision", { id: getUser().id, decision });
    };

    return (
        <div className={styles.decisions}>
            {possibleDecisions.map((des, i) =>
                <button
                    key={i}
                    className={des.btnStyles}
                    onClick={() => onDecisionClick(des.type)}
                >
                    {des.svgComponent}
                    <span>{des.text}</span>
                </button>
            )}
        </div>
    );
};

export const PlayerControlsSlot = ({ controls, timer }: { controls: PlayerControls, timer: number }) => {
    const me = getUser().id === controls.id;

    const pickDecision = (decision: DecisionStatus) => {
        switch (decision) {
            case DecisionStatus.Default: return "Принимает решение";
            case DecisionStatus.Yes: return "Да!";
            case DecisionStatus.No: return "Нет :(";
            case DecisionStatus.Doubt: return "хз...";
        }
    };

    if (!controls.connected) return <div className={`${styles.slot} ${styles.disconnected}`}></div>;
    return (
        <div className={styles.slot}>
            <Questions questions={controls.questions}/>
            <div className={styles.bottom}>
                {controls.questionStage
                    ? <Timer time={timer}/>
                    : <>
                        {me
                            ? <Decisions decision={controls.decision}/>
                            : <div>{pickDecision(controls.decision)}</div>
                        }
                    </>
                }
            </div>
        </div>
    );
};
