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
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";

type EntryProps = {
	entry: Entry;
};

const Entry: FC<EntryProps> = ({ entry }) => {
	const { startDrag, endDrag } = useContext(EntryDragContext);
	const router = useRouter();
	const onDragStart = (event: DragEvent<HTMLElement>): void => {
		event.dataTransfer.setData("id", entry._id);
		event.dataTransfer.setData("stateId", entry.stateId);
		startDrag(entry);
	};
	const onDragEnd = (): void => endDrag();
	const onClick = (): Promise<boolean> =>
		router.push(`/entries/${entry._id}`);
	return (
		<Box padding={0.5}>
			<Card
				sx={{ marginBottom: 1, minHeight: "100px" }}
				draggable
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				onClick={onClick}
			>
				<CardActionArea>
					<CardHeader
						sx={{
							wordBreak: "break-word",
						}}
						title={entry.title}
						subheader={
							formatDistanceToNow(new Date(entry.createdAt)) +
							" ago"
						}
					/>
					<CardContent>
						<Typography
							variant="body2"
							color="text.secondary"
							component="pre"
							sx={{
								whiteSpace: "pre-wrap",
								wordBreak: "break-word",
							}}
						>
							{entry.content}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Box>
	);
};

export default Entry;
