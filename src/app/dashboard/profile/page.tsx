import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserAction } from "@/actions/auth-actions";

const Profile = async () => {
  const { data, success } = await getUserAction();

  if (!success) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <p className="text-red-500">Error: {data}</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Card className="w-[360px] sm:w-[450px]">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <p className="text-2xl text-zinc-500 font-medium">User Profile</p>
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
          <div className="flex  justify-between">
            <p className="font-semibold text-zinc-500">username: </p>
            <p className="text-blue-500">{data?.username}</p>
          </div>
          <div className="flex  justify-between">
            <p className="font-semibold text-zinc-500">created: </p>
            <p className="text-blue-500">{data?.createdAt}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
