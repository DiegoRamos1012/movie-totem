import React from "react";
import { NavigationMenuDemo } from "@/components/ui/MenuItems";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="w-full flex justify-center mt-2">
        <div className="w-full max-w-3xl">
          <NavigationMenuDemo />
        </div>
      </div>
      <div className="text-center mt-6">Teste - Dashboard</div>
    </div>
  );
};

export default Dashboard;
