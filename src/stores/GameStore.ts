import { observable, action, makeObservable } from "mobx";
import { lobbyWs } from "api";

const defaultSettings: GameSettings = {
    timer: false,
    playerTime: 120,
};

export interface GameSettings {
    timer: boolean;
    playerTime: number; // player time to ask all questions in seconds
}

const defaultState: GameState = {
    started: false,
    running: false,
};

export interface GameState {
    started: boolean;
    running: boolean;
}

class Store {
    public settings: GameSettings;
    public state: GameState;

    constructor() {
        this.settings = defaultSettings;
        this.state = defaultState;

        makeObservable(this, {
            settings: observable,
            state: observable,
            setSettings: action,
            setState: action,
        });
    }

    setSettings(settings: GameSettings) {
        this.settings = settings;
    }

    setState(state: GameState) {
        this.state = state;
    }

    updateSettings(settings: GameSettings) {
        lobbyWs?.emit("settings/change", { settings });
    }

    play() {
        lobbyWs?.emit("state/running", { running: true });
    }

    pause() {
        lobbyWs?.emit("state/running", { running: false });
    }
}

export const GameStore = new Store();
