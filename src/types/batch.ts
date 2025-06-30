export interface Ibatch {
    id?: number;
    shed_id?: number;
    name?: string;
    batch_number?: string;
    hen_type?: string;
    chick_number?: string;
    chick_price?: string;
    start_date?: Date|string;
    operator_id?: string|number;
  }