const allData = require('./itemDB');

itemDataByProductCode = {};
const allItemsData = allData.allItemsData;

allItemsData.forEach(item => {
  item['imageUrl'] = item.getImageURL();
  itemDataByProductCode[item.code] = item;
});

const getItems = () => {
  return allItemsData;
};

const getItem = (code) => {
  return itemDataByProductCode[String(code)];
};

const getItemsByCategory = () => {
  let getItemsByCategory = {};
  allItemsData.map(itemObj => {
    if (Object.keys(getItemsByCategory).includes(itemObj['category'])) {
      let curData = getItemsByCategory[itemObj['category']];
      itemObj['imageUrl'] = itemObj.getImageURL();
      curData.push(itemObj);
      getItemsByCategory[itemObj['category']] = curData;
    }
    else {
      getItemsByCategory[itemObj['category']] = [itemObj]
    }
  });
  return getItemsByCategory;
};

module.exports = {
  "getItems": getItems,
  "getItem": getItem,
  "getItemsByCategory": getItemsByCategory
};
