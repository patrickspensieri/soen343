let User = require('../../domain-layer/classes/User');
let UserTDG = require('../../data-source-layer/TDG/UserTDG');

/**
 * User object mapper
 * @class UserMapper
 * @export
 */
class UserMapper {
  /**
   * Creates a new user
   * @static
   * @param {boolean} isAdmin is user client or admin
   * @param {string} firstName first name of user
   * @param {string} lastName last name of user
   * @param {string} address home address of user
   * @param {string} email email of user
   * @param {number} phone phone number of user
   * @param {string} password user password, hashed
   * @return {user} user object.
   */
    static makeNew(firstName, lastName, address, email, phone, id, password) {
        let user = new User(firstName, lastName, address, email, phone, id, password);
        UOW.registerNew(user);
        return user;
    }

  /**
   * Registers an object dirty in the UOW
   * @static
   * @param {Object} user an object of type user.
   */
    static makeUpdate(user) {
        UOW.registerDirty(user);
    }

   /**
    * Registers an object deleted in the UOW
    * @static
    * @param {Object} user an object of type user.
    */
    static makeDeletion(user) {
        UOW.registerDeleted(user);
    }

   /**
    * Commits the UOW
    * @static
    */
    static commit() {
        UOW.commit();
    }

  /**
   * Maps the returned value to an object of type user.
   * @static
   * @param {string} email of user to be found.
   * @param {function} callback function that holds User object.
   */
    static find(email, callback) {
        UserTDG.find(email, function(err, result) {
            if (err) {
                console.log('Error during user find query', null);
            } else {
                let value = result[0];

                if (result.length==0) {
                    return callback(err, null);
                } else {
                    return callback(null, new User(value.isadmin, value.firstname,
                        value.lastname, value.address, value.email, value.phone, value.password));
                }
            }
        });
    }

  /**
   * Maps all returned values into objects of type user.
   * @static
   * @param {function} callback function that holds array of User object.
   */
    static findAll(callback) {
        UserTDG.findAll(function(err, result) {
            let users = [];
            if (err) {
                console.log('Error during user findALL query', null);
            } else {
                for (let value of result) {
                    users.push(new User(value.isadmin, value.firstname,
                        value.lastname, value.address, value.email, value.phone));
                }
                return callback(null, users);
            }
        });
    }


// TODO removed uerObject.id from insert function, since we do not know what ID
// will be generated by the database??
  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} userObject an object of type user.
   */
    static insert(userObject) {
        UserTDG.insert(userObject.isAdmin, userObject.firstName,
            userObject.lastName, userObject.address, userObject.email, userObject.phone, userObject.password);
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} userObject an object of type user.
   */
    static update(userObject) {
        UserTDG.update(userObject.isAdmin, userObject.firstName,
            userObject.lastName, userObject.address, userObject.email, userObject.phone);
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} userObject an object of type user.
   */
    static delete(userObject) {
        UserTDG.delete(userObject.email);
    }
}

module.exports = UserMapper;
