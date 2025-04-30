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