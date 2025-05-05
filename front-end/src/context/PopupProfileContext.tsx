import { createContext, useContext, useState, ReactNode } from "react";

type PopupProfileContextType = {
    username: string | null;
    openProfile: (username: string) => void;
    closeProfile: () => void;
}

const ProfilePopupContext = createContext<PopupProfileContextType | undefined>(undefined);

export const ProfilePopupProvider = ({children}: {children: ReactNode}) => {
    const [username, setUsername] = useState<string | null>(null);
    const openProfile = (username: string) => 
      {
        closeProfile();
        setTimeout(()=>{
          setUsername(username);
        }, 0)
      }
    const closeProfile = () => setUsername(null);
    return (
        <ProfilePopupContext.Provider value={{ username, openProfile, closeProfile }}>
          {children}
        </ProfilePopupContext.Provider>
      );
}

export const useProfilePopup = () => {
    const context = useContext(ProfilePopupContext);
    if (!context) throw new Error("useProfilePopup must be used within a ProfilePopupProvider");
    return context;
  };