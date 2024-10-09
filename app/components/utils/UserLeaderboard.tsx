"use client";

import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

interface User {
  name: string;
}

interface Record {
  user: User | null; // User can be null if not found
  wpm: number;
  cpm: number;
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

export function UserLeaderboard({ userName, children }: any) {
  const { data, error } = useSWR("/api/curr-user-record", fetcher);

  // Error handling and loading state
  if (error) return <Skeleton className="w-72 h-36" />;
  if (!data) return <Skeleton className="w-72 h-36" />;

  // Assuming userRecords is an array of Record
  const records: Record[] = data || []; // Adjust based on your API response structure

  return (
    <Card>
      <CardHeader>
        <CardTitle>{userName}</CardTitle>
        <CardDescription>
          Pertahankan skill mu! teruslah mengetik🔥🔥
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="">
          <div className="">
            <div className="flex flex-row gap-7 p-2 border rounded-sm justify-between">
              <div className="flex flex-row gap-3">
                <p className="text-xs">Rank</p>
                <p className="text-xs">Name</p>
              </div>
              <div className="flex flex-row gap-3">
                <p className="text-xs">CPM</p>
                <p className="text-xs">WPM</p>
              </div>
            </div>
          </div>
          {records.length > 0 ? (
            records.map((record, index) => (
              <div className="w-full" key={index}>
                <div className="flex flex-row gap-7 p-2 justify-between">
                  <div className="flex flex-row gap-6 pl-3 truncate">
                    <p className="text-xs self-start">{index + 1}</p>
                    <p className="text-xs">
                      {record.user?.name ?? "unknown user"}
                    </p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <p className="text-xs">{record.wpm}</p>
                    <p className="text-xs pr-2">{record.cpm}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No records available.
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">{children}</CardFooter>
    </Card>
  );
}
