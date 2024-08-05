import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserAction } from "@/actions/auth-actions";

const Profile = async () => {
  const { data, success } = await getUserAction();

  if (!success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-red-500">Error: {data}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Card className="w-[360px] sm:w-[450px]">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-medium text-zinc-500">User Profile</p>
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {data?.username
                  ? data?.username.split("_")[2]
                    ? data?.username.split("_")[2].substring(0, 2)
                    : data?.username.split("_")[1].substring(0, 2)
                  : "U"}
              </AvatarFallback>
              <span className="sr-only">Toggle user menu</span>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="flex justify-between">
            <p className="font-semibold text-zinc-500">username: </p>
            <p className="text-blue-500">{data?.username.includes("FANTATECH") ? "JT_FANTATECH" : data?.username}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-zinc-500">created: </p>
            <p className="text-blue-500">{data?.createdAt}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
