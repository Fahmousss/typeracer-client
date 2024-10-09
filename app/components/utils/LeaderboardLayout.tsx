import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardContent } from "./LeaderboardContent";

export function LeaderboardLayout({ children }: any) {
  return (
    <Tabs defaultValue="leaderboard" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        <TabsTrigger value="record">My Record</TabsTrigger>
      </TabsList>
      <TabsContent value="leaderboard">
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>
              Jadilah pengetik tercepat didunia!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div>
                <LeaderboardContent />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="record">{children}</TabsContent>
    </Tabs>
  );
}
