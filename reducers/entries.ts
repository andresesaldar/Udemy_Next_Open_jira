import { Dispatch, Reducer, useReducer } from "react";
import { Action } from ".";
import Entry from "../models/entry";

export enum EntriesActionTypes {
	SET_ENTRIES = "[Entries] Set entries",
}

export type EntriesState = {
	entries: Entry[];
};

const initialEntriesState: EntriesState = {
	entries: [
		{
			_id: "1",
			content: "Check U tasks",
			createdAt: 1,
			stateId: "1",
			title: "Check tasks",
		},
		{
			_id: "2",
			content: "See Avatar 2",
			createdAt: 2,
			stateId: "1",
			title: "See a movie",
		},
		{
			_id: "3",
			content: "Learn Next on internet",
			createdAt: 3,
			stateId: "2",
			title: "Learn Next",
		},
		{
			_id: "4",
			content: "Finish my sprint 3 tasks",
			createdAt: 4,
			stateId: "3",
			title: "Finish my sprint tasks",
		},
		{
			_id: "5",
			content: "Re learn rxjs for work purposes",
			createdAt: 5,
			stateId: "4",
			title: "Re learn rxjs",
		},
	],
};

export type EntriesActions = Action<EntriesActionTypes.SET_ENTRIES, Entry[]>;

const entriesReducer: Reducer<EntriesState, EntriesActions> = (
	state,
	{ type, payload },
) => {
	if (type === EntriesActionTypes.SET_ENTRIES)
		return {
			...state,
			entries: payload,
		};
	return state;
};

export const useEntriesReducer = (): [EntriesState, Dispatch<EntriesActions>] =>
	useReducer(entriesReducer, initialEntriesState);
