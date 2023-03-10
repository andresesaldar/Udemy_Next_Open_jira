import { FC, PropsWithChildren } from "react";
import { Container } from "@mui/material";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";

type MainLayoutProps = {
	title?: string;
	fluid?: boolean;
} & PropsWithChildren;

const MainLayout: FC<MainLayoutProps> = ({
	children,
	title = "Open Jira",
	fluid,
}) => (
	<>
		<Head>
			<title>{title}</title>
		</Head>
		<SidebarProvider>
			<Navbar />
			<Sidebar />
		</SidebarProvider>
		<Container maxWidth={fluid ? "xl" : undefined} sx={{ paddingY: 1 }}>
			<main>{children}</main>
		</Container>
	</>
);

export default MainLayout;
