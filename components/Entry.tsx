import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Typography,
} from "@mui/material";
import { DragEvent, FC, useContext } from "react";
import Entry from "../models/entry";
import EntryDragContext from "../context/EntryDragContext";

type EntryProps = {
	entry: Entry;
};

const Entry: FC<EntryProps> = ({ entry }) => {
	const { startDrag, endDrag } = useContext(EntryDragContext);
	const onDragStart = (event: DragEvent<HTMLElement>): void => {
		event.dataTransfer.setData("id", entry._id);
		event.dataTransfer.setData("statIid", entry.stateId);
		startDrag(entry);
	};
	const onDragEnd = (): void => endDrag();
	return (
		<Box padding={0.5}>
			<Card
				sx={{ marginBottom: 1, minHeight: "100px" }}
				draggable
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
			>
				<CardActionArea>
					<CardHeader
						title={entry.title}
						subheader="30 minutes ago"
					/>
					<CardContent>
						<Typography variant="body2" color="text.secondary">
							{entry.content}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Box>
	);
};

export default Entry;
