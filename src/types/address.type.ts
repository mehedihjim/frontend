export interface IDivision {
  id: number;
  name: string;
  bn_name: string;
}

export interface IDistrict {
  id: number;
  name: string;
  bn_name: string;
  division_id: number;
  division_name: string;
}

export interface IUpzilla {
  id: number;
  name: string;
  distict_name: string;
  distict_id: number;
  bn_name: string;
}

export interface IUnion {
  id: number;
  name: string;
  upazilla_name: string;
  upazilla_id: number;
  bn_name: string;
}
