import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={profile.imageUrl}
        alt={`${profile.name} 프로필 사진`}
        width={176}
        height={176}
        priority
        className="h-36 w-36 rounded-full border-2 border-zinc-200 object-cover sm:h-44 sm:w-44 dark:border-zinc-700"
      />
      <h1 className="mt-5 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        {profile.name}
      </h1>
      <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
        {profile.bio}
      </p>
    </header>
  );
}
