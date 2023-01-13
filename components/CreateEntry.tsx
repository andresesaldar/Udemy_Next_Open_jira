import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	TextField,
} from "@mui/material";
import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import EntriesContext from "../context/EntriesContext";

type CreateEntryProps = {
	stateId: string;
	onClose?: () => void;
};

const CreateEntry: FC<CreateEntryProps> = ({
	onClose = (): void => undefined,
	stateId,
}) => {
	const { addEntry } = useContext(EntriesContext);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const onTitleChange = ({ target }: ChangeEvent<HTMLInputElement>): void =>
		setTitle(target.value);
	const onContentChange = ({ target }: ChangeEvent<HTMLInputElement>): void =>
		setContent(target.value);
	const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		addEntry({ content, stateId, title });
		onClose();
	};
	return (
		<Box padding={0.5}>
			<Card sx={{ marginBottom: 1 }}>
				<form onSubmit={onFormSubmit}>
					<CardContent>
						<TextField
							size="small"
							fullWidth
							margin="dense"
							id="title"
							label="Title"
							autoFocus
							required
							value={title}
							onChange={onTitleChange}
						/>
						<TextField
							size="small"
							fullWidth
							margin="dense"
							id="content"
							label="Content"
							multiline
							minRows={2}
							required
							value={content}
							onChange={onContentChange}
						/>
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
				</form>
			</Card>
		</Box>
	);
};

export default CreateEntry;
