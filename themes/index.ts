import { Theme, useMediaQuery } from "@mui/material";
import darkTheme from "./dark";
import lightTheme from "./light";
import { useMemo } from "react";

const useTheme = (): Theme => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const theme = useMemo(
		() => (prefersDarkMode ? darkTheme : lightTheme),
		[prefersDarkMode],
	);
	return theme;
};

export default useTheme;
