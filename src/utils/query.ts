import { FilterQueryParams, QueryParams } from "src/product/types/queryParams";

export const filterObjectFactory = (
    {
        category,
        productId,
        size,
        color,
        price_lte,
        price_gte,
        mark,
        onStock
    }: QueryParams
): FilterQueryParams => {


    const filter: FilterQueryParams = {};

    if (category !== undefined) {
        filter.category = category;
    }
    if (size !== undefined) {
        filter.size = size;
    }
    if (color !== undefined) {
        filter.color = color;
    }
    if (mark !== undefined) {
        filter.mark = mark;
    }

    if(productId !== undefined) {
        filter.productId = productId
    }

    if (onStock !== undefined) {
        if (onStock === '1' || onStock === 'true') {
            filter.onStock = true;
        } else if (onStock === '0' || onStock === 'false') {
            filter.onStock = false;
        } else {
            filter.onStock = onStock;
        }
    }

    if (price_gte !== undefined || price_lte !== undefined) {
        filter.price = {};
        if (price_gte !== undefined) {
            filter.price.$gte = price_gte;
        }
        if (price_lte !== undefined) {
            filter.price.$lte = price_lte;
        }
    }

    return filter
}