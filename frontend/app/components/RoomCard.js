import { useState } from "react";
import Image from "next/image";

function RoomCard({ data }) {
  const [collapsed, setCollapsed] = useState(false);
  const [appliances, setAppliances] = useState(data.appliances);

  const toggleApplianceStatus = (applianceId) => {
    setAppliances(appliances.map(appliance => 
      appliance.applianceId === applianceId
        ? { ...appliance, status: appliance.status === 'off' ? 'on' : 'off' }
        : appliance
    ));
  };

  return (
    <div className="flex flex-col  text-2xl max-w-md w-full  text-white px-4 py-2">
      <div className="flex justify-start gap-1 cursor-pointer select-none" onClick={() => setCollapsed(!collapsed)}>
        <div>{collapsed ? '▸' : '▾'}</div>
        <div>{data.name}</div>
      </div>

      {!collapsed && (
        <div className="flex flex-col  gap-4 mt-2 text-black  ">
          {appliances.map(appliance => (
            <div 
              key={appliance.applianceId} 
              className="flex bg-[#AEDBE3] justify-between gap-2 items-center border shadow-md p-4 rounded-xl w-72 hover:bg-orange-50"
            >
              <div className="flex items-center gap-2">
                <Image src="/bulb.svg" width="40" height="40" alt="bulb" />
                <div className="flex flex-col items-start">
                  <div className="text-lg">{appliance.name}</div>
                  <div className="text-sm text-gray-600">{appliance.status}</div>
                </div>
              </div>
              <button
                onClick={() => toggleApplianceStatus(appliance.applianceId)}
                className={`p-2 rounded-full text-sm px-3 py-1.5 ${appliance.status === 'on' ? 'bg-yellow-400' : 'bg-gray-200'}`}
              >
                {appliance.status === 'on' ? 'Turn Off' : 'Turn On'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoomCard;
