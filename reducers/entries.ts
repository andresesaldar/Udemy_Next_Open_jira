import { Dispatch, Reducer, useReducer } from "react";
import { Action } from ".";
import Entry from "../models/entry";

export enum EntriesActionTypes {
	SET_ENTRIES = "[Entries] Set entries",
	ADD_ENTRY = "[Entries] Add entry",
	CHANGE_ENTRY = "[Entries] Change entry",
}

export type EntriesState = {
	entries: Entry[];
};

export type EntriesActions =
	| Action<EntriesActionTypes.SET_ENTRIES, Entry[]>
	| Action<EntriesActionTypes.ADD_ENTRY, Entry>
	| Action<
			EntriesActionTypes.CHANGE_ENTRY,
			{ id: string; update: Partial<Entry> }
	  >;

const entriesReducer: Reducer<EntriesState, EntriesActions> = (
	state,
	{ type, payload },
) => {
	switch (type) {
		case EntriesActionTypes.SET_ENTRIES:
			return {
				...state,
				entries: payload,
			};
		case EntriesActionTypes.ADD_ENTRY:
			return {
				...state,
				entries: [{ ...payload }, ...state.entries],
			};
		case EntriesActionTypes.CHANGE_ENTRY:
			const entry = state.entries.findIndex((e) => e._id === payload.id);
			const newEntries = [...state.entries];
			if (entry >= 0) {
				newEntries[entry] = {
					...newEntries[entry],
					...payload.update,
				};
			}
			return {
				...state,
				entries: newEntries,
			};
		default:
			return state;
	}
};

export const useEntriesReducer = (
	entries: Entry[] = [],
): [EntriesState, Dispatch<EntriesActions>] =>
	useReducer(entriesReducer, { entries });
