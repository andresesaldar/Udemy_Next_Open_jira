import { Context, FC, PropsWithChildren, createContext, useState } from "react";
import Entry from "../models/entry";

type EntryDragContextData = {
	dragItem?: Entry;
	startDrag: (entry: Entry) => void;
	endDrag: () => void;
};

const EntryDragContext: Context<EntryDragContextData> =
	createContext<EntryDragContextData>({} as EntryDragContextData);

export const EntryDragProvider: FC<PropsWithChildren> = ({ children }) => {
	const [dragItem, setDragItem] = useState<Entry | undefined>(undefined);
	return (
		<EntryDragContext.Provider
			value={{
				dragItem,
				endDrag: () => setDragItem(undefined),
				startDrag: (entry) => setDragItem(entry),
			}}
		>
			{children}
		</EntryDragContext.Provider>
	);
};

export default EntryDragContext;
