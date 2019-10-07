import { send } from "../Server";

/************************************************************************
 *  Export
 ************************************************************************/
export enum BizhawkAction {
    MUTE = "MUTE",
    UNMUTE = "UNMUTE"
}

export function pushBizhawkEventStack(action: BizhawkAction) {
    send(action);
}