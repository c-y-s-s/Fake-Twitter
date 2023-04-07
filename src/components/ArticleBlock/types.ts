export interface ArticleBlockProps {
  useBlocks: string;
  setArticlesTotalNumber?: React.Dispatch<React.SetStateAction<string>>;
}

export interface ResultData {
  mail: string;
  name: string;
  photoURL: string;
}
export interface ArticleData {
  id: string;
  transferBy?: string[];
  likeBy?: string[];
  imageUrl?: string;
  text: string;
  author: {
    email: string;
    photoURL: string;
    uid: string;
    userName: string;
    membershipNumber: string;
  };
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface SortIdOtherUserDataProps extends ArticleData {
  resultData: (ResultData | undefined)[];
}
