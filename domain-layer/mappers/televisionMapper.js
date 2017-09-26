let television = require('../../domain-layer/classes/television');
let televisionTDG = require('../../data-source-layer/TDG/televisionTDG');

/**
 * television object mapper
 * @class televisionMapper
 * @export
 */
class televisionMapper {
  /**
   * Maps the returned value to an object of type television.
   * @static
   * @param {string} id model number of television to be found.
   */
    static find(id) {
        let television = televisionTDG.find(id);
        console.log(television);
    }

  /**
   * Maps all returned values into objects of type television.
   * @static
   */
    static findAll() {
        let televisions = [];
        let alltelevisions = televisionTDG.findAll();
        console.log(alltelevisions);
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} televisionObject an object of type television.
   */
    static insert(televisionObject) {
        televisionTDG.insert(televisionObject.modelNumber, televisionObject.brand, televisionObject.dimensions,
            televisionObject.weight, televisionObject.price);
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} televisionObject an object of type television.
   */
    static update(televisionObject) {
        televisionTDG.update(televisionObject.modelNumber, televisionObject.brand, televisionObject.dimensions,
            televisionObject.weight, televisionObject.price);
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} televisionObject an object of type television.
   */
    static delete(televisionObject) {
        televisionTDG.delete(televisionObject.modelNumber);
    }
}

module.exports = televisionMapper;
