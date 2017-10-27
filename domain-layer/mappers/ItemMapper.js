let Item = require('../../domain-layer/classes/Item');
let ItemTDG = require('../../data-source-layer/TDG/ItemTDG');

/**
 * Item object mapper
 * @class ItemMapper
 * @export
 */
class ItemMapper {
    /**
     * Creates a new item
     * @static
     * @param {string} serialNumber of product
     * @param {string} modelNumber of Product Specification
     * @return {item} item object.
     */
    static makeNew(serialNumber, modelNumber) {
        let item = new Item(serialNumber, modelNumber);
        return item;
    }

    /**
     * Maps the returned value to an object of type Item.
     * @static
     * @param {string} serialNumber serial number of item to be found.
     * @param {function} callback function that returns item object.
     */
    static find(serialNumber, callback) {
        ItemTDG.find(serialNumber, function(err, result) {
            if (err) {
                console.log('Error during item find query', null);
            } else {
                let value = result[0];
                if (result.length==0) {
                    return callback(err, null);
                } else {
                    return callback(null, new Item(value.serialnumber, value.model));
                }
            }
        });
    }

    /**
     * Maps all returned values into objects of type item.
     * @static
     * @param {function} callback function that returns desktop object.
     */
    static findAll(callback) {
        ItemTDG.findAll(function(err, result) {
            let items = [];
            if (err) {
                console.log('Error during item findAll query', null);
            } else {
                for (let value of result) {
                    items.push(new Item(value.serialnumber, value.model));
                }
                return callback(null, items);
            }
        });
    }

    /**
     * Maps an objects attributes to seperate values for TDG insert method.
     * @static
     * @param {Object} itemObject an object of type item.
     */
    static insert(itemObject) {
        ItemTDG.insert(itemObject.serialNumber, itemObject.modelNumber);
    }

    /**
     * Uses an objects serialNumber to use with TDG delete method.
     * @static
     * @param {Object} serialNumber serial number of object to delete.
     */
    static delete(serialNumber) {
        ItemTDG.delete(serialNumber);
    }
}

module.exports = ItemMapper;