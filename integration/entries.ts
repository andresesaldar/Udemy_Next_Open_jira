import Entry from "../models/entry";
import httpClient from ".";

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

export const deleteEntry = (id: string): Promise<Entry> =>
	httpClient
		.delete<{ entry: Entry }>(`/entries/${id}`)
		.then(({ data: { entry } }) => entry);
