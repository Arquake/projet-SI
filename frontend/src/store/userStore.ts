import { create } from "zustand";
import {combine} from "zustand/middleware";


export const userStore = create(
    combine({
        account: null as null | number
    }, (set) => ({
        setAccount: (account: number | null): void => set({account})
    }))
);
