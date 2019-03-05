class Item {

  constructor(code, name, category, rating, image, description, directions, specifications){
    this.code = code;
    this.name = name;
    this.category = category;
    this.description = description;
    this.rating = rating;
    this.image = image;
    this.directions = directions;
    this.specifications = specifications;
  }

  getImageURL(){
    return "../assets/images/" + this.image;
  }
}

module.exports = Item;
