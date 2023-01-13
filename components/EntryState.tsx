import {
	Box,
	Card,
	CardHeader,
	Grid,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material";
import { FC, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import EntriesContext from "../context/EntriesContext";
import Entry from "./Entry";
import EntryState from "../models/entry-state";

type EntryStateProps = {
	entryState: EntryState;
};

const EntryState: FC<EntryStateProps> = ({ entryState: { _id, name } }) => {
	const { entries } = useContext(EntriesContext);
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
							<Typography variant="h6">{name}</Typography>
							<Tooltip title="Add entry" arrow placement="left">
								<IconButton color="primary" size="small">
									<AddIcon />
								</IconButton>
							</Tooltip>
						</Box>
					}
				/>
			</Card>
			<Grid
				container
				direction={"column"}
				marginTop={1}
				wrap="nowrap"
				sx={{ maxHeight: "calc(100vh - 190px)", overflowY: "auto" }}
			>
				{entries
					.filter(({ stateId }) => stateId === _id)
					.map((entry, index) => (
						<Grid item key={index}>
							<Entry entry={entry} />
						</Grid>
					))}
			</Grid>
		</Box>
	);
};

export default EntryState;
