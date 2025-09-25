import FileUpload from "@/assets/svg/file-upload.svg";
import AuthButton from "@/components/ui/auth/AuthButton";
import AuthInput from "@/components/ui/auth/AuthInput";
import AuthLabel from "@/components/ui/auth/AuthLabel";
import AuthPhone from "@/components/ui/auth/AuthPhone";
import AuthTextArea from "@/components/ui/auth/AuthTextArea";
import SelectField from "@/components/ui/auth/SelectField";
import ButtonLoader from "@/components/ui/loader/ButtonLoader";
import {
    createCompanyProfile,
    getCompanyProfile,
} from "@/helpers/apis/profile";
import { USE_QUERY_KEYS, VACANCY_LIMIT } from "@/helpers/constants";
import { showToast } from "@/helpers/helper";
import { PROFILE } from "@/routes";
import {
    AccountSetupField,
    accountSetupSchema,
} from "@/types/accountSetup.types";
import { GetCityListResponse } from "@/types/jobs.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

const CreateProfile: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    let cityList = queryClient.getQueryData<GetCityListResponse>([
        USE_QUERY_KEYS.GET_CITIES,
    ]);
    if (!cityList) {
        cityList = localStorage.getItem("cities")
            ? JSON.parse(localStorage.getItem("cities") as string)
            : [];
    }

    const [isLoading, setIsLoading] = useState(false);

    const accountSetupForm = useForm<AccountSetupField>({
        defaultValues: {
            logo: null,
            companyName: "",
            email: "",
            phone: "",
            describeYourCompany: "",
            address: "",
            postalCode: "",
            employeeSize: "",
            companyWebsite: "",
            linkedinUrl: "",
            twitterUrl: "",
            gst: "",
            images: [],
        },
        mode: "all",
        resolver: zodResolver(accountSetupSchema),
    });

    const logoImgWatcher = accountSetupForm.watch("logo");
    const imagesWatcher = accountSetupForm.watch("images");

    const { append, remove } = useFieldArray({
        control: accountSetupForm.control,
        name: "images",
    });

    const onSubmit = async (data: AccountSetupField) => {
        const formData = new FormData();

        if (data.logo instanceof File) {
            formData.append("logo", data.logo);
        }
        formData.append("companyName", data.companyName);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("description", data.describeYourCompany ?? "");
        formData.append("address", data.address);
        formData.append("postalCode", data.postalCode);
        formData.append("website", data.companyWebsite || "");
        formData.append("employeeSize", data.employeeSize.toString());
        formData.append("linkedin", data.linkedinUrl || "");
        formData.append("twitter", data.twitterUrl || "");
        formData.append("gst", data.gst ?? "");
        // formData.append('companyImages', JSON.stringify(data.images));
        const existingImageIds: string[] = [];

        data.images.forEach((value) => {
            if (value instanceof File) {
                formData.append(`companyImages`, value);
            } else {
                existingImageIds.push(value.id);
            }
        });

        if (existingImageIds.length > 0) {
            formData.append("existingImageIds", existingImageIds.join(","));
        }

        setIsLoading(true);
        try {
            const response = await createCompanyProfile(formData);
            if (response) {
                showToast("success", response.data);
                await queryClient.invalidateQueries({
                    queryKey: [USE_QUERY_KEYS.GET_COMPANY_PROFILE],
                });
                navigate(PROFILE);
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    const companyProfileData = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_COMPANY_PROFILE],
        queryFn: () => getCompanyProfile(),
    });

    useEffect(() => {
        if (companyProfileData.data) {
            accountSetupForm.setValue(
                "logo",
                companyProfileData.data.logo || null
            );
            accountSetupForm.setValue(
                "companyName",
                companyProfileData.data.companyName || ""
            );
            accountSetupForm.setValue(
                "email",
                companyProfileData.data.email || ""
            );
            accountSetupForm.setValue(
                "phone",
                companyProfileData.data.phone || ""
            );
            accountSetupForm.setValue(
                "describeYourCompany",
                companyProfileData.data.description || ""
            );
            accountSetupForm.setValue(
                "address",
                companyProfileData.data.address || ""
            );
            accountSetupForm.setValue(
                "postalCode",
                companyProfileData.data.postalCode || ""
            );
            accountSetupForm.setValue(
                "companyWebsite",
                companyProfileData.data.website || ""
            );
            accountSetupForm.setValue(
                "employeeSize",
                companyProfileData.data.employeeSize || ""
            );
            accountSetupForm.setValue(
                "linkedinUrl",
                companyProfileData.data.linkedin || ""
            );
            accountSetupForm.setValue(
                "twitterUrl",
                companyProfileData.data.twitter || ""
            );
            accountSetupForm.setValue("gst", companyProfileData.data.gst || "");
            accountSetupForm.setValue(
                "images",
                companyProfileData.data.companyImages || []
            );
        }
    }, [companyProfileData.data]);

    return (
        <div className="flex flex-col gap-14 md:p-12 p-6 bg-white rounded-2xl shadow-md">
            <div className="flex items-center gap-2">
                <Link
                    to={PROFILE}
                    replace
                    className="w-8 h-8 mr-2 flex items-center justify-center rounded-md bg-[#F0F0F0]"
                >
                    <i className="pi pi-times"></i>
                </Link>
                <h1 className="lg:text-3xl text-2xl font-semibold tracking-[-1px] text-primary">
                    My Profile
                </h1>
            </div>

            <form className="flex flex-col lg:gap-10 md:gap-8 gap-6">
                <div className="flex items-center gap-4">
                    <label
                        htmlFor="image-upload"
                        className="cursor-pointer relative lg:w-30 w-20 lg:h-30 h-20 rounded-full group"
                    >
                        {logoImgWatcher ? (
                            <>
                                <img
                                    src={
                                        logoImgWatcher instanceof File
                                            ? URL.createObjectURL(
                                                  logoImgWatcher
                                              )
                                            : logoImgWatcher.url
                                    }
                                    alt="No Image"
                                    className="shrink-0 w-full h-full object-contain rounded-full bg-[#F7FAFF]"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-200">
                                    <i className="pi pi-pen-to-square w-5 h-5 text-white" />
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-white">
                                <img
                                    alt="No Image"
                                    src={FileUpload}
                                    className="w-8 h-8 text-gray-400"
                                />
                            </div>
                        )}

                        <input
                            id="image-upload"
                            type="file"
                            {...accountSetupForm.register("logo")}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    if (file?.size > 1000000) {
                                        showToast("warning", "File too large");
                                        return;
                                    }
                                    accountSetupForm.setValue("logo", file);
                                }
                            }}
                        />
                    </label>
                    <div className="flex flex-col md:gap-4">
                        <p className="font-medium text-lg">
                            Upload Company Logo
                        </p>
                        <p className="text-[#A5A3AE] text-sm">
                            Allowed JPG or PNG. <br />
                            Max size of 1 MB
                        </p>
                    </div>
                </div>

                {accountSetupForm.formState.errors.logo && (
                    <small className="w-full text-red-400">
                        {accountSetupForm.formState.errors.logo?.message}
                    </small>
                )}

                <div className="flex flex-col md:gap-8 gap-4 lg:w-3/4">
                    <AuthInput
                        register={accountSetupForm.register("companyName")}
                        label="Company Name"
                        placeholder="Enter Company Name"
                        errorMsg={accountSetupForm.formState.errors.companyName}
                    />

                    <div className="flex md:flex-row flex-col gap-4">
                        <AuthInput
                            register={accountSetupForm.register("email")}
                            label="Email"
                            disabled
                            placeholder="Enter Email"
                            errorMsg={accountSetupForm.formState.errors.email}
                        />

                        <AuthPhone
                            register={accountSetupForm.register("phone")}
                            label="Phone Number"
                            placeholder="9999999999"
                            errorMsg={accountSetupForm.formState.errors.phone}
                        />
                    </div>

                    <AuthTextArea
                        register={accountSetupForm.register(
                            "describeYourCompany"
                        )}
                        label="Describe Your Company"
                        placeholder="Type here"
                        rows={3}
                        cols={5}
                        errorMsg={
                            accountSetupForm.formState.errors
                                .describeYourCompany
                        }
                    />

                    <div className="flex md:flex-row flex-col gap-4">
                        <Controller
                            name="address"
                            control={accountSetupForm.control}
                            render={({ field: { ...field } }) => (
                                <SelectField
                                    filter
                                    filterPlaceholder="Search City"
                                    {...field}
                                    label="Address"
                                    placeholder="Select City"
                                    options={cityList?.cities?.map((city) => ({
                                        label: city,
                                        value: city,
                                    }))}
                                    virtualScrollerOptions={{ itemSize: 38 }}
                                    errorMsg={
                                        accountSetupForm.formState.errors
                                            .address
                                    }
                                />
                            )}
                        />

                        <AuthInput
                            register={accountSetupForm.register("postalCode")}
                            label="Postal Code"
                            placeholder="Postal Code"
                            type="text"
                            inputMode="numeric"
                            keyfilter="int"
                            pattern="[0-9]*"
                            maxLength={6}
                            errorMsg={
                                accountSetupForm.formState.errors?.postalCode
                            }
                        />
                    </div>

                    <div className="flex md:flex-row flex-col gap-4">
                        <AuthInput
                            register={accountSetupForm.register(
                                "companyWebsite"
                            )}
                            label="Company Website"
                            placeholder="Enter Company Website"
                            errorMsg={
                                accountSetupForm.formState.errors.companyWebsite
                            }
                        />

                        <Controller
                            name="employeeSize"
                            control={accountSetupForm.control}
                            render={({ field: { ...field } }) => (
                                <SelectField
                                    {...field}
                                    label="Employee Size"
                                    placeholder="Select Employee Size"
                                    options={VACANCY_LIMIT}
                                    errorMsg={
                                        accountSetupForm.formState.errors
                                            .employeeSize
                                    }
                                />
                            )}
                        />
                    </div>

                    <div className="flex md:flex-row flex-col gap-4">
                        <AuthInput
                            register={accountSetupForm.register("linkedinUrl")}
                            label="Linkedin URL"
                            placeholder="Enter Linkedin URL"
                            errorMsg={
                                accountSetupForm.formState.errors.linkedinUrl
                            }
                        />

                        <AuthInput
                            register={accountSetupForm.register("twitterUrl")}
                            label="Twitter URL"
                            placeholder="Enter Twitter URL"
                            errorMsg={
                                accountSetupForm.formState.errors.twitterUrl
                            }
                        />
                    </div>

                    <AuthInput
                        register={accountSetupForm.register("gst")}
                        label="GST(Optional)"
                        placeholder="Enter GST Number"
                        errorMsg={accountSetupForm.formState.errors.gst}
                    />

                    <div className="flex flex-col gap-4">
                        <AuthLabel
                            labelStyle="text-lg font-medium"
                            label="Add company images"
                        />

                        <div className="flex flex-wrap items-start md:justify-start justify-center gap-4">
                            <label
                                htmlFor="multiple-image-upload"
                                className="cursor-pointer relative w-28 h-28 rounded-xl group"
                            >
                                <div className="w-full h-full rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors">
                                    <img
                                        alt="upload"
                                        src={FileUpload}
                                        className="w-8 h-8 text-gray-400"
                                    />
                                </div>
                                <input
                                    id="multiple-image-upload"
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                        const files = e.target.files;

                                        if (files && files.length > 0) {
                                            for (
                                                let i = 0;
                                                i < files.length;
                                                i++
                                            ) {
                                                const file = files[i];
                                                if (file.size > 1000000) {
                                                    showToast(
                                                        "warning",
                                                        "File too large"
                                                    );
                                                    return;
                                                }
                                                append(file);
                                            }
                                        }
                                    }}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>

                            {imagesWatcher.length > 0 &&
                                imagesWatcher.map((file, index) => (
                                    <div
                                        key={index}
                                        className="relative w-28 h-28"
                                    >
                                        <img
                                            src={
                                                file instanceof File
                                                    ? URL.createObjectURL(file)
                                                    : file.url ||
                                                      "/placeholder.svg"
                                            }
                                            alt={`Upload ${index + 1}`}
                                            className="w-full h-full object-contain rounded-xl"
                                        />
                                        <button
                                            onClick={() => remove(index)}
                                            className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/40 flex items-center justify-center cursor-pointer"
                                            type="button"
                                        >
                                            <i className="pi pi-times text-[9px] text-center pt-0.5 text-white " />
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                    {accountSetupForm.formState.errors.images && (
                        <small className="w-full text-red-400">
                            {accountSetupForm.formState.errors.images?.message}
                        </small>
                    )}

                    <div className="flex items-center justify-center ">
                        <AuthButton
                            customStyle="w-2/5"
                            type="button"
                            disabled={isLoading}
                            onClick={accountSetupForm.handleSubmit(onSubmit)}
                        >
                            {isLoading ? (
                                <ButtonLoader isVisible={isLoading} />
                            ) : (
                                "Save"
                            )}
                        </AuthButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateProfile;
