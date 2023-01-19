import "../styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { FC, ReactElement } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import useTheme from "../themes";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement, props: P) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const App: FC<AppPropsWithLayout> = ({
	Component,
	pageProps,
}: AppPropsWithLayout) => {
	const theme = useTheme();
	const getLayout = Component.getLayout ?? ((page): ReactElement => page);
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{getLayout(<Component {...pageProps} />, pageProps)}
		</ThemeProvider>
	);
};

export default App;
