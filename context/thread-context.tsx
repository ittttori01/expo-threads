import * as React from "react";
import { generateThreads } from "../utils/generate-dommy-data";
import { Thread } from "../types/threads";

export const ThreadsContext = React.createContext<Thread[]>([]);

export const ThreadsProvider = () => {};
