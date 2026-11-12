import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="rounded-full bg-white/60 p-1.5 shadow-[0_18px_40px_-14px_rgb(var(--shadow-warm)/0.45),0_2px_6px_rgb(var(--shadow-warm)/0.12)] ring-1 ring-white/80">
        <Image
          src={profile.imageUrl}
          alt={`${profile.name} 프로필 사진`}
          width={128}
          height={128}
          priority
          className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"
        />
      </div>
      <h1 className="mt-6 text-[1.625rem] leading-tight font-bold tracking-tight text-ink">
        {profile.name}
      </h1>
      <p className="mt-2.5 max-w-xs text-[0.9375rem] leading-relaxed text-ink-soft">
        {profile.bio}
      </p>
    </header>
  );
}
