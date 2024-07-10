import { SortOrder } from "mongoose";

export  interface QueryParams {
    productId :string
    category: string,
    size: string,
    color: string,
    price_lte: string,
    price_gte: string,
    mark : string,
    onStock : boolean | string
}

export interface FilterQueryParams {
    category?: { $regex: RegExp },
    productId?:string
    size?: { $regex: RegExp },
    color?: { $regex: RegExp },
    sort_price?: {price :  string | { [key: string]: SortOrder | { $meta: any; }; } | [string, SortOrder][]},
    mark? : string
    price? : {
        $gte?: string,
        $lte?: string,
    },
    $or? : any
    onStock? : boolean | string
}