package.cpath = ";./?.dll;"
package.path = ";./socket/?.lua;"

-- TODO: Figure out how to reconnect

----------------------------------------------------------------------------------------------
-- Lua Socket documentation here: http://w3.impa.br/~diego/software/luasocket/reference.html
-- You probably want to check out the TCP parts

-- Worth noting in this script is that "client" refers to the client API to bizhawk, and 
-- "conn" refers to the server client connections
----------------------------------------------------------------------------------------------

-- load namespace
socket = require('socket')
print("luasocket is loaded!")
print()

-- script global variable
local frameCount = 0
local isConnected = false
local conn = nil

-- script shutdown hook
event.onexit( function()
	if isConnected then
		print("Closing connection")
		conn:shutdown()
		conn:close()
	end
end)


function disconnect()
	conn:shutdown()
	conn:close()
	isConnected = false
	conn = nil
end

-- bind tcp socket to the server
local establishConnection = coroutine.create( function()
	while 1 do
		if not isConnected then
			if (conn == nil) then
				conn = socket:tcp()
				conn:settimeout(0) -- non-blocking
			end
			print("Attempting to connect...")
			local stat, err = conn:connect("localhost", 53333, 1)
			if (stat == 1) then
				print("Connection established: " .. stat)
				isConnected = true
			elseif (err == 'already connected') then
				print("Connection already established: " .. err)
				isConnected = true;
			else
				print("Error creating connection: " .. err)
			end
		else 
			print("Already connected")
		end
		coroutine.yield()
	end
end);

-- coroutine for looking for server messages
local readMessage = coroutine.create( function()
	while 1 do
		if isConnected then
			local line, err = conn:receive();
			-- if there was no error, send ACK back to the server
			if (line ~= nil and line ~= 'ACK') then

				print("Received: " .. line)
				conn:send("ACK") 
				print("ACK sent")

				-- logic, depending on server command
				if (line == 'MUTE') then
					client.SetSoundOn(false)
				elseif (line == 'UNMUTE') then
					client.SetSoundOn(true)
				else
					print("Unknown command: " .. line)
				end

			elseif (line == 'ACK') then
				print("ACK received")
			-- if we got disconnected...
			elseif (err == 'closed') then
				print("Disconnected: " .. err)
				disconnect()
			-- if request timed out...
			elseif (err == 'timeout') then
				-- do nothing
			end
		end
		coroutine.yield()
	end
end)

print("Starting main loop")
while true do
	if (math.fmod(frameCount, 60) == 0) then
		print("Now")
	end

	if (not isConnected) and (math.fmod(frameCount, 60) == 0) then
		coroutine.resume(establishConnection)
	end

	if isConnected then
		coroutine.resume(readMessage)
	end
		
	if isConnected and (math.fmod(frameCount, 600) == 0) then
--		conn:send("Hello from client! We are at frame " .. frameCount)
	end
	
	emu.frameadvance()
    frameCount = frameCount + 1
end