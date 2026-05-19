import React from "react";
import TriageChat from "@/components/triage-chat";

const MainLayout = ({ children }) => {
  return (
    <div className="container mx-auto my-20">
      {children}
      <TriageChat />
    </div>
  );
};

export default MainLayout;