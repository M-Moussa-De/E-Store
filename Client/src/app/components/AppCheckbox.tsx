import { Checkbox, FormControlLabel } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
}

export default function AppCheckbox(props: Props) {
  const { field } = useController({ ...props, defaultValue: false });

  return (
    <FormControlLabel
      control={<Checkbox color="secondary" {...field} checked={field.value} />}
      label={props.label}
    />
  );
}
