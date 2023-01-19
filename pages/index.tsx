import { EntriesProvider } from "../context/EntriesContext";
import Entry from "../models/entry";
import EntryState from "../models/entry-state";
import EntryStatesGrid from "../components/EntryStatesGrid";
import { EntryStatesProvider } from "../context/EntryStatesContext";
import { GetServerSideProps } from "next";
import MainLayout from "../layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import { SnackbarProvider } from "../context/SnackbarContext";
import { getAllEntries } from "./api/entries";
import { getAllEntryStates } from "./api/entry-states";

type HomeProps = {
	entries: Entry[];
	entryStates: EntryState[];
};

const Home: NextPageWithLayout<HomeProps> = ({ entries, entryStates }) => (
	<SnackbarProvider>
		<EntryStatesProvider entryStates={entryStates}>
			<EntriesProvider entries={entries}>
				<EntryStatesGrid />
			</EntriesProvider>
		</EntryStatesProvider>
	</SnackbarProvider>
);

Home.getLayout = (page): ReactElement => (
	<MainLayout title="Home - OpenJira" fluid>
		{page}
	</MainLayout>
);

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	try {
		const [entries, entryStates] = await Promise.all([
			getAllEntries(),
			getAllEntryStates(),
		]);
		return {
			props: {
				entries: JSON.parse(JSON.stringify(entries)),
				entryStates: JSON.parse(JSON.stringify(entryStates)),
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};

export default Home;
