"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { listScheduleAdminProphet } from "@/app/api/apiEndpoints";
import { DataTable } from "@/components/ui/data-table";
import { columns_schedules } from "./_component/columns";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/lib/hook/useDebounce";
import { scheduleDataDto } from "@/lib/constant/dataInterface";
import { Label } from "@/components/ui/label";
import { Marker, NoStartMarker, Schedule } from "./_component/dataInterface";
import dynamic from "next/dynamic";

//map init
const HereMap = dynamic(() => import("./_component/Map"), {
  ssr: false,
});
export default function Page() {
  const [refresh, setReFresh] = useState(false);

  //map entity
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [noStartMarkers, setNoStart] = useState<NoStartMarker[]>([]);
  const [colorDirection, setColorDirection] = useState<number[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);
  const [taxiGroup, setTaxiGroup] = useState(new Map());
  const [endScheduleGroup, setEndScheduleGroup] = useState(new Map());
  const [isTableVisible, setIsTableVisible] = useState(false);
  const HERE_API_KEY = process.env.NEXT_PUBLIC_HERE_API_KEY;

  const processData = (responseData: scheduleDataDto[]) => {
    let data = responseData;
    console.log(data);
    let listPointMarker = [],
      index = 0;
    let listPointSchedule = [],
      index2 = 0;
    let listPointMarkerNoPointStart = [];
    let len = data.length;
    let tempEndStartGroup = new Map();
    let tempTaxiGroup = new Map();
    for (let i = 0; i < len; i++) {
      if (i === 0) {
        // marker
        listPointMarker[index] = {
          lat: data[i].lat,
          lng: data[i].lng,
          driverName: data[i].driverName,
          licensePlate: data[i].licensePlate,
          nameCar: data[i].nameCar,
          groupId: data[i].groupId,
          expectedTimeString: data[i].expectedTimeString,
          wait: data[i].wait,
        };
        tempTaxiGroup.set(data[i].groupId, index);
        tempEndStartGroup.set(data[i].groupId, index2);
        // console.log(endScheduleGroup);
        index++;
      } else if (data[i].groupId === data[i - 1].groupId) {
        // schedule
        listPointSchedule[index2] = {
          origin: [data[i - 1].lat, data[i - 1].lng] as [number, number],
          destination: [data[i].lat, data[i].lng] as [number, number],
          transportMode: "car",
        };

        // markersFullNoStart
        listPointMarkerNoPointStart[index2] = {
          lat: data[i].lat,
          lng: data[i].lng,
          expectedTimeString: data[i].expectedTimeString,
          wait: data[i].wait,
        };
        index2++;
      } else {
        // marker
        const initScheduleIndex = tempEndStartGroup.get(data[i - 1].groupId);

        // Update the accumulated tempEndScheduleGroup
        if (initScheduleIndex != undefined) {
          tempEndStartGroup.set(data[i - 1].groupId, [
            initScheduleIndex,
            index2--,
          ]);
          tempEndStartGroup.set(data[i].groupId, index2++);
        }
        listPointMarker[index] = {
          lat: data[i].lat,
          lng: data[i].lng,
          driverName: data[i].driverName,
          licensePlate: data[i].licensePlate,
          nameCar: data[i].nameCar,
          groupId: data[i].groupId,
          expectedTimeString: data[i].expectedTimeString,
          wait: data[i].wait,
        };
        tempTaxiGroup.set(data[i].groupId, index);
        index++;
      }
      if (i == len - 1) {
        const initScheduleIndex = tempEndStartGroup.get(data[i].groupId);
        // Update the accumulated tempEndScheduleGroup
        if (initScheduleIndex) {
          tempEndStartGroup.set(data[i].groupId, [initScheduleIndex, index2--]);
        }
      }
    }
    setMarkers(listPointMarker);
    setNoStart(listPointMarkerNoPointStart);
    setSchedule(listPointSchedule);
    setEndScheduleGroup(tempEndStartGroup);
    setTaxiGroup(tempTaxiGroup);
  };

  useEffect(() => {
    setSelectedGroupId(0);
    const fetchData = async () => {
      const data = await listScheduleAdminProphet();
      const data_use = await data?.data;
      processData(data_use);
    };
    const result = fetchData().catch(console.error);
  }, [refresh]);

  const handleRowClick = (row: any) => {
    setSelectedGroupId(row.groupId);
  };

  return (
    <div className="container">
      <div className="flex justify-between mb-5">
        <div className="flex gap-3">
          <Button
            onClick={() => setReFresh(!refresh)}
            className="bg-blue-500 text-white"
          >
            Refresh
          </Button>
          <Button
            onClick={() => setIsTableVisible(!isTableVisible)}
            className="bg-blue-500 text-white"
          >
            List Group
          </Button>
        </div>
      </div>
      <div>
        <HereMap
          markers={markers}
          noStartMarkers={noStartMarkers}
          endScheduleGroup={endScheduleGroup}
          schedule={schedule}
          groupId={selectedGroupId}
          taxiGroup={taxiGroup}
          apiKey={HERE_API_KEY}
        ></HereMap>
      </div>
      <div className="w-full h-1/4 overflow-auto">
        {isTableVisible && (
          <div className="overflow-auto w-full h-full">
            <DataTable
              columns={columns_schedules}
              data={markers}
              onRowClick={handleRowClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}
