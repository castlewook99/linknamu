import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex flex-1 justify-center bg-zinc-50 px-4 py-12 sm:py-16 dark:bg-black">
      <div className="flex w-full max-w-md flex-col gap-8">
        <ProfileHeader profile={profile} />
        <ul className="flex flex-col gap-6">
          {links.map((link) => (
            <li key={link.id}>
              <LinkCard link={link} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
