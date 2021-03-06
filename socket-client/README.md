# Socket Servier

This implementation will open a socket client in Bizhawk which connects to a server, and then send and receive messages. 

Typically, I've found this solution works when the server is far away, and/or connection is unstable.

### Benefits
* Messages arrive at once
* Low performance cost
* Stable
* Duplex messaging

### Drawbacks
* Managing clients can be difficult
* Users need additional dependencies
* Users may need to change a Bizhawk config for this to work

# Setup

You might need to make a config change in Bizhawk for this to work. Open EmuHawk, go to `Config -> Customize -> Advanced` and tick `Lua Core - Lua+LuaInterface`. After ticking this, restart EmuHawk.

I don't know exactly why this is needed, but I can't get it to work without this option. 

# Example

To run this example, open a terminal and navigate to the `node-server-example` folder below this folder. Once there run the commands:

* `npm i`
* `npm run start`

This will start a small server with a window application. Then, launch bizhawk, start a game and drag the `lua-socket-client.lua` to the game window. This will open a lua console window, running the lua script. Now, press the mute or unmute buttons, and see how the game gets muted or unmuted. 