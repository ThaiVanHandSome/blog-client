interface FormErrorProps {
  id: string;
  error?: string;
}

export default function FormError({ id, error }: FormErrorProps) {
  if (!error) return null;

  return (
    <p id={id} className="text-xs text-destructive">
      {error}
    </p>
  );
}
