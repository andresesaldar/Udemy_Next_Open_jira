import Entry from "../../models/entry";
import EntryDetailUI from "../../components/EntryDetail";
import EntryState from "../../models/entry-state";
import { GetServerSideProps } from "next";
import MainLayout from "../../layouts/MainLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { SnackbarProvider } from "../../context/SnackbarContext";
import { getAllEntryStates } from "../api/entry-states";
import { getEntry } from "../api/entries/[id]";

type EntryDetailProps = {
	entry: Entry;
	entryStates: EntryState[];
};

const EntryDetail: NextPageWithLayout<EntryDetailProps> = ({
	entry,
	entryStates,
}) => (
	<SnackbarProvider>
		<EntryDetailUI entry={entry} entryStates={entryStates} />
	</SnackbarProvider>
);

EntryDetail.getLayout = (page, { entry }): ReactElement => (
	<MainLayout title={`Entry ${entry._id} detail`}>{page}</MainLayout>
);

export const getServerSideProps: GetServerSideProps<EntryDetailProps> = async (
	ctx,
) => {
	try {
		const id = ctx.params?.id || "";
		const [entry, entryStates] = await Promise.all([
			getEntry(id.toString()),
			getAllEntryStates(),
		]);
		return {
			props: {
				entry: JSON.parse(JSON.stringify(entry)),
				entryStates: JSON.parse(JSON.stringify(entryStates)),
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};

export default EntryDetail;
