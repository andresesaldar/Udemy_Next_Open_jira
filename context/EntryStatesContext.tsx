import { Context, Dispatch, FC, PropsWithChildren, createContext } from "react";
import {
	EntryStatesActionTypes,
	EntryStatesActions,
	EntryStatesState,
	useEntryStatesReducer,
} from "../reducers/entry-states";
import EntryState from "../models/entry-state";

type EntryStatesMutations = {
	setEntryStates: (entryStates: EntryState[]) => void;
};

const entryStatesMutations = (
	dispatch: Dispatch<EntryStatesActions>,
): EntryStatesMutations => ({
	setEntryStates: (EntryStates) =>
		dispatch({
			payload: EntryStates,
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
