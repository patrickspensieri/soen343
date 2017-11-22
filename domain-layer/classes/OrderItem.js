let ProductCatalog = require('./ProductCatalog');
/**
 * Class describes a OrderItem.
 * @class OrderItem
 * @export
 */
class OrderItem {
    /**
     * @constructor
     * @param {string} orderItemId 
     * @param {string} orderId 
     * @param {string} serialNumber 
     * @param {number} price 
     * @param {boolean} isReturned 
     * @param {Object} itemObj 
     * @param {Date} itemTimeout 
     * @param {Object} productCatalog 
     */
    constructor(orderItemId, orderId, serialNumber, price, isReturned, itemObj, itemTimeout) {
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.serialNumber = serialNumber;
        this.price = price;
        this.isReturned = isReturned;
        this.itemObj = itemObj;
        this.specification = null;
        this.productCatalog = ProductCatalog.getProductCatalogInstance();
        this.itemTimeout = itemTimeout; // timer for each items
    }

    /**
     * OderItem accessor
     * @return {string} returns item object id
     */
    getOrderItemId() {
        return this.orderItemId;
    }

    /**
     * ItemObject accessor
     * @return {Object} returns item object
     */
    getItemObject() {
       return itemObj;
    }

    /**
     * ItemObject mutator
     * @param {*} callback 
     */
    setItemObject(callback) {
        let self = this;
        this.productCatalog.getItem(this.serialNumber, function(err, result) {
            self.itemObj = result;
            return callback(err, result);
        });
    }

    /**
     * Specification mutator
     * @param {*} callback 
     */
    setSpecification(callback) {
        let self = this;
        this.productCatalog.getProductSpecification(this.itemObj.type, this.itemObj.modelNumber, function(err, result) {
            if (!err) {
                self.specification = result;
                self.price = result.price;
            }
            return callback();
        });
    }

    /**
     * OrderItemId mutator
     * @param {*} orderId 
     */
    setOrderItemId(orderId) {
        this.orderId = orderId;
        this.orderItemId = this.generateOIID();
    }

    /**
     * Generates an OIID
     * @return {string} OIID
     */
    generateOIID() {
        let ooid = this.orderId + '' + this.serialNumber;
        return ooid;
    }
}

module.exports = OrderItem;
