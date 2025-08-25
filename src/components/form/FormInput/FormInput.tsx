import { Input } from "@/components/ui/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

export default function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required = false
}: FormInputProps<T>) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-card-foreground"
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              {...field}
              required={required}
              id={name}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              className="w-full"
            />
            {error && (
              <p className="text-sm text-destructive">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}
