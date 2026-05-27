import { useDocTitle } from "@/hooks/useDocTitle";
import { SignIn } from "@clerk/react";

const LoginPage = () => {
  useDocTitle("Login");

  return (
    <section className="flex justify-center my-16">
      <SignIn
        forceRedirectUrl="/"
        signUpUrl="/auth/sign-up"
        oauthFlow="popup"
      />
    </section>
  );
};

export default LoginPage;
