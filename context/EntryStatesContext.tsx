import { Context, Dispatch, FC, PropsWithChildren, createContext } from "react";
import {
	EntryStatesActionTypes,
	EntryStatesActions,
	EntryStatesState,
	useEntryStatesReducer,
} from "../reducers/entry-states";
import {
	createEntryState,
	getAllEntryStates,
} from "../integration/entry-states";
import EntryState from "../models/entry-state";

type EntryStatesMutations = {
	addEntryState: (
		entryStateData: Pick<EntryState, "name" | "position">,
	) => void;
	loadEntryStates: () => void;
};

const entryStatesMutations = (
	dispatch: Dispatch<EntryStatesActions>,
): EntryStatesMutations => ({
	addEntryState: async (entryStateData) =>
		dispatch({
			payload: await createEntryState(entryStateData),
			type: EntryStatesActionTypes.ADD_ENTRY_STATE,
		}),
	loadEntryStates: async () =>
		dispatch({
			payload: await getAllEntryStates(),
			type: EntryStatesActionTypes.SET_ENTRY_STATES,
		}),
});

type EntryStatesContextData = EntryStatesState & EntryStatesMutations;

const EntryStatesContext: Context<EntryStatesContextData> = createContext(
	{} as EntryStatesContextData,
);

export const EntryStatesProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useEntryStatesReducer();
	return (
		<EntryStatesContext.Provider
			value={{ ...state, ...entryStatesMutations(dispatch) }}
		>
			{children}
		</EntryStatesContext.Provider>
	);
};

export default EntryStatesContext;
