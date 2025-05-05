type PublicationType = {
    id: string,
    author: AuthorType,
    authorId: string,
    content: string,
    createdAt: string,
}

type AuthorType = {
    fullName: string,
    username: string,
    profilePic: string
}

type SignupInputs = {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: string;
}
type SuggestedUserType = {
    id: string;
    username: string;
    fullName: string;
    profilePic: string;
}

// type PopupProfile

type ProfileCardType = {
    id: string;
    username: string;
    fullName: string;
    profileDescription: string;
    profilePic: string;
    publications: PublicationType[]
    _count: {
        follows: number;
        following: number;
      };
}