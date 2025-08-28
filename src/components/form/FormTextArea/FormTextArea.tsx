import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

export default function FormTextarea<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  autoComplete,
  required = false,
  rows = 3,
  className = ""
}: FormTextareaProps<T>) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-card-foreground"
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Textarea
              {...field}
              required={required}
              id={name}
              placeholder={placeholder}
              autoComplete={autoComplete}
              rows={rows}
              className={`w-full ${className}`}
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
