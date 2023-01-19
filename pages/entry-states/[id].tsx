import EntryState from "../../models/entry-state";
import EntryStateDetailUI from "../../components/EntryStateDetail";
import { GetServerSideProps } from "next";
import MainLayout from "../../layouts/MainLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { SnackbarProvider } from "../../context/SnackbarContext";
import { getAllEntryStates } from "../api/entry-states";
import { getEntryState } from "../api/entry-states/[id]";

type EntryStateDetailProps = {
	entryState: EntryState;
	entryStates: EntryState[];
};

const EntryStateDetail: NextPageWithLayout<EntryStateDetailProps> = ({
	entryState,
	entryStates,
}) => (
	<SnackbarProvider>
		<EntryStateDetailUI entryState={entryState} entryStates={entryStates} />
	</SnackbarProvider>
);

EntryStateDetail.getLayout = (page, { entryState }): ReactElement => (
	<MainLayout title={`Entry state ${entryState._id} detail`}>
		{page}
	</MainLayout>
);

export const getServerSideProps: GetServerSideProps<
	EntryStateDetailProps
> = async (ctx) => {
	try {
		const id = ctx.params?.id || "";
		const [entryState, entryStates] = await Promise.all([
			getEntryState(id.toString()),
			getAllEntryStates(),
		]);
		return {
			props: {
				entryState: JSON.parse(JSON.stringify(entryState)),
				entryStates: JSON.parse(JSON.stringify(entryStates)),
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};

export default EntryStateDetail;
