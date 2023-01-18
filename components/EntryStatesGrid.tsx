import { Box, Grid } from "@mui/material";
import { FC, PropsWithChildren, useContext, useEffect, useMemo } from "react";
import CreateEntryState from "./CreateEntryState";
import EntriesContext from "../context/EntriesContext";
import { EntryDragProvider } from "../context/EntryDragContext";
import EntryState from "./EntryState";
import EntryStatesContext from "../context/EntryStatesContext";

const EntryStatesGridItem: FC<PropsWithChildren> = ({ children }) => (
	<Grid
		item
		xs={4}
		sx={{
			height: "calc(100vh - 90px)",
			maxHeight: "calc(100vh - 90px)",
			minWidth: "300px",
		}}
	>
		{children}
	</Grid>
);

const EntryStatesGrid: FC = () => {
	const { entryStates, loadEntryStates } = useContext(EntryStatesContext);
	const { loadEntries } = useContext(EntriesContext);
	const sortedEntryStates = useMemo(
		() => entryStates.sort((a, b) => a.position - b.position),
		[entryStates],
	);
	useEffect(() => {
		loadEntryStates();
		loadEntries();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<EntryDragProvider>
			<Box sx={{ maxWidth: "100%", overflowX: "auto" }}>
				<Grid container spacing={2} wrap="nowrap">
					{sortedEntryStates.map((entryState) => (
						<EntryStatesGridItem key={entryState._id}>
							<EntryState entryState={entryState} />
						</EntryStatesGridItem>
					))}
					<EntryStatesGridItem>
						<CreateEntryState />
					</EntryStatesGridItem>
				</Grid>
			</Box>
		</EntryDragProvider>
	);
};

export default EntryStatesGrid;
