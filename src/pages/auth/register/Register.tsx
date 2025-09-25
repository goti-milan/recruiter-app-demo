import AuthButton from "@/components/ui/auth/AuthButton";
import AuthInput from "@/components/ui/auth/AuthInput";
import AuthPassword from "@/components/ui/auth/AuthPassword";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import { createUser } from "@/helpers/apis/auth";
import { showToast } from "@/helpers/helper";
import { LOGIN, PRIVACY_POLICY, TERMS_AND_CONDITIONS, VERIFY_OTP } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "primereact/checkbox";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { RegisterField, registerSchema } from "../../../types/auth.types";

const Register: React.FC = () => {
  const CANDIDATE_LANDING_URL = import.meta.env.VITE_CANDIDATE_LANDING_URL;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const registerForm = useForm<RegisterField>({
    defaultValues: {
      email: "",
      password: "",
      emailConsent: true,
    },
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterField) => {
    setIsLoading(true);
    try {
      const response = await createUser(data.email, data.password);
      if (response) {
        navigate(VERIFY_OTP, {
          state: { email: data.email, type: "register" },
        });
        showToast("success", response.data);
        registerForm.reset();
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-start items-center md:gap-5 gap-8 lg:w-3/4 md:w-4/5 w-full">
      <Link to={CANDIDATE_LANDING_URL} className="w-1/2 aspect-[6.04]">
        <img src="/logo.webp" alt="logo" decoding="async" fetchPriority="high" className="h-full w-full" />
      </Link>
      <div className="flex flex-col gap-2 w-full">
        <p className="md:text-3xl text-2xl font-medium text-[#0C1421]">Create Your Account!</p>
        <p className="md:text-base text-sm text-[#313957]">Please sign up to your account and Start the adventure.</p>
      </div>

      <form className="w-full flex flex-col gap-4">
        <AuthInput
          register={registerForm.register("email")}
          type="email"
          placeholder="Example@email.com"
          label="Email"
          errorMsg={registerForm.formState.errors.email}
        />

        <Controller
          control={registerForm.control}
          name="password"
          render={({ field }) => (
            <AuthPassword
              value={field.value}
              onChange={(e) => {
                if (typeof field.onChange === "function") {
                  field.onChange(e);
                }
              }}
              type="password"
              placeholder="Password"
              label="Password"
              errorMsg={registerForm.formState.errors.password}
            />
          )}
        />

        <div className="mt-2">
          <small className="font-medium text-[12px] ">
            Password Hints:{" "}
            <span className="ml-2 text-[#878b90]">
              Minimum 8 characters • 1 uppercase • 1 lowercase • 1 number • 1 special character • No spaces
            </span>
          </small>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-primary mt-2">
          <Checkbox
            pt={{
              root: {
                className: "!w-5 !h-5",
              },
              box: {
                className: "!w-5 !h-5 rounded-md border-primary bg-transparent",
              },
              icon: {
                className: "w-full h-full bg-primary",
              },
            }}
            onClick={() => registerForm.setValue("emailConsent", !registerForm.watch("emailConsent"))}
            checked={registerForm.watch("emailConsent")}
          />
          <span>
            By creating an account, I agree to&nbsp;
            <Link className="underline" to={TERMS_AND_CONDITIONS} target="_blank">
              Terms & Conditions
            </Link>
            &nbsp;and&nbsp;
            <Link className="underline" to={PRIVACY_POLICY} target="_blank">
              Privacy Policy
            </Link>
            .
          </span>
        </div>

        <AuthButton
          type="submit"
          disabled={!registerForm.watch("emailConsent") || isLoading}
          customStyle="mt-4"
          onClick={registerForm.handleSubmit(onSubmit)}
        >
          {isLoading ? <ButtonLoader isVisible={isLoading} /> : "Sign up"}
        </AuthButton>

        <p className="text-[#313957] text-center pt-10">
          Already have an account?{" "}
          <Link to={LOGIN} className="font-semibold text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
