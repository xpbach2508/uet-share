"use client";

import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import Overview from "../_component/Overview";
const StaffStatistic = dynamic(() => import("../_component/AuctionStatistic"), {
  ssr: false,
});
const UserStatistic = dynamic(() => import("../_component/AssetStatistic"), {
  ssr: false,
});
const PostStatistic = dynamic(() => import("../_component/PostStatistic"), {
  ssr: false,
});
import { getAllUser } from "@/app/api/apiEndpoints";
import { useEffect, useMemo, useState } from "react";
import { userData } from "@/lib/constant/dataInterface";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../taxi/_component/columns";

export default function AdminPage() {
  const columnsMemo = useMemo(() => columns, []);

  return (
    <div className="container ">
      <div className="w-full">
        <Overview />
      </div>

      {/* <div className="w-full flex mt-3 gap-4">
        <div className="basis-1/2">
          <StaffStatistic />
        </div>
        <div className="basis-1/2">
          <UserStatistic />
        </div>
      </div> */}
    </div>
  );
}
