import { IItem, IFeedStockData } from "@/types/common";

export const formatItems = (
  feeds: Record<string, number | string | any>,
  isFalsyRemove: Boolean,
  selectedItems: IItem[],
): IFeedStockData => {
  if (!feeds) return {} as IFeedStockData;
  const comment = feeds["comment"] as string;
  const dealer_id = feeds["dealer_id"] as string;
  const received_date = feeds["received_date"] as string;
  let institute_club: {
    name: string;
    code_number: number;
  }[] = feeds["institute_club"] as {
    name: string;
    code_number: number;
  }[];
  delete feeds["comment"];
  delete feeds["institute_club"];
  delete feeds["received_date"];
  delete feeds["dealer_id"];

  let feedsArray: {
    feed_list_id: number;
    price: number;
    qty: number;
    unit: string;
  }[] = [];

  Object.keys(feeds).forEach((key) => {
    if (key.startsWith("sportsName-")) {
      const itemId = parseInt(key.split("-")[1]); // Extract item_id
      const qty = parseInt(feeds[key] as string) || 0;

      if (qty < 1 && isFalsyRemove) return;

      // Find the corresponding price using `sportsPrice-<id>`
      const priceKey = `sportsPrice-${itemId}`;
      const price = feeds[priceKey]
        ? parseFloat(feeds[priceKey] as string) || 0
        : 0;

      // Find the corresponding price using `sportsPrice-<id>`
      const unitKey = `sportsUnit-${itemId}`;
      const unit = feeds[unitKey] ? feeds[unitKey] : 0;

      feedsArray.push({
        feed_list_id: itemId,
        price: price,
        qty: qty,
        unit: unit,
      });
    }
  });
  // remove elements from institute_club array that have empty name and code_number or falsy values
  if (institute_club) {
    institute_club = institute_club.filter(
      (item: { name: string; code_number: number }) =>
        item?.name && item?.code_number,
    );
  }
  //remove items which is not selected
  feedsArray = feedsArray.filter((feed) =>
    selectedItems.find((selectedItem) => {
      return selectedItem.item_id
        ? selectedItem.item_id === feed.feed_list_id
        : selectedItem.id === feed.feed_list_id;
    }),
  );
  return { feeds: feedsArray, comment };
};
