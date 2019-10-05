import {bindGet, bindPost} from '../Server';
import * as BizhawkService from './BizhawkService';
import { ipcMain } from 'electron';

let initialized = false;

export function init() {
    if(initialized) return;
    initialized = true;

    bindGet("/bizhawk/peek", (req, res) => {
        let event = BizhawkService.peekBizhawkEventStack();
        if(event) {
            console.log("Bizhawk peek: " + event.action);
            res.send(event.action);
        }
        else {
            res.send();
        }
    });
    
    bindPost("/bizhawk/pop", (req, res) => {
        console.log("Bizhawk pop");
        BizhawkService.popBizhawkEventStack();
        res.send();
    });

    ipcMain.addListener('mute', (event) => {
        BizhawkService.pushBizhawkEventStack(BizhawkService.BizhawkAction.MUTE);
        event.sender.send('ack', 'Event MUTE pushed to Bizhawk event stack');
    });
    ipcMain.addListener('unmute', (event) => {
        BizhawkService.pushBizhawkEventStack(BizhawkService.BizhawkAction.UNMUTE);
        event.sender.send('ack', 'Event UNMUTE pushed to Bizhawk event stack');
    });
}