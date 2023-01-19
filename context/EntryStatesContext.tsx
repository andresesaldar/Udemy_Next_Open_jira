import { Context, Dispatch, FC, PropsWithChildren, createContext } from "react";
import {
	EntryStatesActionTypes,
	EntryStatesActions,
	EntryStatesState,
	useEntryStatesReducer,
} from "../reducers/entry-states";
import EntryState from "../models/entry-state";
import { createEntryState } from "../integration/entry-states";

type EntryStatesMutations = {
	addEntryState: (
		entryStateData: Pick<EntryState, "name" | "position">,
	) => Promise<void>;
};

const entryStatesMutations = (
	dispatch: Dispatch<EntryStatesActions>,
): EntryStatesMutations => ({
	addEntryState: async (entryStateData) =>
		dispatch({
			payload: await createEntryState(entryStateData),
			type: EntryStatesActionTypes.ADD_ENTRY_STATE,
		}),
});

type EntryStatesContextData = EntryStatesState & EntryStatesMutations;

const EntryStatesContext: Context<EntryStatesContextData> = createContext(
	{} as EntryStatesContextData,
);

type EntryStatesProviderProps = {
	entryStates?: EntryState[];
} & PropsWithChildren;

export const EntryStatesProvider: FC<EntryStatesProviderProps> = ({
	children,
	entryStates,
}) => {
	const [state, dispatch] = useEntryStatesReducer(entryStates);
	return (
		<EntryStatesContext.Provider
			value={{ ...state, ...entryStatesMutations(dispatch) }}
		>
			{children}
		</EntryStatesContext.Provider>
	);
};

export default EntryStatesContext;
