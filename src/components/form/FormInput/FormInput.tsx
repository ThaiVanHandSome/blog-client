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
  multiline?: boolean;
  rows?: number;
  className?: string;
}

export default function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
  multiline = false,
  rows = 3,
  className = "",
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
            {multiline ? (
              <textarea
                {...field}
                required={required}
                id={name}
                placeholder={placeholder}
                autoComplete={autoComplete}
                rows={rows}
                className={`w-full px-3 py-2 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md resize-vertical ${className}`}
              />
            ) : (
              <Input
                {...field}
                required={required}
                id={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={`w-full ${className}`}
              />
            )}
            {error && (
              <p className="text-sm text-destructive">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}
