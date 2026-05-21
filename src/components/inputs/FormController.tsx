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
  isRequired = false,
  isReadonly = false,
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
  isRequired?: boolean;
  isReadonly?: boolean;
}) => {
  return (
    <Field data-invalid={invalid} className={fieldClassNames}>
      <FieldLabel htmlFor={id} className="input-label">
        {label}
        {isRequired && <span className="text-destructive">*</span>}
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
        readOnly={isReadonly}
      />
      {invalid && <FormErrorMessage error={error} />}
    </Field>
  );
};

export default FormController;
