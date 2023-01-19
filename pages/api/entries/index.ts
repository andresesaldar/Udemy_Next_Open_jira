import { BadRequestException, HttpException } from "../";
import { NextApiRequest, NextApiResponse } from "next";
import Entry from "../../../models/entry";
import EntryModel from "../../../database/entry-model";
import EntryStateModel from "../../../database/entry-state-model";
import connect from "../../../database";

export const getAllEntries = async (): Promise<Entry[]> => {
	await connect();
	return EntryModel.find().sort({ createdAt: "desc" });
};

const createEntry = async ({
	stateId,
	content,
	title,
}: Pick<Entry, "content" | "stateId" | "title">): Promise<Entry> => {
	if (!stateId || !content || !title) throw new BadRequestException();
	await connect();
	const entryState = await EntryStateModel.findById(stateId);
	if (!entryState) throw new BadRequestException();
	return (await EntryModel.create({ content, stateId, title })).save();
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> => {
	try {
		switch (req.method) {
			case "GET":
				return res.status(200).json({ entries: await getAllEntries() });
			case "POST":
				return res
					.status(201)
					.json({ entry: await createEntry(req.body) });

			default:
				return res.status(404).send(undefined);
		}
	} catch (error) {
		const statusCode = (error as HttpException).statusCode;
		return res.status(statusCode || 500).json({
			message: statusCode
				? (error as HttpException).message
				: "Internal Server error",
		});
	}
};

export default handler;
