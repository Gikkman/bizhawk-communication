/************************************************************************
 *  Variables
 ************************************************************************/
let queue : BizhawkEvent[] = [];

interface BizhawkEvent {
    action: string
}

/************************************************************************
 *  Export
 ************************************************************************/
export enum BizhawkAction {
    MUTE = "MUTE",
    UNMUTE = "UNMUTE"
}

 export function peekBizhawkEventStack() : BizhawkEvent {
    return queue[0];
}

export function popBizhawkEventStack() : BizhawkEvent {
    return queue.shift();
}

export function pushBizhawkEventStack(action: BizhawkAction) {
    let event = {
        action: action
    };
    queue.push(event);
}