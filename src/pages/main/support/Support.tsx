import { SupportContactBg } from "@/assets/images";
import LinkedinIcon from "@/assets/svg/LinkedinIcon";
import PhoneIcon from "@/assets/svg/support/call.svg";
import InstagramIcon from "@/assets/svg/support/instagram.svg";
import MailIcon from "@/assets/svg/support/mail.svg";
import SupportIcon from "@/assets/svg/support/support.svg";
import XIcon from "@/assets/svg/support/x.svg";
import AuthButton from "@/components/ui/auth/AuthButton";
import AuthInput from "@/components/ui/auth/AuthInput";
import AuthTextArea from "@/components/ui/auth/AuthTextArea";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import { UserAddReview } from "@/helpers/apis/support";
import { RATING_EMOJI } from "@/helpers/constants";
import { showToast } from "@/helpers/helper";
import {
  ReviewRequest,
  supportField,
  supportSchema,
} from "@/types/support.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "primereact/checkbox";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Support: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const supportForm = useForm<supportField>({
    defaultValues: {
      issue: "",
      description: "",
      rating: 5,
      emailConsent: true,
    },
    mode: "onChange",
    resolver: zodResolver(supportSchema),
  });

  const activeEmoji = supportForm.watch("rating");

  const onSubmit = async (data: supportField) => {
    const payload: ReviewRequest = {
      issue: data.issue,
      description: data.description,
      rating: data.rating,
      emailConsent: data.emailConsent,
    };
    setIsLoading(true);
    try {
      const response = await UserAddReview(payload);

      if (response) {
        showToast("success", response.data);
        supportForm.reset();
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  return (
    <div className="w-full lg:h-full flex lg:flex-row flex-col gap-4">
      <form className="w-full h-full flex flex-col gap-4 bg-white rounded-2xl p-4 overflow-auto ">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="shrink-0 md:w-20 w-16 md:h-20 h-16 bg-[#F7FAFF] p-4 rounded-full">
              <img
                src={SupportIcon}
                alt="support"
                className="aspect-square w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="lg:text-3xl md:text-2xl text-lg text-black font-semibold">
                Love to hear from you, Get In touch
              </h1>
              <p className="text-black md:text-base text-xs font-medium lg:leading-loose leading-relaxed lg:text-xl">
                We will hear you back within next 48 hours
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <p className="text-black font-semibold md:text-lg text-base">
              What issue did you face?
            </p>
            <p className="text-[#646464] md:text-sm text-xs">
              Describe any problems or difficulties you encountered while using
              HeadsIn.
            </p>
          </div>

          <AuthInput
            register={supportForm.register("issue")}
            errorMsg={supportForm.formState.errors.issue}
            placeholder="Subject of your issue"
            inputStyle="placeholder:md:text-sm placeholder:text-xs"
          />

          <AuthTextArea
            register={supportForm.register("description")}
            rows={4}
            inputStyle="placeholder:md:text-sm placeholder:text-xs"
            placeholder="Describe your issue"
            errorMsg={supportForm.formState.errors.description}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <p className="text-black font-semibold text-lg">
              How was your overall experience?
            </p>
            <p className="text-[#646464] md:text-sm text-xs">
              Your input is valuable in helping us better understand your needs
              and tailor our service accordingly.
            </p>
          </div>

          <div className="flex md:gap-6 gap-3 md:pt-10 pt-6 md:h-26 h-20 items-center">
            {RATING_EMOJI.map((emoji, index) => (
              <button
                onClick={() => supportForm.setValue("rating", emoji.value)}
                type="button"
                key={index}
                className={`outline-none bg-[#ECECEC] rounded-full md:p-3 p-2 transition-all duration-100 ease-in cursor-pointer ${
                  activeEmoji === emoji.value
                    ? "bg-gradient-to-b to-[#DF6789] from-[#3F1562] scale-150 md:px-3 mx-2"
                    : ""
                }`}
              >
                {<emoji.label />}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:text-sm text-xs font-medium text-primary my-8">
            <Checkbox
              pt={{
                root: {
                  className: "!w-5 !h-5",
                },
                box: {
                  className:
                    "!w-5 !h-5 rounded-md border-primary bg-transparent",
                },
                icon: {
                  className: "w-full h-full bg-primary",
                },
              }}
              onClick={() =>
                supportForm.setValue(
                  "emailConsent",
                  !supportForm.watch("emailConsent"),
                )
              }
              checked={supportForm.watch("emailConsent")}
            />
            I consent to receive occasional emails from HeadsIn that I can opt
            out of anytime / privacy policy
          </div>
        </div>

        <div className="flex items-center justify-center lg:pb-14 pb-8">
          <AuthButton
            onClick={supportForm.handleSubmit(onSubmit)}
            type="button"
            disabled={isLoading}
            customStyle="lg:w-1/2 w-4/5"
          >
            {isLoading ? <ButtonLoader isVisible /> : "🚀 Send Your Thoughts"}
          </AuthButton>
        </div>
      </form>

      <div
        className="flex flex-col justify-between bg-[#F7EEFF] rounded-2xl px-8 py-10 lg:w-8/12 lg:h-[500px] bg-[length:15%] bg-right-bottom bg-no-repeat lg:gap-0 gap-6"
        style={{ backgroundImage: `url(${SupportContactBg})` }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <h1 className="md:text-2xl text-xl text-primary font-semibold">
              Reach out to us through
            </h1>
            <p className="text-[#3E3E3E] font-medium lg:leading-loose md:text-base text-xs">
              Let’s connect! Whether you need assistance or just want to say
              hello, we’d love to hear from you.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="flex items-center justify-center md:w-10 w-8 md:h-10 h-8  border border-white rounded-full p-2">
                <img
                  src={MailIcon}
                  alt="mail"
                  className="aspect-square h-full w-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="md:text-lg text-base font-semibold text-primary tracking-[-1px]">
                  Mail us
                </p>
                <Link
                  to={"mailto:contact@headsin.co"}
                  className="text-black md:text-sm text-xs font-medium"
                >
                  contact@headsin.co
                </Link>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center md:w-10 w-8 md:h-10 h-8 border border-white rounded-full p-2">
                <img
                  src={PhoneIcon}
                  alt="phone"
                  className="aspect-square h-full w-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="md:text-lg text-base font-semibold text-primary tracking-[-1px]">
                  Contact us
                </p>
                <Link
                  to={"tel:+91 9773497763"}
                  className="text-black md:text-sm text-xs font-medium"
                >
                  +91-97734 97763
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:gap-6 gap-4">
          <p className="md:text-lg text-base font-semibold text-primary tracking-[-1px]">
            Connect With Us on social media!
          </p>
          <div className="flex gap-4">
            <Link
              to={"https://x.com/HeadsIn_co"}
              target="_blank"
              className="flex items-center justify-center w-9 h-9 border border-primary rounded-full p-2 hover:bg-[#e3cbf8ad]"
            >
              <img
                src={XIcon}
                alt="x"
                className="aspect-square h-full w-full"
              />
            </Link>
            <Link
              to={"https://www.linkedin.com/company/headsinco/"}
              target="_blank"
              className="flex items-center justify-center w-9 h-9 border border-primary rounded-full p-2 hover:bg-[#e3cbf8ad]"
            >
              <LinkedinIcon color="#3F1562" />
            </Link>
            <Link
              to={
                "https://www.instagram.com/headsin.co/profilecard/?igsh=MTEyd3pyYzhhYzMzMA%3D%3D"
              }
              target="_blank"
              className="flex items-center justify-center w-9 h-9 border border-primary rounded-full p-2 hover:bg-[#e3cbf8ad]"
            >
              <img
                src={InstagramIcon}
                alt="instagram"
                className="aspect-square h-full w-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
