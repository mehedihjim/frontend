export interface IShed {
  id?: number;
  farmer_id?: number;
  name?: string;
  district_name?: string;
  division_id?: string;
  district_id?: string;
  upzilla_id?: string;
  union_id?: string;
  address?: string;
}

// shed v2.0 (testing)
export interface Farmer {
  id: number;
  name: string;
  // ...
}

export interface Division {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
}
export interface Upzilla {
  id: number;
  name: string;
}
export interface Union {
  id: number;
  name: string;
}
