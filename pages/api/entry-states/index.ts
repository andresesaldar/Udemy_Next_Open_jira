import { BadRequestException, HttpException } from "../";
import { NextApiRequest, NextApiResponse } from "next";
import EntryState from "../../../models/entry-state";
import EntryStateModel from "../../../database/entry-state-model";
import connect from "../../../database";

export const getAllEntryStates = async (): Promise<EntryState[]> => {
	await connect();
	return EntryStateModel.find().sort({ position: "asc" });
};

const createEntryState = async ({
	name,
	position,
}: Pick<EntryState, "name" | "position">): Promise<EntryState> => {
	if (!name || !position) throw new BadRequestException();
	await connect();
	await EntryStateModel.updateMany(
		{ position: { $gte: position } },
		{
			$inc: { position: 1 },
		},
	);
	return (await EntryStateModel.create({ name, position })).save();
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> => {
	try {
		switch (req.method) {
			case "GET":
				const entryStates = await getAllEntryStates();
				return res.status(200).json({ entryStates });
			case "POST":
				const entryState = await createEntryState(req.body);
				return res.status(201).json({ entryState });
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
