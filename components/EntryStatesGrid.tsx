import { Box, Grid } from "@mui/material";
import { FC, useContext } from "react";
import EntryState from "./EntryState";
import EntryStatesContext from "../context/EntryStatesContext";

const EntryStatesGrid: FC = () => {
	const { entryStates } = useContext(EntryStatesContext);
	return (
		<Box sx={{ maxWidth: "100%", overflowX: "auto" }}>
			<Grid container spacing={2} wrap="nowrap">
				{entryStates
					.sort((a, b) => a.position - b.position)
					.map((entryState, index) => (
						<Grid
							key={index}
							item
							xs={4}
							sx={{
								height: "calc(100vh - 90px)",
								maxHeight: "calc(100vh - 90px)",
								minWidth: "300px",
							}}
						>
							<EntryState entryState={entryState} />
						</Grid>
					))}
			</Grid>
		</Box>
	);
};

export default EntryStatesGrid;
