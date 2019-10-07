import { ipcRenderer } from 'electron';

/************************************************************************
 *  Event listeners
 ************************************************************************/
ipcRenderer.addListener('ack', (event, data) => {
    console.log("Event 'ack' received. Received data: ");
    console.log(data);
})

/************************************************************************
 *  Explicit methods
 ************************************************************************/
function sendMute() {
    ipcRenderer.send('mute');
    console.log("Event 'mute' sent.");
}

function sendUnmute() {
    ipcRenderer.send('unmute');
    console.log("Event 'unmute' sent.");
}