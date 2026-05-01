import { FieldError } from "../ui/field";

const FormErrorMessage = ({ error }: { error: string | undefined }) => {
  return (
    <>
      {error ? (
        <FieldError className="text-xs" errors={[{ message: error }]} />
      ) : null}
    </>
  );
};

export default FormErrorMessage;
