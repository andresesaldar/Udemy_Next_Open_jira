import {
	Box,
	Card,
	CardHeader,
	Grid,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material";
import { DragEvent, FC, useContext, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CreateEntry from "./CreateEntry";
import EntriesContext from "../context/EntriesContext";
import Entry from "./Entry";
import EntryDragContext from "../context/EntryDragContext";
import EntryState from "../models/entry-state";

type EntryStateProps = {
	entryState: EntryState;
};

const EntryState: FC<EntryStateProps> = ({ entryState: { _id, name } }) => {
	const [showCreateEntry, setShowCreateEntry] = useState(false);
	const [dragOver, setDragOver] = useState(false);
	const { entries, changeEntry } = useContext(EntriesContext);
	const { dragItem, endDrag } = useContext(EntryDragContext);
	const filteredEntries = useMemo(
		() => entries.filter(({ stateId }) => stateId === _id),
		[entries, _id],
	);
	const onDrop = (event: DragEvent<HTMLDivElement>): void => {
		const id = event.dataTransfer.getData("id");
		const stateId = event.dataTransfer.getData("stateId");
		endDrag();
		setDragOver(false);
		if (!id || stateId === _id) return;
		changeEntry(id, { stateId: _id });
	};
	const onDragOver = (event: DragEvent<HTMLDivElement>): void => {
		event.preventDefault();
		setDragOver(true);
	};
	const onDragLeave = (): void => setDragOver(false);

	return (
		<Box>
			<Card variant="outlined">
				<CardHeader
					title={
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Typography variant="h5">{name}</Typography>
							<Tooltip title="Add entry" arrow placement="left">
								<IconButton
									color="primary"
									size="small"
									onClick={(): void =>
										setShowCreateEntry(true)
									}
								>
									<AddIcon />
								</IconButton>
							</Tooltip>
						</Box>
					}
				/>
			</Card>
			<Grid
				container
				direction="column"
				marginTop={1}
				wrap="nowrap"
				sx={{
					borderStyle: "dashed",
					height: "calc(100vh - 190px)",
					opacity:
						dragItem && dragItem.stateId !== _id ? 0.5 : undefined,
					overflowY: "auto",
					transition: "all .3s",
				}}
				onDrop={onDrop}
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				border={2}
				borderColor={
					dragItem && dragItem.stateId !== _id
						? dragOver
							? "success.main"
							: "primary.main"
						: "transparent"
				}
				borderRadius={2}
			>
				{showCreateEntry && (
					<Grid item>
						<CreateEntry
							stateId={_id}
							onClose={(): void => setShowCreateEntry(false)}
						/>
					</Grid>
				)}
				{filteredEntries.map((entry) => (
					<Grid item key={entry._id}>
						<Entry entry={entry} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default EntryState;
