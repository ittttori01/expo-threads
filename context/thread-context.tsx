import * as React from "react";
import { generateThreads } from "../utils/generate-dommy-data";
import { Thread } from "../types/threads";

export const ThreadsContext = React.createContext<Thread[]>([]);

export const ThreadsProvider = ({
    children, // react element
}: React.PropsWithChildren): JSX.Element => {
    const [threads, setThreades] = React.useState<Thread[]>([]);
    React.useEffect(() => {
        setThreades(generateThreads());
    }, []);
    return (
        <ThreadsContext.Provider value={threads}>
            {children}
        </ThreadsContext.Provider>
    );
};
