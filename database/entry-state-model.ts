import { Model, Schema, model, models } from "mongoose";
import EntryState from "../models/entry-state";

const entryStateSchema = new Schema<EntryState>(
	{
		name: { required: true, type: String },
		position: { required: true, type: Number },
	},
	{
		collection: "entry_states",
		timestamps: true,
	},
);

const EntryStateModel: Model<EntryState> =
	models.EntryState || model("EntryState", entryStateSchema);

export default EntryStateModel;
