import { create } from "zustand";
import {combine} from "zustand/middleware";


export const userStore = create(
    combine({
        account: null as null | true
    }, (set) => ({
        setAccount: (account: true | null): void => set({account})
    }))
);
