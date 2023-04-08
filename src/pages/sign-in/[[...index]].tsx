import { SignIn } from "@clerk/nextjs";
import {} from "@clerk/themes";

const SignInPage = () => (
  <div className="mt-10 flex place-items-center justify-center">
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      appearance={{
        layout: "wide",
      }}
    />
  </div>
);

export default SignInPage;
