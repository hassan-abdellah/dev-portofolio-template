import React from "react";
import { Input } from "@/components/ui/input";
import FormErrorMessage from "./FormErrorMessage";
import { Field, FieldLabel } from "@/components/ui/field";

const FormController = ({
  id,
  label,
  name,
  placeholder,
  value,
  onchange,
  onBlur,
  error,
  invalid,
  fieldClassNames,
}: {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error: string | undefined;
  invalid: boolean;
  fieldClassNames?: string;
}) => {
  return (
    <Field data-invalid={invalid} className={fieldClassNames}>
      <FieldLabel htmlFor={id} className="input-label">
        {label}
      </FieldLabel>

      <Input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onchange}
        onBlur={onBlur}
        aria-invalid={invalid}
        autoComplete="off"
        className="input-field"
      />
      {invalid && <FormErrorMessage error={error} />}
    </Field>
  );
};

export default FormController;
