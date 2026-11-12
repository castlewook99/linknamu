// 보여 주기용 더미 데이터입니다. 나중에 진짜 내용으로 바꿔 주세요.

export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  emoji?: string;
};

export const profile: Profile = {
  name: "김성욱",
  bio: "쉬었음 청년 | 저는 요즘에 쉬는 것에 관심이 많아요",
  imageUrl: "/images.jpg",
};

export const links: LinkItem[] = [
  {
    id: "github",
    title: "깃허브",
    url: "https://github.com/castlewook99",
    emoji: "🐙",
  },
  {
    id: "blog",
    title: "블로그",
    url: "https://blog.naver.com/constantinopolis_",
    emoji: "✍️",
  },
  {
    id: "email",
    title: "이메일",
    url: "mailto:alsldl34@naver.com",
    emoji: "📬",
  },
];
