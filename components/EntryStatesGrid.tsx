import { Box, Grid } from "@mui/material";
import { FC, PropsWithChildren, useContext, useMemo } from "react";
import CreateEntryState from "./CreateEntryState";
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
	const { entryStates } = useContext(EntryStatesContext);
	const sortedEntryStates = useMemo(
		() => entryStates.sort((a, b) => a.position - b.position),
		[entryStates],
	);
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
