import { BadRequestException, HttpException } from "../";
import { NextApiRequest, NextApiResponse } from "next";
import Entry from "../../../models/entry";
import EntryModel from "../../../database/entry-model";
import EntryStateModel from "../../../database/entry-state-model";
import connect from "../../../database";
import { isValidObjectId } from "mongoose";

const getEntry = async (id: string): Promise<Entry> => {
	await connect();
	const entry = await EntryModel.findById(id);
	if (!entry) throw new BadRequestException();
	return entry;
};

const updateEntry = async (
	id: string,
	{
		stateId,
		content,
		title,
	}: Partial<Pick<Entry, "content" | "stateId" | "title">>,
): Promise<Entry> => {
	await connect();
	if (stateId) {
		if (!isValidObjectId(stateId)) throw new BadRequestException();
		const entryState = await EntryStateModel.findById(stateId);
		if (!entryState) throw new BadRequestException();
	}
	const entry = await EntryModel.findByIdAndUpdate(
		id,
		{
			content,
			stateId,
			title,
		},
		{ new: true, runValidators: true },
	);
	if (!entry) throw new BadRequestException();
	return entry;
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> => {
	try {
		const id = req.query.id?.toString();
		if (!id || !isValidObjectId(id)) throw new BadRequestException();
		switch (req.method) {
			case "PATCH":
				return res.status(200).json({
					updated: await updateEntry(id, req.body),
				});
			case "GET":
				return res.status(200).json({
					entry: await getEntry(id),
				});
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
