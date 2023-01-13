import { EntriesProvider } from "../context/EntriesContext";
import EntryStatesGrid from "../components/EntryStatesGrid";
import { EntryStatesProvider } from "../context/EntryStatesContext";
import MainLayout from "../layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";

const Home: NextPageWithLayout = () => (
	<EntryStatesProvider>
		<EntriesProvider>
			<EntryStatesGrid />
		</EntriesProvider>
	</EntryStatesProvider>
);

Home.getLayout = (page): ReactElement => (
	<MainLayout title="Home - OpenJira">{page}</MainLayout>
);

export default Home;
