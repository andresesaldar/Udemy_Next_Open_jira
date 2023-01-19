import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { FC, useContext } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarContext from "../context/SidebarContext";

const Navbar: FC = () => {
	const { toggleOpen } = useContext(SidebarContext);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={toggleOpen(true)}
					>
						<MenuIcon />
					</IconButton>
					<Link
						href="/"
						style={{ color: "inherit", textDecoration: "none" }}
					>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1 }}
						>
							OpenJira
						</Typography>
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
