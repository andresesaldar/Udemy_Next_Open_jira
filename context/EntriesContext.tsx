import { Context, Dispatch, FC, PropsWithChildren, createContext } from "react";
import {
	EntriesActionTypes,
	EntriesActions,
	EntriesState,
	useEntriesReducer,
} from "../reducers/entries";
import {
	createEntry,
	getAllEntries,
	updateEntry,
} from "../integration/entries";
import Entry from "../models/entry";

type EntriesMutations = {
	addEntry: (entryData: Pick<Entry, "title" | "content" | "stateId">) => void;
	changeEntry: (id: string, update: Partial<Entry>) => void;
	loadEntries: () => void;
};

const entriesMutations = (
	dispatch: Dispatch<EntriesActions>,
): EntriesMutations => ({
	addEntry: async (entryData) =>
		dispatch({
			payload: await createEntry(entryData),
			type: EntriesActionTypes.ADD_ENTRY,
		}),
	changeEntry: async (id, update) =>
		dispatch({
			payload: { id, update: await updateEntry(id, update) },
			type: EntriesActionTypes.CHANGE_ENTRY,
		}),
	loadEntries: async () =>
		dispatch({
			payload: await getAllEntries(),
			type: EntriesActionTypes.SET_ENTRIES,
		}),
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
