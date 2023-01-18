import Entry from "../models/entry";
import httpClient from ".";

export const getAllEntries = (): Promise<Entry[]> =>
	httpClient
		.get<{ entries: Entry[] }>("/entries")
		.then(({ data: { entries } }) => entries);

export const createEntry = ({
	content,
	stateId,
	title,
}: Pick<Entry, "content" | "stateId" | "title">): Promise<Entry> =>
	httpClient
		.post<{ entry: Entry }>("/entries", { content, stateId, title })
		.then(({ data: { entry } }) => entry);

export const updateEntry = (
	id: string,
	{
		content,
		stateId,
		title,
	}: Partial<Pick<Entry, "content" | "stateId" | "title">>,
): Promise<Entry> =>
	httpClient
		.patch<{ updated: Entry }>(`/entries/${id}`, {
			content,
			stateId,
			title,
		})
		.then(({ data: { updated } }) => updated);
