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
