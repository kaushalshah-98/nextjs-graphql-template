export interface IData {
  name: string;
  date: string;
}

export interface IEventData {
  count: number;
  today: IData[];
  thisMonth: IData[];
}

export interface IEventResponse {
  anniversary: IEventData;
  birthday: IEventData;
}

export interface IDashboardData {
  today: number;
  thisMonth: number;
}

export interface IDashboardResponse {
  anniversary: IDashboardData;
  birthday: IDashboardData;
}
