const Item = require('../models/item');

itemDataByProductCode = {};
let allItemsData = [];
Item.allItemsData().exec(function(error, allItems){
  allItemsData = allItems;
  allItems.forEach(item => {
    item['imageUrl'] = "../assets/images/" + item['image'];
    itemDataByProductCode[item.code] = item;
  });
});


const getItems = () => {
  return allItemsData;
};

const getItem = (code) => {
  return itemDataByProductCode[String(code)];
};

const getItemByCode = (code) => {
  for(let i=0; i<allItemsData.length;i++){
    let item = allItemsData[i];
    if(item.code === String(code)){
      return item;
    }
  }
};

const getItemsByCategory = () => {
  let getItemsByCategory = {};
  allItemsData.map(itemObj => {
    if (Object.keys(getItemsByCategory).includes(itemObj['category'])) {
      let curData = getItemsByCategory[itemObj['category']];
      itemObj['imageUrl'] = "../assets/images/" + itemObj['image'];
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
  "getItemsByCategory": getItemsByCategory,
  "getItemByCode":getItemByCode
};
