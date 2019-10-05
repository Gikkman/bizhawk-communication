package.cpath = ";./?.dll;"
package.path = ";./socket/?.lua;"

----------------------------------------------------------------------------------------------
-- Lua Socket documentation here: http://w3.impa.br/~diego/software/luasocket/reference.html
-- You probably want to check out the TCP parts

-- Worth noting in this script is that "client" refers to the client API to bizhawk, and 
-- "conn" refers to the server client connections
----------------------------------------------------------------------------------------------

-- load namespace
socket = require('socket')
print("luasocket is loaded!")

-- create a TCP socket and bind it to the local host, at any port
local server = assert(socket.bind("127.0.0.1", 53333, 1))
if (server == nil) then
	print("Error creating server. Port is probably in use.")
	return;
end

event.onexit( function()
	print("Closing server")
	server:close()
end)

-- find out which port the OS chose for us
local ip, port = server:getsockname()
server:settimeout(0) -- non-blocking

-- print a message informing what's up
print("Please connect (telnet) to localhost on port " .. port)

-- loop forever waiting for clients
local co = coroutine.create( function()
	while 1 do
		-- wait for a connection from any client
		local conn, err = server:accept()
		if not err then 
			-- make sure we don't block waiting for this client's line
			conn:settimeout(1)
			-- receive the line
			local line, err = conn:receive()
			-- if there was no error, send it back to the client
			if not err then 
				print("Received: " .. line)
				conn:send("Ack") 
				print("Ack sent")

				-- logic, depending on line
				if (line == 'MUTE') then
					client.SetSoundOn(false)
				elseif (line == 'UNMUTE') then
					client.SetSoundOn(true)
				else
					print("Unknown command: " .. line)
				end

			else
				print("Error:" .. err)
			end
			-- done with client, close the object
			print("Closing client");
			conn:close()
		else
--			print(err)
		end
		coroutine.yield()
	end
end)

while true do
	emu.frameadvance()
	coroutine.resume(co)
end