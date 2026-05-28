import AvatarPlaceholder from "@/assets/images/avatar-placeholder.svg";

const UserImageUsername = ({
  imageUrl,
  username,
}: {
  imageUrl: string | undefined;
  username: string | null | undefined;
}) => {
  return (
    <>
      {/* image */}
      <div className="w-22 h-22 rounded-full bg-lavender-mist border-2 border-indigo-velvet">
        <img
          src={imageUrl ? imageUrl : AvatarPlaceholder}
          className="w-full h-full rounded-full"
          alt={
            username ? `${username}'s profile picture` : "Avatar Placeholder"
          }
        />
      </div>
      {/* name */}
      <h1 className="text-3xl text-dark-amethyst capitalize">{username}</h1>
    </>
  );
};

export default UserImageUsername;
