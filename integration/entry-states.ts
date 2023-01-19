import EntryState from "../models/entry-state";
import httpClient from ".";

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

export const updateEntryState = (
	id: string,
	{ name, position }: Partial<Pick<EntryState, "name" | "position">>,
): Promise<EntryState> =>
	httpClient
		.patch<{ entryState: EntryState }>(`/entry-states/${id}`, {
			name,
			position,
		})
		.then(({ data: { entryState } }) => entryState);

export const deleteEntryState = (
	id: string,
	newStateId: string,
): Promise<EntryState> =>
	httpClient
		.delete<{ entryState: EntryState }>(
			`/entry-states/${id}?newState=${newStateId}`,
		)
		.then(({ data: { entryState } }) => entryState);
