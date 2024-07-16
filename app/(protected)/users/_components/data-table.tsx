<div className="flex items-center space-x-2">
        <Image
          src={row.getValue("empProfilePicture") || "/user_profile.jpeg"}
          alt="Profile Picture"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("empName")}
        </span>
      </div>