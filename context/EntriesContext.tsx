import { Context, Dispatch, FC, PropsWithChildren, createContext } from "react";
import {
	EntriesActionTypes,
	EntriesActions,
	EntriesState,
	useEntriesReducer,
} from "../reducers/entries";
import { createEntry, updateEntry } from "../integration/entries";
import Entry from "../models/entry";

type EntriesMutations = {
	addEntry: (
		entryData: Pick<Entry, "title" | "content" | "stateId">,
	) => Promise<void>;
	changeEntry: (id: string, update: Partial<Entry>) => Promise<void>;
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
});

type EntriesContextData = EntriesState & EntriesMutations;

const EntriesContext: Context<EntriesContextData> = createContext(
	{} as EntriesContextData,
);

type EntriesProviderProps = {
	entries?: Entry[];
} & PropsWithChildren;

export const EntriesProvider: FC<EntriesProviderProps> = ({
	children,
	entries,
}) => {
	const [state, dispatch] = useEntriesReducer(entries);
	return (
		<EntriesContext.Provider
			value={{ ...state, ...entriesMutations(dispatch) }}
		>
			{children}
		</EntriesContext.Provider>
	);
};

export default EntriesContext;
