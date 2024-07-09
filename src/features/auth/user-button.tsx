import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { LoginButton } from "./login-button";
import { UserDropdown } from "./user-dropdown";

export const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return <LoginButton />;
  }

  return (
    <UserDropdown>
      <Avatar className="size-10">
        <AvatarImage
          src={session.user.image || ""}
          alt={session.user.user_name || ""}
        />
        <AvatarFallback>{session.user.user_name?.[0]}</AvatarFallback>
      </Avatar>
    </UserDropdown>
  );
};
