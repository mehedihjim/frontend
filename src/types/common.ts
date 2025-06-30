export type IMeta = {
  page: number;
  limit: number;
  total: number;
};
export type ResponseSuccessType = {
  status: number;
  message: string;
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  status: number;
  message: string;
  errors: { [key: string]: string[] };
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type UserType = {
  user_type: string;
};

export interface IItem {
  created_at: string;
  item_id: number;
  id: number;
  name: string;
  type_name: string;
  updated_at: string;
}

export interface IFeedStockData {
  dealer_id?: string;
  feeds?: { feed_list_id: number; qty: number; price: number; unit: string }[];
  comment?: string;
}
export interface IFeedOrderData {
  dealer_id?: string;
  farmer_id?: string;
  batch_id?: string;
  feeds?: { feed_list_id: number; qty: number; price: number }[];
}

export interface IReservedItemGet {
  item_id: number;
  item_name: string;
  reserved_for_mp: number;
  reserved_for_sports_office: number;
  reserved_for_directorate_of_sports: number;
  created_at: string;
  updated_at: string;
}

export interface IReservedItemPost {
  item_id: number;
  qty: number;
}
