import { Context, FC, PropsWithChildren, createContext, useState } from "react";

type SidebarContextData = {
	open: boolean;
	toggleOpen: (
		open: boolean,
	) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

const SidebarContext: Context<SidebarContextData> =
	createContext<SidebarContextData>({} as SidebarContextData);

export const SidebarProvider: FC<PropsWithChildren> = ({ children }) => {
	const [openSidebar, setOpenSidebar] = useState(false);
	const toggleSidebar =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}
			setOpenSidebar(open);
		};
	return (
		<SidebarContext.Provider
			value={{ open: openSidebar, toggleOpen: toggleSidebar }}
		>
			{children}
		</SidebarContext.Provider>
	);
};

export default SidebarContext;
