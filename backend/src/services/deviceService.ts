import { User, ControlApplianceRequest } from '../types';

export const users: User[] = [
  {
    userId: 'user1',
    name: 'John Doe',
    residences: [
      {
        residenceId: 'residence1',
        rooms: [
          {
            roomId: 'room1',
            name: 'Living Room',
            appliances: [
              { applianceId: 'light1', name: 'Light', status: 'off', attributes: { brightness: 50 } },
              { applianceId: 'fan1', name: 'Fan', status: 'off', attributes: { speed: 3 } }
            ]
          },
          {
            roomId: 'room2',
            name: 'Bedroom',
            appliances: [
              { applianceId: 'light2', name: 'Night Light', status: 'on', attributes: { brightness: 20 } }
            ]
          }
        ]
      },
      {
        residenceId: 'residence2',
        rooms: [
          {
            roomId: 'room3',
            name: 'Kitchen',
            appliances: [
              { applianceId: 'oven1', name: 'Oven', status: 'off', attributes: { temperature: 180 } }
            ]
          }
        ]
      }
    ]
  }
];

export const findUser = (userId: string): User | undefined => {
  return users.find(user => user.userId === userId);
};

export const controlAppliance = (data: ControlApplianceRequest): string | undefined => {
  const user = findUser(data.userId);
  if (!user) return 'User not found';

  const residence = user.residences.find(residence => residence.residenceId === data.residenceId);
  if (!residence) return 'Residence not found';

  const room = residence.rooms.find(room => room.roomId === data.roomId);
  if (!room) return 'Room not found';

  const appliance = room.appliances.find(appliance => appliance.applianceId === data.applianceId);
  if (!appliance) return 'Appliance not found';

  appliance.status = data.action;
  if (data.attributes) {
    appliance.attributes = { ...appliance.attributes, ...data.attributes };
  }
  return undefined;
};
