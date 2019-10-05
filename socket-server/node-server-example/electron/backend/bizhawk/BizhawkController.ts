import * as BizhawkService from './BizhawkService';
import { ipcMain } from 'electron';

let initialized = false;

export function init() {
    if(initialized) return;
    initialized = true;

    ipcMain.addListener('mute', (event) => {
        BizhawkService.pushBizhawkEventStack(BizhawkService.BizhawkAction.MUTE);
        event.sender.send('ack', 'Event MUTE pushed to Bizhawk');
    });
    ipcMain.addListener('unmute', (event) => {
        BizhawkService.pushBizhawkEventStack(BizhawkService.BizhawkAction.UNMUTE);
        event.sender.send('ack', 'Event UNMUTE pushed to Bizhawk');
    });
}