import { BadRequestException, HttpException } from "../";
import { NextApiRequest, NextApiResponse } from "next";
import EntryModel from "../../../database/entry-model";
import EntryState from "../../../models/entry-state";
import EntryStateModel from "../../../database/entry-state-model";
import connect from "../../../database";
import { isValidObjectId } from "mongoose";

export const getEntryState = async (id: string): Promise<EntryState> => {
	await connect();
	const entryState = await EntryStateModel.findById(id);
	if (!entryState) throw new BadRequestException();
	return entryState;
};

const deleteEntryState = async (
	id: string,
	newId: string,
): Promise<EntryState> => {
	await connect();
	if (id === newId) throw new BadRequestException();
	const [entryState, newEntryState] = await Promise.all([
		EntryStateModel.findById(id),
		EntryStateModel.findById(newId),
	]);
	if (!entryState || !newEntryState) throw new BadRequestException();
	await Promise.all([
		EntryStateModel.updateMany(
			{
				position: {
					$gt: entryState.position,
				},
			},
			{
				$inc: {
					position: -1,
				},
			},
		),
		EntryModel.updateMany(
			{
				stateId: id,
			},
			{
				stateId: newId,
			},
		),
	]);
	await entryState.delete();
	return entryState;
};

const updateEntryState = async (
	id: string,
	{ name, position }: Partial<Pick<EntryState, "name" | "position">>,
): Promise<EntryState> => {
	await connect();
	let entryState = await EntryStateModel.findById(id);
	if (!entryState) throw new BadRequestException();
	if (position) {
		if (position <= 0) throw new BadRequestException();
		const maxPositionEntryState = await EntryStateModel.findOne().sort({
			position: -1,
		});
		if (position > (maxPositionEntryState?.position || 0))
			throw new BadRequestException();
		await EntryStateModel.updateMany(
			{
				position:
					position < entryState.position
						? {
								$gte: position,
								$lt: entryState.position,
						  }
						: {
								$gt: entryState.position,
								$lte: position,
						  },
			},
			{
				$inc: {
					position: position < entryState.position ? 1 : -1,
				},
			},
		);
	}
	if (name) entryState.name = name;
	if (position) entryState.position = position;
	entryState = await entryState.save();
	if (!entryState) throw new BadRequestException();
	return entryState;
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> => {
	try {
		const id = req.query.id?.toString();
		if (!id || !isValidObjectId(id)) throw new BadRequestException();
		switch (req.method) {
			case "GET":
				return res.status(200).json({
					updated: await getEntryState(id),
				});
			case "PATCH":
				return res.status(200).json({
					updated: await updateEntryState(id, req.body),
				});
			case "DELETE":
				return res.status(200).json({
					entryState: await deleteEntryState(
						id,
						req.query.newState?.toString() || "",
					),
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
