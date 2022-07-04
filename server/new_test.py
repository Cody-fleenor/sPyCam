import asyncio, websockets

async def connection_handler(socket, connection):
    print(f"[NEW CONNECTION] {addr} connected.")
    connected = True

    while connected:
        msg = socket.recv()
        print(msg_length, ' ---- recveiced')
    stop_request = asyncio.Event()
    test(stop_request)

async def test(stop_request):
    # occasionally stop the server to test it
    while True:
        await asyncio.sleep(200)
        print('requesting stop')
        stop_request.set()

async def main():
    stop_request = asyncio.Event()
    asyncio.create_task(test(stop_request))
    while True:
        print('starting the server')
        server = await websockets.serve(connection_handler, 'localhost', 9000)
        await stop_request.wait()
        stop_request.clear()
        print('stopping the server')
        server.close()
        await server.wait_closed()

asyncio.run(main())