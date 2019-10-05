local url = "http://127.0.0.1:8088/bizhawk"
local getUrl = url .. "/peek"
local postUrl = url .. "/pop"
local frameCount = 0

function request() 
    res = comm.httpGet(getUrl)
    if (res ~= '') then
        print("Action: " .. res)
        if (res == 'MUTE') then
            client.SetSoundOn(false)
            comm.httpPost(postUrl, "")
        elseif (res == 'UNMUTE') then
            client.SetSoundOn(true)
            comm.httpPost(postUrl, "")
        end
    end
end

while true do
    -- Poll every 6 frames (i.e. every 0.1 seconds)
    if (math.fmod(frameCount, 6) == 0) then 
        request()
    end

    emu.frameadvance()
    frameCount = frameCount + 1
end