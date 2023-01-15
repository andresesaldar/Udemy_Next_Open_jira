import { Model, Schema, model, models } from "mongoose";
import Entry from "../models/entry";

const entrySchema = new Schema<Entry<Schema.Types.ObjectId>>(
	{
		content: { required: true, type: String },
		stateId: {
			required: true,
			type: Schema.Types.ObjectId,
		},
		title: { required: true, type: String },
	},
	{
		timestamps: {
			createdAt: true,
		},
	},
);

const EntryModel: Model<Entry> = models.Entry || model("Entry", entrySchema);

export default EntryModel;
