import { Dispatch, Reducer, useReducer } from "react";
import { Action } from ".";
import EntryState from "../models/entry-state";

export enum EntryStatesActionTypes {
	SET_ENTRY_STATES = "[Entry states] Set entry states",
}

export type EntryStatesState = {
	entryStates: EntryState[];
};

const initialEntryStatesState: EntryStatesState = {
	entryStates: [
		{
			_id: "1",
			createdAt: 102938,
			name: "To Do",
			position: 1,
		},
		{
			_id: "2",
			createdAt: 102938,
			name: "In Progress",
			position: 2,
		},
		{
			_id: "4",
			createdAt: 102938,
			name: "Completed",
			position: 4,
		},
		{
			_id: "3",
			createdAt: 102938,
			name: "QA",
			position: 3,
		},
	],
};

export type EntryStatesActions = Action<
	EntryStatesActionTypes.SET_ENTRY_STATES,
	EntryState[]
>;

const entryStatesReducer: Reducer<EntryStatesState, EntryStatesActions> = (
	state,
	{ type, payload },
) => {
	if (type === EntryStatesActionTypes.SET_ENTRY_STATES)
		return {
			...state,
			entryStates: payload,
		};
	return state;
};

export const useEntryStatesReducer = (): [
	EntryStatesState,
	Dispatch<EntryStatesActions>,
] => useReducer(entryStatesReducer, initialEntryStatesState);
