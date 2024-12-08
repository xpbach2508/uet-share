"use client";

import { LucideIcon, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Layout, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getAllOnlineGroup, getAllRequest } from "@/app/api/apiEndpoints";

interface StatisticItem {
  icon: LucideIcon;
  title: string;
  value: number | undefined;
  bgColor: string;
  iconColor: string;
}

const StatisticItem = ({
  icon: Icon,
  title,
  value,
  bgColor,
  iconColor,
}: StatisticItem) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 mt-2 rounded-lg border p-3">
      <div className="flex">
        <div
          className={`${bgColor} w-1/4 rounded-lg flex items-center justify-center`}
        >
          <Icon size={30} className={cn(`${iconColor}`)} />
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{title}</div>
          <div className="text-xl text-slate-500 dark:text-slate-400">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Overview() {
  const [requestServedCount, setRequestServedCount] = useState<number>();
  const [frequentGroupCount, setFrequentGroupCount] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      const allServedRequest = await getAllRequest();
      const frequentGroup = await getAllOnlineGroup();

      setFrequentGroupCount(frequentGroup.data);
      setRequestServedCount(allServedRequest.data.length);
    };

    fetchData();
  }, []);

  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap">
          <StatisticItem
            icon={UsersRound}
            title="Request served"
            value={requestServedCount}
            bgColor="bg-[#ebf9fa]"
            iconColor="text-[#29bec9]"
          />
          <StatisticItem
            icon={Layout}
            title="Number of shared group"
            value={frequentGroupCount}
            bgColor="bg-[#fff8e7]"
            iconColor="text-[#fec634]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
