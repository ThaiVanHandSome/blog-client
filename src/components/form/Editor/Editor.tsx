"use client";

import { Label } from "@/components/ui/label";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface EditorProps<TFieldValues extends FieldValues = FieldValues> {
  readonly label?: string;
  readonly control: Control<TFieldValues>;
  readonly name: Path<TFieldValues>;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly helperText?: string;
  readonly isRequired?: boolean;
  readonly onChange?: (content: string) => void;
}

const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
    ["code-block"],
    ["clean"]
  ]
};

export default function Editor<TFieldValues extends FieldValues>({
  name,
  label,
  control,
  className = "mb-3",
  disabled = false,
  helperText,
  isRequired = false,
  onChange
}: EditorProps<TFieldValues>) {
  return (
    <div className={className}>
      {label && (
        <div className="flex items-center space-x-1 mb-2">
          <Label>{label}</Label>
          {isRequired && (
            <span
              className="font-semibold text-destructive"
              style={{ lineHeight: 0 }}
            >
              *
            </span>
          )}
        </div>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <ReactQuill
              theme="snow"
              value={field.value || ""}
              onChange={content => {
                field.onChange(content);
                onChange?.(content);
              }}
              className="bg-background text-foreground"
              readOnly={disabled}
              modules={modules}
            />
            {helperText && (
              <p className="text-xs text-muted-foreground mt-1">{helperText}</p>
            )}
            {fieldState.error && (
              <p className="text-xs text-destructive mt-1">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}
