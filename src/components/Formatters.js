export class Formatters {
  static number = num => {
    if (parseInt(num) > 0) {
      num = num.toString();
      let index = num.length - 3;
      while (index > 0) {
        num = num.substring(0, index) + "," + num.substring(index);
        index -= 3;
      }
    }
    return num;
  };
  static price = price => {
    if (parseInt(price) > 0) {
      price = this.number(price);
      price = "$" + price;
    }
    return price;
  };
  static bed = bdrms => {
    if (parseInt(bdrms) >= 0) {
      bdrms += "+ Beds";
    }
    return bdrms;
  };
  static bath = baths => {
    if (parseInt(baths) > 0) {
      baths += "+ Baths";
    }
    return baths;
  };
  static sqft = sqfts => {
    if (parseInt(sqfts) > 0) {
      sqfts = this.number(sqfts);
      sqfts += "+ sq.ft.";
    }
    return sqfts;
  };
}
