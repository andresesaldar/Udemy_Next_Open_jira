import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { FC, useContext } from "react";
import GithubIcon from "@mui/icons-material/GitHub";
import SidebarContext from "../context/SidebarContext";

const Sidebar: FC = () => {
	const { toggleOpen, open } = useContext(SidebarContext);
	return (
		<Drawer anchor="left" open={open} onClose={toggleOpen(false)}>
			<Box
				sx={{
					width: 250,
				}}
				role="presentation"
				onClick={toggleOpen(false)}
				onKeyDown={toggleOpen(false)}
			>
				<List>
					<ListItem disablePadding>
						<ListItemButton
							href="https://github.com/andresesaldar/Udemy_Next_Open_jira"
							target="_blank"
						>
							<ListItemIcon>
								<GithubIcon />
							</ListItemIcon>
							<ListItemText primary="See the code on GitHub" />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
