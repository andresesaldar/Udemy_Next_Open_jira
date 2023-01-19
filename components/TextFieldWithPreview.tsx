import { Box, TextField, Typography, TypographyVariant } from "@mui/material";
import { FC, useState } from "react";

type TextFieldWithPreviewProps = {
	value: string;
	setValue: (val: string) => void;
	label: string;
	variant?: TypographyVariant;
	component?: React.ElementType;
	required?: boolean;
	multiline?: boolean;
};

const TextFieldWithPreview: FC<TextFieldWithPreviewProps> = ({
	value,
	setValue,
	label,
	variant,
	required,
	multiline,
}) => {
	const [editable, setEditable] = useState(false);
	return editable ? (
		<TextField
			margin="normal"
			fullWidth
			value={value}
			autoFocus
			focused
			label={label}
			color="primary"
			onBlur={(event): void => {
				if (required && value.replaceAll(" ", "").length <= 0)
					return event.target.focus();
				setEditable(false);
			}}
			required={required}
			onChange={(event): void => setValue(event.target.value)}
			multiline={multiline}
		/>
	) : (
		<Box
			onClick={(): void => setEditable(true)}
			onFocus={(): void => setEditable(true)}
			sx={{
				":hover": { borderColor: "primary.light" },
				borderColor: "transparent",
			}}
			padding={2}
			borderRadius={1}
			border={0.5}
			tabIndex={0}
		>
			<Typography
				variant={variant}
				margin={0}
				component="pre"
				sx={{
					whiteSpace: "pre-wrap",
					wordBreak: "break-word",
				}}
			>
				{value}
			</Typography>
		</Box>
	);
};

export default TextFieldWithPreview;
