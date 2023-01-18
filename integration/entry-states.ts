import EntryState from "../models/entry-state";
import httpClient from ".";

export const getAllEntryStates = (): Promise<EntryState[]> =>
	httpClient
		.get<{ entryStates: EntryState[] }>("/entry-states")
		.then(({ data: { entryStates } }) => entryStates);

export const createEntryState = ({
	name,
	position,
}: Pick<EntryState, "name" | "position">): Promise<EntryState> =>
	httpClient
		.post<{ entryState: EntryState }>("/entry-states", {
			name,
			position,
		})
		.then(({ data: { entryState } }) => entryState);
