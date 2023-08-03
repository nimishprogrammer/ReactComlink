import React, { useState } from "react";
import "./App.css";
import { runBigTask, runBigTaskAsync } from "./utils";
import { wrap } from "comlink";

function App() {
    const [data, setData] = useState<string>();
    return (
        <div className='App'>
            <div>
                <h1> Comlink and React + Typescript </h1>
            </div>
            <div>
                <button
                    className='button-5'
                    onClick={() => {
                        console.log("Hi Websocket");
                    }}
                >
                    Say Hi
                </button>
                <button
                    className='button-5'
                    onClick={async () => {
                        setData("loading");
                        const worker = new Worker(
                            new URL("./worker.ts", import.meta.url),
                            {
                                name: "runBigTaskWorker",
                                type: "module",
                            }
                        );
                        const { runBigTask } =
                            wrap<import("./worker").RunBigTaskWorker>(worker);
                        setData(await runBigTask(100000000));
                    }}
                >
                    WebWorker
                </button>
                <button
                    className='button-5'
                    onClick={() => {
                        console.log("loading");
                        setData(runBigTask(100000000));
                    }}
                >
                    Sync On main thread
                </button>

                <button
                    className='button-5'
                    onClick={async () => {
                        setData("AsyncThread");
                        setData(await runBigTaskAsync(100000000));
                    }}
                >
                    Async on main Thread
                </button>
            </div>

            <h3>{data}</h3>
        </div>
    );
}

export default App;
