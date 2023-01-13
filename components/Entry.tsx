import { Box, Card, CardContent, Typography } from "@mui/material";
import Entry from "../models/entry";
import { FC } from "react";

type EntryProps = {
	entry: Entry;
};

const Entry: FC<EntryProps> = ({ entry: { content } }) => (
	<Box paddingX={0.5} paddingTop={0.5}>
		<Card sx={{ marginBottom: "10px", minHeight: "100px" }}>
			<CardContent>
				<Typography>{content}</Typography>
			</CardContent>
		</Card>
	</Box>
);

export default Entry;
