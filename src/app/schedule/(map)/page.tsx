"use client";
import { useCallback, useEffect, useState } from "react";
import {
  listScheduleAdminProphet,
  listScheduleDriverProphet,
} from "@/app/api/apiEndpoints";
import { DataTable } from "@/components/ui/data-table";
import { columns_schedules } from "./_component/columns";
import { Button } from "@/components/ui/button";
import * as React from "react";

import { cn } from "@/lib/utils";
import { scheduleDataDto } from "@/lib/constant/dataInterface";
import { Marker, NoStartMarker, Schedule } from "./_component/dataInterface";
import dynamic from "next/dynamic";
import { socket } from "@/app/socket";

//map init
const HereMap = dynamic(() => import("./_component/Map"), {
  ssr: false,
});
export default function Page() {
  const [refresh, setReFresh] = useState(false);

  //map entity
  const [tableData, setTableData] = useState<Marker[]>([]);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [noStartMarkers, setNoStart] = useState<NoStartMarker[]>([]);
  const [colorDirection, setColorDirection] = useState<number[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);
  const [taxiGroup, setTaxiGroup] = useState(new Map());
  const [endScheduleGroup, setEndScheduleGroup] = useState(new Map());
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [reload, setReload] = useState(false);
  const HERE_API_KEY = process.env.NEXT_PUBLIC_HERE_API_KEY;

  const [time, setTime] = useState(7.0); // initial time

  const processData = (responseData: scheduleDataDto[]) => {
    let data = responseData;
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
        index++;
      } else if (data[i].groupId === data[i - 1].groupId) {
        // schedule
        listPointSchedule[index2] = {
          origin: [data[i - 1].lat, data[i - 1].lng] as [number, number],
          destination: [data[i].lat, data[i].lng] as [number, number],
          transportMode: "car",
          expectedTime: [data[i - 1].expectedTime, data[i].expectedTime],
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
  const fetchDataAdmin = async () => {
    const data = await listScheduleAdminProphet();
    const data_use = await data?.data;
    processData(data_use);
  };
  useEffect(() => {
    setSelectedGroupId(0);
    const result = fetchDataAdmin().catch(console.error);
    setTableData(markers);
  }, [refresh]);
  useEffect(() => {
    const onConnect = () => {
      console.log("connected:" + socket.id);
    };

    const onDisconnect = () => {
      console.log("disconnected");
    };

    const onInsertionEvent = async (data: number) => {
      console.log("Received schedule event with data:", data);
      await fetchDataAdmin();
      setReload(!reload);
      const fetchOneGroup = async () => {
        const dataOneGroup = await listScheduleDriverProphet(data);
        const data_use = dataOneGroup?.data;
        setTableData(data_use);
      };
      const result = fetchOneGroup().catch(console.error);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("schedule", onInsertionEvent);

    // Connect the socket
    socket.connect();

    // Cleanup function to remove event listeners
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("schedule", onInsertionEvent);
      socket.off("testsocket");
    };
  }, []);

  const handleRowClick = (row: any) => {
    setSelectedGroupId(row.groupId);
    socket.emit("choose_group", {
      chatMessage: selectedGroupId,
      id: socket.id,
      timestamp: Date.now(),
    });
  };

  const handleStartTime = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setTime(7.0);
    }
    socket.emit("start_time", {
      chatMessage: time,
      id: socket.id,
      timestamp: Date.now(),
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

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
            Toggle List Group
          </Button>
          <Button
            onClick={() => handleStartTime()}
            className={
              isRunning ? "bg-red-500 text-white" : "bg-green-500 text-white"
            }
          >
            {isRunning ? time.toFixed(2) : "Start"}
          </Button>
        </div>
        <div>{selectedGroupId}</div>
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
          isRunning={isRunning}
          currentTime={time}
          reload={reload}
        ></HereMap>
      </div>
      <div className="w-full h-1/4 overflow-auto">
        {isTableVisible && (
          <div className="overflow-auto w-h-80 h-full">
            <DataTable
              columns={columns_schedules}
              data={tableData}
              onRowClick={handleRowClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}
