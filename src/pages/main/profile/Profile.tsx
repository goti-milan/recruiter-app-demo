import { NoProfile } from "@/assets/images";
import WebsiteIcon from "@/assets/svg/application/WebsiteIcon";
import LinkedinIcon from "@/assets/svg/LinkedinIcon";
import CallIcon from "@/assets/svg/support/call.svg";
import MailIcon from "@/assets/svg/support/mail.svg";
import Loader from "@/components/ui/loader/Loader";
import { getCompanyProfile } from "@/helpers/apis/profile";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useCallback, useState, useEffect, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router";
const ProfileCompletion = lazy(() => import("@/components/ui/progressbar/ProfileCompletion"));

// Memoized subcomponents to reduce re-renders
const ProfileHeader: React.FC<{
  logoUrl: string;
  companyName: string;
  address: string;
  companyData: any; // forwarded to ProfileCompletion
}> = React.memo(({ logoUrl, companyName, address, companyData }) => {
  return (
    <div className="flex md:flex-row flex-col items-center justify-between w-full">
      <div className="flex justify-start w-full gap-4 items-center lg:w-3/5 md:gap-10">
        <div className="shrink-0 bg-[#F7FAFF] h-20 rounded-full w-20 lg:h-40 lg:w-40 md:h-32 md:w-32">
          <img src={logoUrl} alt="No Image" className="w-full h-full object-contain rounded-full" />
        </div>

        <div className="flex flex-col md:gap-2 w-3/4">
          <p className="md:text-4xl text-2xl font-semibold w-full md:line-clamp-1 line-clamp-2 pb-1 break-words">
            {companyName}
          </p>
          <p className="text-base text-[#393939] line-clamp-2">{address}</p>
        </div>
      </div>

      <Suspense fallback={<div className="w-20 h-20 flex items-center justify-center"><Loader isVisible /></div>}>
        <ProfileCompletion company={companyData} />
      </Suspense>
    </div>
  );
});

const SocialLinks: React.FC<{ twitter?: string | null; linkedin?: string | null }> = React.memo(({ twitter, linkedin }) => {
  if (!twitter && !linkedin) return null;
  return (
    <div className="flex flex-row gap-2 pr-4 md:w-auto w-full">
      {linkedin && (
        <Link to={`${linkedin}`} target="_blank" className="flex items-center justify-center w-9 h-9 border border-[#E7E7E7] rounded-full p-2 hover:bg-[#e3cbf8ad]">
          <LinkedinIcon />
        </Link>
      )}
      {twitter && (
        <Link to={`${twitter}`} target="_blank" className="flex items-center justify-center w-9 h-9 border border-[#E7E7E7] rounded-full p-2 hover:bg-[#e3cbf8ad]">
          <i className="pi pi-twitter text-black"></i>
        </Link>
      )}
    </div>
  );
});

const ContactInfo: React.FC<{ email: string; countryCode: string; phone: string; website?: string }> = React.memo(({ email, countryCode, phone, website }) => {
  return (
    <div className="flex md:flex-row flex-col md:gap-8 gap-2 md:pt-6">
      <div className="flex gap-2 items-center">
        <div className="shrink-0 flex items-center justify-center w-9 h-9 border border-[#D3D3D3]/30 rounded-full p-2">
          <img src={MailIcon} alt="mail" className="aspect-square h-full w-full" />
        </div>
        <Link to={`mailto:${email}`} target="_blank" className="truncate">
          {email}
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        <div className="shrink-0 flex items-center justify-center w-9 h-9 border border-[#D3D3D3]/30 rounded-full p-2">
          <img src={CallIcon} alt="call" className="aspect-square h-full w-full" />
        </div>
        <Link className="text-nowrap" to={`tel:${countryCode} ${phone}`} target="_blank">
          {countryCode} {phone}
        </Link>
      </div>

      {website && (
        <div className="flex gap-2 items-center md:w-1/2">
          <div className="shrink-0">
            <WebsiteIcon />
          </div>
          <Link className="md:w-4/5 truncate" to={`${website}`} target="_blank">
            {website}
          </Link>
        </div>
      )}
    </div>
  );
});

const ImagesGrid: React.FC<{ imageUrls: string[] }> = React.memo(({ imageUrls }) => {
  if (!imageUrls || imageUrls.length === 0) return null;
  return (
    <div className="flex flex-wrap items-start md:justify-start justify-center gap-4 border-t border-[#E9E9E9] pt-8">
      {imageUrls.map((src, index) => (
        <div key={index} className="w-32 h-32">
          <img src={src} alt={`company-${index}`} className="w-full h-full object-contain rounded-xl" />
        </div>
      ))}
    </div>
  );
});

