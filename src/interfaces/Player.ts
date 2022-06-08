export interface Player {
    id: string;
    name: string;
    secret: string;
    picture: string;
    connected: boolean;
}

export enum QuestionStatus {
    Default,
    Yes,
    No,
}

export enum DecisionStatus {
    Default,
    Yes,
    No,
    Doubt,
}

export interface PlayerControls {
    id: string;
    connected: boolean;
    questionStage: boolean;
    questions: QuestionStatus[];
    decision: DecisionStatus;
}
