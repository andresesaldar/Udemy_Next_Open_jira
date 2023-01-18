import { Dispatch, Reducer, useReducer } from "react";
import { Action } from ".";
import EntryState from "../models/entry-state";

export enum EntryStatesActionTypes {
	SET_ENTRY_STATES = "[Entry states] Set entry states",
	ADD_ENTRY_STATE = "[Entry states] Add entry state",
}

export type EntryStatesState = {
	entryStates: EntryState[];
};

const initialEntryStatesState: EntryStatesState = {
	entryStates: [],
};

export type EntryStatesActions =
	| Action<EntryStatesActionTypes.SET_ENTRY_STATES, EntryState[]>
	| Action<EntryStatesActionTypes.ADD_ENTRY_STATE, EntryState>;

const entryStatesReducer: Reducer<EntryStatesState, EntryStatesActions> = (
	state,
	{ type, payload },
) => {
	if (type === EntryStatesActionTypes.SET_ENTRY_STATES)
		return {
			...state,
			entryStates: payload,
		};
	else if (type === EntryStatesActionTypes.ADD_ENTRY_STATE) {
		const positionedEntryState = state.entryStates.findIndex(
			({ position }) => position === payload.position,
		);
		return {
			...state,
			entryStates:
				positionedEntryState >= 0
					? [
							...state.entryStates.slice(0, positionedEntryState),
							{ ...payload },
							...state.entryStates
								.slice(positionedEntryState)
								.map((entryState) => ({
									...entryState,
									position: entryState.position + 1,
								})),
					  ]
					: [...state.entryStates, { ...payload }],
		};
	}
	return state;
};

export const useEntryStatesReducer = (): [
	EntryStatesState,
	Dispatch<EntryStatesActions>,
] => useReducer(entryStatesReducer, initialEntryStatesState);