const Profile: React.FC = () => {
    const navigate = useNavigate();

    const companyProfileData = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_COMPANY_PROFILE],
        queryFn: () => getCompanyProfile(),
    });

    // memoize company object for stable references (non-null here because rendering branch checks data presence)
    const company = companyProfileData.data!;

    // memoized navigate callback
    const onEditClick = useCallback(() => navigate("/profile/create-profile"), [navigate]);

    // Logo URL handling: create object URL for File and revoke on change/unmount
    const [logoUrl, setLogoUrl] = useState<string>(NoProfile);
    useEffect(() => {
        if (!company?.logo) {
            setLogoUrl(NoProfile);
            return;
        }

        let createdUrl: string | null = null;
        if (company.logo instanceof File) {
            createdUrl = URL.createObjectURL(company.logo);
            setLogoUrl(createdUrl);
        } else {
            setLogoUrl(company.logo?.url ?? NoProfile);
        }

        return () => {
            if (createdUrl) {
                URL.revokeObjectURL(createdUrl);
            }
        };
    }, [company?.logo]);

    // Company images handling: create object URLs for File entries and revoke on change/unmount
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    useEffect(() => {
        if (!company?.companyImages || company.companyImages.length === 0) {
            setImageUrls([]);
            return;
        }

        const created: string[] = [];
        const urls = company.companyImages
            .map((img: any) => {
                if (img instanceof File) {
                    const u = URL.createObjectURL(img);
                    created.push(u);
                    return u;
                }
                return img?.url ?? "";
            })
            .filter(Boolean);

        setImageUrls(urls);

        return () => {
            created.forEach((u) => URL.revokeObjectURL(u));
        };
    }, [company?.companyImages]);

    // memoize simple derived fields to avoid repeated optional chaining in JSX
    const {
        companyName,
        address,
        email,
        countryCode,
        phone,
        website,
        description,
        employeeSize,
        gst,
        twitter,
        linkedin,
    } = useMemo(
        () => ({
            companyName: company?.companyName ?? "",
            address: company?.address ?? "",
            email: company?.email ?? "",
            countryCode: company?.countryCode ?? "",
            phone: company?.phone ?? "",
            website: company?.website ?? "",
            description: company?.description ?? "",
            employeeSize: company?.employeeSize ?? null,
            gst: company?.gst ?? null,
            twitter: company?.twitter ?? null,
            linkedin: company?.linkedin ?? null,
        }),
        [company]
    );

    return companyProfileData.isLoading ? (
        <Loader isVisible />
    ) : companyProfileData.data ? (
        <div className="flex flex-col gap-14 md:p-12 p-6 bg-white rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
                <h1 className="lg:text-3xl text-2xl font-semibold tracking-[-1px] text-primary">
                    My Profile
                </h1>

                <button
                    onClick={onEditClick}
                    className="flex items-center gap-2 text-black font-semibold border border-[#C1C1C1] rounded-xl py-2 px-4"
                >
                    Edit Profile
                    <i className="pi pi-pen-to-square"></i>
                </button>
            </div>

            <div className="flex flex-col md:gap-6 gap-2 w-full">
                <ProfileHeader logoUrl={logoUrl} companyName={companyName} address={address} companyData={company} />

                <SocialLinks twitter={twitter} linkedin={linkedin} />

                <ContactInfo email={email} countryCode={countryCode} phone={phone} website={website} />

                <p className="font-medium leading-8 line-clamp-4">{description}</p>

                {(employeeSize || gst) && (
                    <div className="flex md:flex-row flex-col md:gap-8 gap-2 items-center">
                        {employeeSize && (
                            <p className="text-lg text-black w-full">
                                <span className="text-sm text-[#626262]">Employee Size </span>
                                : {employeeSize}
                            </p>
                        )}

                        {gst && (
                            <p className="text-lg text-black w-full">
                                <span className="text-sm text-[#626262]">GST </span>
                                : {gst}
                            </p>
                        )}
                    </div>
                )}

                <ImagesGrid imageUrls={imageUrls} />
            </div>
        </div>
    ) : (
        <p className="w-full h-full flex items-center justify-center">No data found...</p>
    );
};

export default React.memo(Profile);
