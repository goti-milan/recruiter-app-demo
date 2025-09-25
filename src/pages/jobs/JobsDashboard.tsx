import SelectField from "@/components/ui/auth/SelectField";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import JobCard from "@/components/ui/cards/JobCard";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import Loader from "@/components/ui/loader/Loader";
import { getAllJobs } from "@/helpers/apis/jobs";
import { JOB_STATUS, USE_QUERY_KEYS } from "@/helpers/constants";
import queryClient from "@/helpers/query.config";
import useDebounce from "@/hooks/useDebounce";
import { CREATE_JOB } from "@/routes";
import { JobTable } from "@/types/jobs.types";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const JobsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState<JOB_STATUS>(
    JOB_STATUS.ON_GOING,
  );
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);

  return (
    <div className="w-full h-full bg-white border border-[#E7E7E7] rounded-2xl p-4">
      <div className="w-full md:h-[40px] flex md:flex-row flex-col md:items-center justify-between mb-3 gap-3">
        <div className="flex items-center lg:gap-10 lg:justify-start justify-between lg:w-3/5">
          <h3 className="text-2xl font-bold text-primary">Jobs Posted</h3>
          <div className="w-1/2">
            <IconField
              iconPosition="right"
              pt={{
                root: {
                  className: "!w-full !font-manrope",
                },
              }}
            >
              <InputIcon className="absolute right-2 !mt-0 top-1/2 -translate-y-1/2">
                <i className="pi pi-search"></i>{" "}
              </InputIcon>
              <InputText
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
                className="w-full !h-[40px] !text-black !border-[#EEEEEE] focus:border-primary focus:!shadow-none !bg-[#F7F7F7] !rounded-xl font-manrope"
              />
            </IconField>
          </div>
        </div>
        <div className="flex items-center md:justify-center justify-between gap-6">
          {/* <select
                        onChange={(e) =>
                            setFilteredData(e.target.value as JOB_STATUS)
                        }
                        className="border-none outline-none rounded-xl md:px-4 py-2 font-semibold text-primary"
                    >
                        <option value={JOB_STATUS.ON_GOING}>On Going</option>
                        <option value={JOB_STATUS.EXPIRED}>Expired</option>
                    </select> */}
          <div className="w-[120px]">
            <SelectField
              options={[
                {
                  label: "On Going",
                  value: JOB_STATUS.ON_GOING,
                },
                { label: "Expired", value: JOB_STATUS.EXPIRED },
              ]}
              value={filteredData}
              onChange={(e) => setFilteredData(e.value as JOB_STATUS)}
              inputStyle="flex items-center justify-center"
              className="h-[40px]"
              triggerStyle="w-8"
            />
          </div>

          <PrimaryButton
            onClick={() => {
              localStorage.removeItem("job-details");
              navigate(CREATE_JOB);
              queryClient.removeQueries({
                queryKey: [USE_QUERY_KEYS.GET_ONE_JOB],
              });
            }}
            label="Create Job"
            labelStyle="md:text-base text-sm"
            className="w-[150px] h-[40px]"
          />
        </div>
      </div>

      <InfiniteScroll<JobTable, { page: number; pageSize: number }>
        queryKey={[
          USE_QUERY_KEYS.GET_ALL_JOBS,
          filteredData,
          debouncedSearchText,
        ]}
        fetchFn={async (params) => {
          const response = await getAllJobs({
            ...params,
            searchText: debouncedSearchText,
            jobStatus: filteredData,
          });
          return {
            data: response?.jobs ?? [], // Provide an empty array as default value
            hasMore:
              (Number(response?.totalCount) || 0) >
              params.page * params.pageSize, // Ensure totalCount is a number
            totalPages:
              Math?.ceil(
                (Number(response?.totalCount) || 0) / params.pageSize,
              ) || 0, // Avoid NaN
          };
        }}
        initialParams={{ page: 1, pageSize: 10 }}
        getDataFromResponse={(response) => response.data}
        hasMorePages={(lastPage, allPages) =>
          allPages.length < lastPage.totalPages
        }
        renderItem={(job) => <JobCard key={job?.id} data={job} />}
        loadingComponent={<Loader isVisible={true} />}
        emptyComponent={
          <div className="w-full h-4/5 flex items-center justify-center text-primary text-lg font-semibold text-center">
            No Jobs Found.
          </div>
        }
        gridCols={2}
        direction="down"
        className="gap-4 md:h-[calc(100%-40px)] h-[calc(100vh-200px)]"
      />
    </div>
  );
};

export default JobsDashboard;
