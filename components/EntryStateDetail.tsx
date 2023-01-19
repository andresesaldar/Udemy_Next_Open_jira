import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Typography,
} from "@mui/material";
import { FC, FormEvent, useContext, useState } from "react";
import {
	deleteEntryState,
	updateEntryState,
} from "../integration/entry-states";
import DeleteIcon from "@mui/icons-material/Delete";
import EntryState from "../models/entry-state";
import SaveIcon from "@mui/icons-material/Save";
import SnackbarContext from "../context/SnackbarContext";
import TextFieldWithPreview from "./TextFieldWithPreview";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";

type DeleteEntryStateDialogProps = {
	options: EntryState[];
	show: boolean;
	onClose: () => void;
	onSubmit: (newState: string) => void;
};

const DeleteEntryStateDialog: FC<DeleteEntryStateDialogProps> = ({
	onClose,
	show,
	options,
	onSubmit,
}) => {
	const [newStateId, setNewStateId] = useState<string>("");
	return (
		<Dialog open={show} onClose={onClose}>
			<form
				onSubmit={(e): void => {
					e.preventDefault();
					e.stopPropagation();
					onSubmit(newStateId);
				}}
			>
				<DialogTitle>Delete entry state</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please select another entry state to migrate the entries
						on the current state:
					</DialogContentText>
					<FormControl
						fullWidth
						margin="normal"
						required
						disabled={options.length <= 0}
					>
						<InputLabel id="new-state-label">New state</InputLabel>
						<Select
							labelId="new-state-label"
							id="new-state"
							label="New state"
							value={newStateId}
							onChange={(event): void =>
								setNewStateId(event.target.value)
							}
						>
							{options.map(({ name, _id }, index) => (
								<MenuItem key={index} value={_id}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button
						endIcon={<DeleteIcon />}
						color="error"
						variant="contained"
						type="submit"
						disabled={options.length <= 0}
					>
						Delete
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

type EntryStateDetailProps = {
	entryState: EntryState;
	entryStates: EntryState[];
};

const EntryStateDetail: FC<EntryStateDetailProps> = ({
	entryState,
	entryStates,
}) => {
	const [showDelete, setShowDelete] = useState(false);
	const [name, setName] = useState(entryState.name);
	const [position, setPosition] = useState(entryState.position);
	const { showSnack } = useContext(SnackbarContext);
	const router = useRouter();
	const onSubmit = async (
		event: FormEvent<HTMLDivElement>,
	): Promise<void> => {
		event.preventDefault();
		await updateEntryState(entryState._id, {
			name,
			position,
		});
		showSnack({
			message: "Entry state updated successfully",
			severity: "success",
		});
	};
	const onDeleteSubmit = async (newStateId: string): Promise<void> => {
		await deleteEntryState(entryState._id, newStateId);
		router.replace("/");
	};
	return (
		<Box component="form" onSubmit={onSubmit}>
			<TextFieldWithPreview
				label="Name"
				setValue={setName}
				value={name}
				variant="h4"
				required
			/>
			<FormControl fullWidth margin="normal" required>
				<InputLabel id="position-label">Position</InputLabel>
				<Select
					labelId="position-label"
					id="position"
					label="Position"
					value={position}
					onChange={(event): void =>
						setPosition(Number(event.target.value))
					}
				>
					{entryStates.map(({ position }, index) => (
						<MenuItem key={index} value={position}>
							{position}
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
				{formatDistanceToNow(new Date(entryState.createdAt)) + " ago"}
			</Typography>
			<Stack direction="row" spacing={2}>
				<Button
					variant="contained"
					type="submit"
					endIcon={<SaveIcon />}
					disabled={name.trim().length <= 0}
				>
					Save
				</Button>
				<IconButton
					color="error"
					onClick={(): void => setShowDelete(true)}
				>
					<DeleteIcon />
				</IconButton>
			</Stack>
			<DeleteEntryStateDialog
				onClose={(): void => setShowDelete(false)}
				show={showDelete}
				options={entryStates.filter(
					({ _id }) => _id !== entryState._id,
				)}
				onSubmit={onDeleteSubmit}
			/>
		</Box>
	);
};

export default EntryStateDetail;
