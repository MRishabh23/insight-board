"use client";

import * as React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";
import { ParamType } from "@/utils/types/common";
import { useInducedQuery, useLatencyQuery } from "@/utils/query";
import { getDaysList } from "@/utils/pre-define-data/data";
import { ChartComponent } from "@/components/data-chart";
import { Line } from "react-chartjs-2";

export function InducedChart() {
  const params = useParams<ParamType>();
  const searchParams = useSearchParams();

  const queryCarriers = React.useMemo(
    () => (searchParams.get("carriers") ? searchParams.get("carriers")?.split(",") : []),
    [searchParams],
  );
  const queryMonths = React.useMemo(
    () => (searchParams.get("months") ? searchParams.get("months")?.split(",") : []),
    [searchParams],
  );

  let newCarrOpt: string[] = [];
  let newMonthOpt: string[] = [];

  if (queryCarriers !== undefined && queryCarriers.length > 0) {
    queryCarriers.map((carrier) => {
      if (carrier) {
        newCarrOpt.push(carrier);
      }
    });
  }

  if (queryMonths !== undefined && queryMonths.length > 0) {
    queryMonths.map((month) => {
      if (month) {
        newMonthOpt.push(month.substring(0, 3).toLowerCase().trim());
      }
    });
  }

  if (!searchParams.get("carriers") || !searchParams.get("months")) {
    return (
      <div className="mt-10 flex items-center justify-center text-xl font-bold">
        Select a carrier and a month to view chart.
      </div>
    );
  }

  return <InducedData params={params} carriers={newCarrOpt} year={searchParams.get("year")} months={newMonthOpt} />;
}

const InducedData = ({ ...props }) => {
  const inducedQuery = useInducedQuery(props.params, props.carriers, props.year, props.months);

  if (inducedQuery.isPending) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <CgSpinnerAlt className="animate-spin text-lg" />
      </div>
    );
  }

  if (inducedQuery.isError || inducedQuery.error) {
    return (
      <div className="mt-6 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">Error: {inducedQuery.error?.message}</p>
      </div>
    );
  }

  if (inducedQuery.data && !inducedQuery.data?.success) {
    return (
      <div className="mt-10 flex h-full flex-col items-center justify-center">
        <p className="text-red-500">{inducedQuery.data?.data}</p>
      </div>
    );
  }

  return <ChartData data={inducedQuery.data} />;
};

const ChartData = ({ ...props }) => {
  const options = React.useMemo(
    () => ({
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        layout: {
          padding: 100,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Day",
          },
        },
        y: {
          title: {
            display: true,
            text: "Latency in hours",
          },
          beginAtZero: true,
          ticks: {
            stepSize: 4,
          },
        },
      },
    }),
    [],
  );
  const dataSet = React.useMemo(() => props.data.data && props.data.data[0], [props.data.data]);
  const chartKeys = React.useMemo(
    () => (props.data.data && props.data.data[0] ? Object.keys(props.data.data[0]) : []),
    [props.data.data],
  );
  const bgArray = React.useMemo(() => ["LightSalmon", "LightSkyBlue", "MediumSeaGreen", "LightPink", "Peru"], []);
  const borderArray = React.useMemo(() => ["Salmon", "CornflowerBlue", "SeaGreen", "HotPink", "Sienna"], []);

  const labels: number[] = React.useMemo(() => getDaysList(), []);

  const val: any = React.useMemo(
    () =>
      chartKeys.map((keys: any, index: any) => {
        for (const key in dataSet) {
          if (key === keys) {
            const dataArr: any[] = dataSet[key];
            const dataArrInHours = dataArr.map((minutes) => minutes / 60.0);
            return {
              label: key,
              data: dataArrInHours,
              backgroundColor: bgArray[index],
              borderColor: borderArray[index],
            };
          }
        }
      }),
    [bgArray, borderArray, chartKeys, dataSet],
  );

  return (
    <ChartComponent>
      <Line options={options} data={{ labels: labels, datasets: val }} />
    </ChartComponent>
  );
};
