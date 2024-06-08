import { SortOrder } from "mongoose";

export  interface QueryParams {
    category: string,
    size: string,
    color: string,
    price_lte: string,
    price_gte: string,
    mark : string,
    onStock : boolean | string
}

export interface FilterQueryParams {
    category?: string,
    size?: string,
    color?: string,
    sort_price?: {price :  string | { [key: string]: SortOrder | { $meta: any; }; } | [string, SortOrder][]},
    mark? : string
    price? : {
        $gte?: string,
        $lte?: string,
    },
    onStock? : boolean | string
}