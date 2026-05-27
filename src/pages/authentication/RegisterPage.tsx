import { useDocTitle } from "@/hooks/useDocTitle";
import { SignUp } from "@clerk/react";

const RegisterPage = () => {
  useDocTitle("Register");

  return (
    <section className="flex justify-center my-16">
      <SignUp
        forceRedirectUrl="/"
        signInUrl="/auth/sign-in"
        oauthFlow="popup"
      />
    </section>
  );
};

export default RegisterPage;
