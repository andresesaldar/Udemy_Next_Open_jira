import { Context, Dispatch, FC, PropsWithChildren, createContext } from "react";
import {
	EntriesActionTypes,
	EntriesActions,
	EntriesState,
	useEntriesReducer,
} from "../reducers/entries";
import Entry from "../models/entry";

type EntriesMutations = {
	setEntries: (entries: Entry[]) => void;
	addEntry: (entryData: Omit<Entry, "createdAt" | "_id">) => void;
	changeEntryState: (id: string, stateId: string) => void;
};

const entriesMutations = (
	dispatch: Dispatch<EntriesActions>,
): EntriesMutations => ({
	addEntry: (entryData) =>
		dispatch({
			payload: {
				...entryData,
				_id: Math.random().toString(),
				createdAt: Date.now(),
			},
			type: EntriesActionTypes.ADD_ENTRY,
		}),
	changeEntryState: (id, stateId) =>
		dispatch({
			payload: { id, stateId },
			type: EntriesActionTypes.CHANGE_ENTRY_STATE,
		}),
	setEntries: (entries) =>
		dispatch({ payload: entries, type: EntriesActionTypes.SET_ENTRIES }),
});

type EntriesContextData = EntriesState & EntriesMutations;

const EntriesContext: Context<EntriesContextData> = createContext(
	{} as EntriesContextData,
);

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useEntriesReducer();
	return (
		<EntriesContext.Provider
			value={{ ...state, ...entriesMutations(dispatch) }}
		>
			{children}
		</EntriesContext.Provider>
	);
};

export default EntriesContext;
