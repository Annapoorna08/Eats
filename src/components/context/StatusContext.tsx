import React, { createContext, useContext, useEffect, useState } from "react";
import { checkName, setName } from "../utils/preferencesUtil";

interface StatusContextType {
  isOnline: string;
  setIsOnline: React.Dispatch<React.SetStateAction<string>>;
  emailid: string | null;
  setIsEmail: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOnline, setIsOnline] = useState<string>("Open");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedInDelivery");
    return storedLoginStatus === "true"; // Convert string to boolean
  });

  const [emailid, setIsEmail] = useState<string | null>(null); // Initialize as null

  // Function to fetch email ID
  const fetchEmailId = async () => {
    const mail = await checkName("email_id");
    setIsEmail(mail); // Update state with fetched email
  };

  // Function to save email ID
  const saveEmailId = async (emailId: string | null) => {
    if (emailId) {
      await setName("email_id", emailId);
    }
  };

  useEffect(() => {
    // Fetch email ID when the component mounts
    fetchEmailId();
  }, []);

  useEffect(() => {
    // Save email ID whenever it changes
    saveEmailId(emailid);
  }, [emailid]);

  useEffect(() => {
    // Save the login state to local storage whenever it changes
    localStorage.setItem("isLoggedInDelivery", isLoggedIn.toString());
  }, [isLoggedIn]);

  return (
    <StatusContext.Provider
      value={{
        isOnline,
        setIsOnline,
        isLoggedIn,
        setIsLoggedIn,
        emailid,
        setIsEmail,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = (): StatusContextType => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("useStatus must be used within a StatusProvider");
  }
  return context;
};
