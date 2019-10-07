# Http Polling

This implementation have Bizhawk send HTTP requests regularly to a server to request new instructions.

Typically, I've found this solution works well when the server program runs on the user's local machine, and you can utilise the loopback interface for http requests.

### Benefits
* Easy to use with standard solutions

### Drawbacks
* Higher performance overhead
* Might hang if the server stops responding or respons slow
* Requires custom command-line parameters when launching Bizhawk

# Setup

To get the HTTP interface to work, you need to enable it via a command-line parameter when Bizhawk starts. Create a shortcut pointing to the EmuHawk executable, then add `--url_get=localhost` into the `Target:` field (where it should say `C:\path\to\EmuHawk.exe`). The key here is that the command-line parameter has to be set, it doesn't really matter what it is.

# Example

To run this example, open a terminal and navigate to the `node-server-example` folder below this folder. Once there run the commands:

* `npm i`
* `npm run start`

This will start a small server with a window application. Then, launch bizhawk, start a game and drag the `lua-polling.lua` to the game window. This will open a lua console window, running the lua script. Now, press the mute or unmute buttons, and see how the game gets muted or unmuted. 

You can now also test what happens when the server dies if you want to, by killing the server window.