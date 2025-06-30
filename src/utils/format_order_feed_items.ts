import { IItem, IFeedOrderData } from "@/types/common";

export const formatOrderFeedItems = (
  feeds: Record<string, number | string | any>,
  feedStockData: { data: any[] },
  isFalsyRemove: Boolean,
  selectedItems: IItem[],
): IFeedOrderData => {
  if (!feeds) return {} as IFeedOrderData;

  delete feeds["institute_club"];
  delete feeds["received_date"];
  delete feeds["dealer_id"];

  let feedsArray: {
    feed_list_id: number;
    price: number;
    qty: number;
  }[] = [];

  Object.keys(feeds).forEach((key) => {
    if (key.startsWith("sportsName-")) {
      const itemId = parseInt(key.split("-")[1]); // Extract item_id
      const qty = parseInt(feeds[key] as string) || 0;

      if (qty < 1 && isFalsyRemove) return;

      // Find matching item in feedStockData
      const matchedItem = feedStockData?.data?.find(
        (item) => item.id === itemId,
      );
      const price = matchedItem ? matchedItem.price : 0;

      feedsArray.push({
        feed_list_id: itemId,
        price: price,
        qty: qty,
      });
    }
  });

  //remove items which is not selected
  feedsArray = feedsArray.filter((feed) =>
    selectedItems.find((selectedItem) => {
      return selectedItem.item_id
        ? selectedItem.item_id === feed.feed_list_id
        : selectedItem.id === feed.feed_list_id;
    }),
  );
  return { feeds: feedsArray };
};
