import AuthButton from "@/components/ui/auth/AuthButton";
import AuthInput from "@/components/ui/auth/AuthInput";
import AuthPassword from "@/components/ui/auth/AuthPassword";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import { loginUser } from "@/helpers/apis/auth";
import { showToast } from "@/helpers/helper";
import { DASHBOARD, FORGOT_PASSWORD, REGISTER, VERIFY_OTP } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { LoginField, loginSchema } from "../../../types/auth.types";

const Login: React.FC = () => {
  const CANDIDATE_LANDING_URL = import.meta.env.VITE_CANDIDATE_LANDING_URL;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginForm = useForm<LoginField>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginField) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data.email, data.password);
      if (response) {
        if (response?.data?.isEmailVerified) {
          navigate(DASHBOARD);
          showToast("success", response.message);
        } else {
          navigate(VERIFY_OTP, { state: { email: data.email } });
        }
        loginForm.reset();
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-start items-center md:gap-5 gap-8 lg:w-3/4 md:w-4/5 w-full">
      <Link to={CANDIDATE_LANDING_URL} className="w-1/2 aspect-[6.04]">
        <img src="/logo.webp" alt="logo" decoding="async" fetchPriority="high" className="w-full h-full" />
      </Link>
      <div className="flex flex-col gap-2 w-full">
        <p className="md:text-3xl text-2xl font-medium text-[#0C1421]">Welcome Back!</p>
        <p className="md:text-base text-sm text-[#313957]">Today is yours. Shape it with great hires — sign in to manage your jobs.</p>
      </div>

      <form className="w-full flex flex-col gap-4">
        <AuthInput
          register={loginForm.register("email")}
          type="email"
          autoComplete="email"
          placeholder="Example@email.com"
          label="Email"
          errorMsg={loginForm.formState.errors.email}
        />

        <Controller
          name="password"
          control={loginForm.control}
          render={({ field }) => (
            <AuthPassword
              value={field.value}
              onChange={field.onChange}
              placeholder="Password"
              label="Password"
              autoComplete="password"
              errorMsg={loginForm.formState.errors.password}
            />
          )}
        />

        <Link to={FORGOT_PASSWORD} className="w-full text-right text-primary outline-none">
          Forgot Password?
        </Link>
        <AuthButton type="submit" disabled={isLoading} onClick={loginForm.handleSubmit(onSubmit)}>
          {isLoading ? <ButtonLoader isVisible={isLoading} /> : "Sign In"}
        </AuthButton>

        <p className="text-[#313957] text-center pt-10">
          New on our platform?&nbsp;
          <Link to={REGISTER} className="font-semibold text-primary outline-none">
            Create an account
          </Link>
        </p>

        {/* Storyline link for a demo, Give a gradient bg */}
      </form>

      <a
        href="https://app.storylane.io/share/lqfrdnjpgygm"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 text-[14px] rounded-xl text-white bg-gradient-to-r from-[#3f1562] to-pink-500 hover:underline"
      >
        Watch a Demo
      </a>
    </div>
  );
};

export default Login;
