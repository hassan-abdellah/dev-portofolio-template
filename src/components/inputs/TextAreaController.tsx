import React from "react";
import FormErrorMessage from "./FormErrorMessage";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

const TextAreaController = ({
  id,
  label,
  name,
  placeholder,
  value,
  onchange,
  onBlur,
  error,
  invalid,
  isRequired = false,
  isReadonly = false,
}: {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onchange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error: string | undefined;
  invalid: boolean;
  isRequired?: boolean;
  isReadonly?: boolean;
}) => {
  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={id} className="input-label">
        {label}
        {isRequired && <span className="text-destructive">*</span>}
      </FieldLabel>
      <InputGroup className="input-group">
        <InputGroupTextarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onchange}
          onBlur={onBlur}
          rows={6}
          className="min-h-24 resize-none"
          aria-invalid={invalid}
          maxLength={100}
          readOnly={isReadonly}
          disabled={isReadonly}
        />
        <InputGroupAddon align="block-end">
          <InputGroupText className="tabular-nums text-muted-black">
            {value?.length}/100 characters
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      {invalid && <FormErrorMessage error={error} />}
    </Field>
  );
};

export default TextAreaController;
