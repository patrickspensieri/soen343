let TabletTDG = require('../../data-source-layer/TDG/TabletTDG');
let Tablet = require('../../domain-layer/classes/products/Tablet');

/**
 * Tablet object mapper
 * @class TabletMapper
 * @export
 */
class TabletMapper {
  /**
   * Creates a new tablet
   * @static
   * @param {string} model model number of tablet.
   * @param {string} brand brand of tablet.
   * @param {number} display  size of tablet screen.
   * @param {string} processor processor in tablet.
   * @param {number} ram ram amount in tablet.
   * @param {number} storage storage size of tablet.
   * @param {number} cores amount of cores in processor in tablet.
   * @param {string} os operating system of tablet.
   * @param {string} battery battery information of tablet.
   * @param {string} camera camera information of tablet.
   * @param {string} dimensions dimensions of tablet.
   * @param {number} weight weight of tablet.
   * @param {number} price price of tablet
   * @return {tablet} tablet object.
   */
    static makeNew(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price) {
        let tablet = new Tablet(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price);
        return tablet;
    }

  /**
   * Maps the returned value to an object of type tablet.
   * @static
   * @param {string} modelNumber model number of tablet to be found.
   * @param {function} callback function that holds Tablet object.
   */
    static find(modelNumber, callback) {
        TabletTDG.find(modelNumber, function(err, result) {
            if (err) {
                console.log('Error during tablet find query', null);
            } else {
                let value = result[0];
                if (result.length==0) {
                    return callback(err, null);
                } else {
                    return callback(null, new Tablet(value.model, value.brand, value.display, value.processor,
                        value.ram, value.storage, value.cores, value.os,
                        value.battery, value.camera, value.dimensions,
                        value.weight, value.price));
                }
            }
        });
    }

  /**
   * Maps all returned values into objects of type tablet.
   * @static
   * @param {function} callback function that holds array of Tablet object.
   */
    static findAll(callback) {
        TabletTDG.findAll(function(err, result) {
            let tablets = [];
            if (err) {
                console.log('Error during tablet findALL query', null);
            } else {
                for (let value of result) {
                    tablets.push(new Tablet(value.model, value.brand, value.display, value.processor,
                        value.ram, value.storage, value.cores, value.os,
                        value.battery, value.camera, value.dimensions,
                        value.weight, value.price));
                }
                return callback(null, tablets);
            }
        });
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} tabletObject an object of type tablet.
   */
    static insert(tabletObject) {
        TabletTDG.insert(tabletObject.model, tabletObject.brand, tabletObject.display, tabletObject.processor,
            tabletObject.ram, tabletObject.storage, tabletObject.cores, tabletObject.os,
            tabletObject.battery, tabletObject.camera, tabletObject.dimensions,
            tabletObject.weight, tabletObject.price);
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} tabletObject an object of type tablet.
   */
    static update(tabletObject) {
        TabletTDG.update(tabletObject.model, tabletObject.brand, tabletObject.display, tabletObject.processor,
            tabletObject.ram, tabletObject.storage, tabletObject.cores, tabletObject.os,
            tabletObject.battery, tabletObject.camera, tabletObject.dimensions,
            tabletObject.weight, tabletObject.price);
    }

  /**
   * Extracts an objects model to use with TDG delete method.
   * @static
   * @param {Object} tabletObject an object of type tablet.
   */
    static delete(tabletObject) {
        TabletTDG.delete(tabletObject.model);
    }
    static getTablet(callback) {
        TabletTDG.getTablet(function(err, result) {
            let tablet = [];
            if (err) {
                console.log('Error during item findAll query', null);
            } else {
                for (let value of result) {
                    tablet.push(new Tablet(value.model, value.brand, value.processor, value.ram, value.storage, value.cores, value.dimensions, value.weight, value.price));
                }
                return callback(null, tablet);
            }
        });
    }
}

module.exports = TabletMapper;