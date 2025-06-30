import { IReservedItemPost } from "@/types/common";

export const formatReservedItems = (datas: Record<string, number | string | any>): IReservedItemPost[] => {

    let itemsArray: IReservedItemPost[] = [];

    Object.keys(datas).forEach((key) => {
        const [type, id] = key.split('-');
        const value = datas[key];
        itemsArray[Number(id) - 1] = {
            ...itemsArray[Number(id) - 1],
            [type]: value,
            item_id: Number(id),
        };

    });
    const items = itemsArray
    return items

};