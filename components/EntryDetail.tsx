import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Typography,
} from "@mui/material";
import { FC, FormEvent, useContext, useState } from "react";
import { deleteEntry, updateEntry } from "../integration/entries";
import DeleteIcon from "@mui/icons-material/Delete";
import Entry from "../models/entry";
import EntryState from "../models/entry-state";
import SaveIcon from "@mui/icons-material/Save";
import SnackbarContext from "../context/SnackbarContext";
import TextFieldWithPreview from "./TextFieldWithPreview";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";

type EntryDetailProps = {
	entry: Entry;
	entryStates: EntryState[];
};

const EntryDetail: FC<EntryDetailProps> = ({ entry, entryStates }) => {
	const [title, setTitle] = useState(entry.title);
	const [content, setContent] = useState(entry.content);
	const [stateId, setStateId] = useState(entry.stateId);
	const { showSnack } = useContext(SnackbarContext);
	const router = useRouter();
	const onDeleteClick = async (): Promise<void> => {
		await deleteEntry(entry._id);
		router.replace("/");
	};
	const onSubmit = async (
		event: FormEvent<HTMLDivElement>,
	): Promise<void> => {
		event.preventDefault();
		await updateEntry(entry._id, {
			content,
			stateId,
			title,
		});
		showSnack({
			message: "Entry updated successfully",
			severity: "success",
		});
	};
	return (
		<Box component="form" onSubmit={onSubmit}>
			<TextFieldWithPreview
				label="Title"
				setValue={setTitle}
				value={title}
				variant="h4"
				required
			/>
			<TextFieldWithPreview
				label="Content"
				setValue={setContent}
				value={content}
				variant="body1"
				required
				multiline
			/>
			<FormControl fullWidth margin="normal">
				<InputLabel id="state-label">State</InputLabel>
				<Select
					labelId="state-label"
					id="state"
					label="State"
					required
					value={stateId}
					onChange={(event): void => setStateId(event.target.value)}
				>
					{entryStates.map(({ name, _id }, index) => (
						<MenuItem key={index} value={_id}>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Typography
				color="text.secondary"
				variant="subtitle2"
				padding={1}
				marginBottom={1}
			>
				{formatDistanceToNow(new Date(entry.createdAt)) + " ago"}
			</Typography>
			<Stack direction="row" spacing={2}>
				<Button
					variant="contained"
					type="submit"
					endIcon={<SaveIcon />}
					disabled={
						content.trim().length <= 0 || title.trim().length <= 0
					}
				>
					Save
				</Button>
				<IconButton color="error" onClick={onDeleteClick}>
					<DeleteIcon />
				</IconButton>
			</Stack>
		</Box>
	);
};

export default EntryDetail;
