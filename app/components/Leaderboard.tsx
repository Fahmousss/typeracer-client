"use server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { auth, signIn, signOut } from "../lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardContent } from "@/app/components/utils/LeaderboardContent";
import { UserLeaderboard } from "./utils/UserLeaderboard";

export async function Leaderboard() {
  const session = await auth();

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
      <TabsContent value="record">
        {!session?.user ? (
          <Card>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>
                Sign in untuk pengalaman yang lebih asik!🎊🎊
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <Button>Sign in sekarang</Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <UserLeaderboard userName={session.user.name}>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button>Sign Out</Button>
            </form>
          </UserLeaderboard>
        )}
      </TabsContent>
    </Tabs>
  );
}
