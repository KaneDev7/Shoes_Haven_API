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
        filter.$or = category.split(',').map(s => ({ category: { $regex: new RegExp(`\\b${s}\\b`, 'i') } }));
    }

    if (size !== undefined) {
        filter.$or = size.split(',').map(s => ({ size: { $regex: new RegExp(`\\b${s}\\b`, 'i') } }));
    }

    if (color !== undefined) {
        filter.$or = color.split(',').map(s => ({ color: { $regex: new RegExp(`\\b${s}\\b`, 'i') } }));
    }

    if (mark !== undefined) {
        filter.mark = mark;
    }

    if (productId !== undefined) {
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

    return filter;
}
