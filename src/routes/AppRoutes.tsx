import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router";
import Loader from "@/components/ui/loader/Loader";

const MainLayout = lazy(() => import("@/components/layouts/main"));
const AccountSetup = lazy(() => import("@/pages/account-setup/AccountSetup"));
const EmailVerification = lazy(
  () => import("@/pages/auth/email-verification/EmailVerification")
);
const Login = lazy(() => import("@/pages/auth/login/Login"));
const VerifyOtp = lazy(() => import("@/pages/auth/otp-verification/VerifyOtp"));
const Register = lazy(() => import("@/pages/auth/register/Register"));
const ForgotPassword = lazy(
  () => import("@/pages/auth/forgot-password/ForgotPassword")
);
const AcceptedAndRejectedTab = lazy(
  () => import("@/pages/jobs/application-tabs/AcceptedAndRejectedTab")
);
const AIRecommendedTab = lazy(
  () => import("@/pages/jobs/application-tabs/AIRecommendedTab")
);
const AppliedTab = lazy(
  () => import("@/pages/jobs/application-tabs/AppliedTab")
);
const ShortlistedTab = lazy(
  () => import("@/pages/jobs/application-tabs/ShortlistedTab")
);
const CreateJob = lazy(() => import("@/pages/jobs/create-job/CreateJob"));
const JobApplications = lazy(() => import("@/pages/jobs/JobApplications"));
const JobDetails = lazy(() => import("@/pages/jobs/JobDetails"));
const JobDetailsWrapper = lazy(() => import("@/pages/jobs/JobDetailsWrapper"));
const JobsDashboard = lazy(() => import("@/pages/jobs/JobsDashboard"));
const Dashboard = lazy(() => import("@/pages/main/dashboard/Dashboard"));
const Messages = lazy(() => import("@/pages/main/messages/Messages"));
const AuthLayout = lazy(() => import("../components/layouts/auth"));
const Support = lazy(() => import("@/pages/main/support/Support"));
const CreateProfile = lazy(() => import("@/pages/main/profile/CreateProfile"));
const ApplicationDetails = lazy(
  () => import("@/pages/jobs/application-tabs/ApplicationDetails")
);
const Profile = lazy(() => import("@/pages/main/profile/Profile"));
const ProtectedRouter = lazy(() => import("./ProtectedRouter"));
const PageNotFound = lazy(() => import("@/pages/main/PageNotFound"));
const PreviewJob = lazy(() => import("@/pages/jobs/PreviewJob"));
const PrivacyPolicy = lazy(
  () => import("@/pages/privacy-policy/PrivacyPolicy")
);
const TermsofService = lazy(
  () => import("@/pages/terms-of-service/TermsofService")
);
const CodeofConduct = lazy(
  () => import("@/pages/code-of-conduct/CodeofConduct")
);

import { APPLICATION_TABS_TYPE, USE_QUERY_KEYS } from "@/helpers/constants";
import queryClient from "@/helpers/query.config";
import { getCompanyAuth } from "@/helpers/apis/auth";
import SaralPromptScreen from "@/pages/saral-ai/SaralAi";
import { PromptScreen } from "@/pages/fresh-saral-ai/FreshSaralAi";

const AppRoutes: React.FC = () => {
  const rotues = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRouter>
          <MainLayout />
        </ProtectedRouter>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "messages",
          element: <Messages />,
        },
        {
          path: "jobs",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <JobsDashboard />,
            },
            {
              path: "edit/:id",
              element: <CreateJob />,
            },
            {
              path: "preview",
              element: <PreviewJob />,
            },
            {
              path: "create-job",
              element: <CreateJob />,
            },
            {
              path: ":jobId",
              element: <JobDetailsWrapper />,
              children: [
                {
                  index: true,
                  element: <JobDetails />,
                },
                {
                  path: "applications",
                  element: <JobApplications />,
                  children: [
                    {
                      index: true,
                      element: <AIRecommendedTab />,
                    },
                    {
                      path: ":userId",
                      element: (
                        <ApplicationDetails
                          tab={APPLICATION_TABS_TYPE.AI_RECOMMENDED}
                        />
                      ),
                    },
                    {
                      path: "applied",
                      element: (
                        <div className="h-full w-full">
                          <Outlet />
                        </div>
                      ),
                      children: [
                        {
                          index: true,
                          element: <AppliedTab />,
                        },
                        {
                          path: ":id",
                          element: (
                            <ApplicationDetails
                              tab={APPLICATION_TABS_TYPE.APPLIED}
                            />
                          ),
                        },
                      ],
                    },
                    {
                      path: "shortlisted",
                      element: (
                        <div className="h-full w-full">
                          <Outlet />
                        </div>
                      ),
                      children: [
                        {
                          index: true,
                          element: <ShortlistedTab />,
                        },
                        {
                          path: ":id",
                          element: (
                            <ApplicationDetails
                              tab={APPLICATION_TABS_TYPE.SHORTLISTED}
                            />
                          ),
                        },
                      ],
                    },
                    {
                      path: "accepted-rejected",
                      element: (
                        <div className="h-full w-full">
                          <Outlet />
                        </div>
                      ),
                      children: [
                        {
                          index: true,
                          element: <AcceptedAndRejectedTab />,
                        },
                        {
                          path: ":id",
                          element: (
                            <ApplicationDetails
                              tab={APPLICATION_TABS_TYPE.ACCEPTED_REJECTED}
                            />
                          ),
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: "profile",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <Profile />,
            },
            {
              path: "create-profile",
              element: <CreateProfile />,
            },
          ],
        },
        {
          path: "support",
          element: <Support />,
        },
        {
          path: "/account-setup",
          element: <AccountSetup />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      loader: async () => {
        try {
          const data = await queryClient.ensureQueryData({
            queryKey: [USE_QUERY_KEYS.IS_VALID_USER],
            queryFn: () => getCompanyAuth(),
            staleTime: 10 * 60 * 1000,
          });
          if (data) return redirect("/");

          return null;
        } catch (error) {
          console.error(error);
        }
      },
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "verify-otp",
          element: <VerifyOtp />,
        },
        {
          path: "forgot-password",
          element: <EmailVerification />,
        },
        {
          path: "reset-password",
          element: <ForgotPassword />,
        },
      ],
    },
    {
      path: "code-of-conduct",
      element: <CodeofConduct />,
    },
    {
      path: "privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "terms-and-conditions",
      element: <TermsofService />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
    {
      path: "saral-ai",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: true ? <SaralPromptScreen /> : <PromptScreen />,
        },
        {
          path: "result",
          element: <SaralPromptScreen />,
        },
        {
          path: "result/:id/view",
          element: <SaralPromptScreen />,
        },
        {
          path: "new",
          element: <SaralPromptScreen />,
        },
        {
          path: "linkdin-campaign",
          element: <SaralPromptScreen />,
        },
        {
          path: "saved-campaigns",
          element: <SaralPromptScreen />,
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<Loader isVisible />}>
      <RouterProvider router={rotues} />
    </Suspense>
  );
};

export default AppRoutes;
