import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="flex w-full max-w-[26rem] flex-col gap-11 sm:gap-12">
        <ProfileHeader profile={profile} />
        <LinkList links={links} />
      </div>
    </main>
  );
}
