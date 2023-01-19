import { Alert, AlertColor, IconButton, Snackbar } from "@mui/material";
import { Context, FC, PropsWithChildren, createContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type ShowSnackOptions = {
	message: string;
	lifetime?: number;
	severity?: AlertColor;
};

type SnackbarContextData = {
	showSnack: (options: ShowSnackOptions) => void;
};

const SnackbarContext: Context<SnackbarContextData> =
	createContext<SnackbarContextData>({} as SnackbarContextData);

export const SnackbarProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [lifetimeTimeout, setLifetimeTimeout] = useState<
		NodeJS.Timeout | undefined
	>(undefined);
	const [severity, setSeverity] = useState<AlertColor>("info");
	const handleClose = (): void => {
		if (lifetimeTimeout) clearTimeout(lifetimeTimeout);
		setIsOpen(false);
	};
	const showSnack = ({
		lifetime = 2000,
		message,
		severity,
	}: ShowSnackOptions): void => {
		if (isOpen) handleClose();
		setMessage(message);
		if (severity) setSeverity(severity);
		setIsOpen(true);
		setLifetimeTimeout(setTimeout(() => handleClose(), lifetime));
	};
	return (
		<SnackbarContext.Provider value={{ showSnack }}>
			<Snackbar
				open={isOpen}
				onClose={handleClose}
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						sx={{ p: 0.5 }}
						onClick={handleClose}
					>
						<CloseIcon />
					</IconButton>
				}
			>
				<Alert
					onClose={handleClose}
					severity={severity}
					sx={{ width: "100%" }}
				>
					{message}
				</Alert>
			</Snackbar>
			{children}
		</SnackbarContext.Provider>
	);
};

export default SnackbarContext;
