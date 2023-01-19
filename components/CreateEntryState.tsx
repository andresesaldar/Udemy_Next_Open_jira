import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material";
import {
	ChangeEvent,
	FC,
	FormEvent,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import AddIcon from "@mui/icons-material/Add";
import EntryStatesContext from "../context/EntryStatesContext";

type CreateEntryStateForm = {
	onClose?: () => void;
};

const CreateEntryStateForm: FC<CreateEntryStateForm> = ({
	onClose = (): void => undefined,
}) => {
	const [name, setName] = useState("");
	const [position, setPosition] = useState(1);
	const { entryStates, addEntryState } = useContext(EntryStatesContext);
	const defaultPosition = useMemo(
		() => entryStates.length + 1,
		[entryStates],
	);
	useEffect(() => setPosition(defaultPosition), [defaultPosition]);
	const onNameChange = ({ target }: ChangeEvent<HTMLInputElement>): void =>
		setName(target.value);
	const onPositionChange = ({ target }: SelectChangeEvent<number>): void =>
		setPosition(Number(target.value));
	const onFormSubmit = (event: FormEvent<HTMLDivElement>): void => {
		event.preventDefault();
		addEntryState({ name, position });
		onClose();
	};
	return (
		<Box padding={0.5}>
			<Card
				sx={{ marginTop: 1 }}
				component="form"
				onSubmit={onFormSubmit}
			>
				<CardContent>
					<TextField
						autoFocus
						size="small"
						fullWidth
						margin="dense"
						id="name"
						label="Name"
						required
						value={name}
						onChange={onNameChange}
					/>
					<FormControl size="small" fullWidth margin="dense">
						<InputLabel id="position-label">Position</InputLabel>
						<Select
							labelId="position-label"
							id="position"
							label="Position"
							required
							value={position}
							onChange={onPositionChange}
						>
							{entryStates.map((_, index) => (
								<MenuItem key={index} value={index + 1}>
									{index + 1}
								</MenuItem>
							))}
							<MenuItem value={defaultPosition}>
								{defaultPosition}
							</MenuItem>
						</Select>
					</FormControl>
				</CardContent>
				<CardActions
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Button size="small" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="outlined" size="small" type="submit">
						Create
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

const CreateEntryState: FC = () => {
	const [showForm, setShowForm] = useState(false);
	return (
		<Box>
			<Button
				variant="contained"
				fullWidth
				size="large"
				sx={{ paddingY: 2.6 }}
				endIcon={<AddIcon />}
				onClick={(): void => setShowForm(true)}
			>
				Create Entry State
			</Button>
			{showForm && (
				<CreateEntryStateForm
					onClose={(): void => setShowForm(false)}
				/>
			)}
		</Box>
	);
};

export default CreateEntryState;
