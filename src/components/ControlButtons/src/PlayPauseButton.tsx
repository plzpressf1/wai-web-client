import { observer } from "mobx-react";
import { GameStore } from "stores/GameStore";
import { ReactComponent as PlaySvg } from "svg/play.svg";
import { ReactComponent as PauseSvg } from "svg/pause.svg";

const PlayPauseButtonComponent = () => {
    if (!GameStore.settings.timer) return null;
    if (GameStore.state.running) return <PauseSvg onClick={() => GameStore.pause()}/>;
    return <PlaySvg onClick={() => GameStore.play()}/>;
};

export const PlayPauseButton = observer(PlayPauseButtonComponent);
