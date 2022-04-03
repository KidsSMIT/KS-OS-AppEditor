const path = require("path");

db_func = require(path.join(__dirname, "db"));

// The user of Global in comments, is refering to
// the server database
/**
 * Users class used to interact with with the user side of the server
 */
class Users {
    #id = "";
    #name = "";
    #password = "";
    #email = "";
    #homeFolderName = "";
    #homeFolderID = "";

    /**
     * Users class used to interact with with the user side of the server
     * @param {string} id - Global id of the user
     * @param {string} name - Global name of the user
     * @param {string} password -  Global password of user 
     */
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    set email(val) {
        if (this.#id !== "" && val !== null) {

        }

        this.#email = val;
    }

    get email() {
        return this.#email;
    }
    
    set name(val) {
        // Means that the name of the user is being change so we will need to notify the server
        if (this.#id !== "" && val !== null){

        }

        this.#name = val;
    }

    get name() {
        return this.#name;
    }

    /**
     * @param {string} val
     */
    set password(val) {
        // Means that the password of the user is being change so we will need to notify the server
        if (this.#id  !== "" && val !== null) {

        }

        this.#password = val;
    }

    get password() {
        return this.#password;
    }

    /**
     * Creates A user in local database
     * if the user exist already exist in local database it will sign the user in
     * @param {string} id - Global id of the user
     * @param {string} name - Global name of the user
     * @param {string} password -  Global password of user
     * @param {string} email - Global email of the user
     * @param {string} homeFolderName -  Global homeFolderName of user
     * @param {string} homeFolderID - Global homeFolderID of user
     */
    create_user = (id, name, password, email, homeFolderName, homeFolderId) => {
        db_func.user_exist(id, (val) => {
            if (val == true) {
                console.log("User exist");
                this.sign_in(id, name, password, email, homeFolderName, homeFolderId);
            } else {
                let this1 = this;
                this.sign_out(function() { 

                    db_func.create_user(id, name, password, function() {
                        this1.sign_in(id, name, password, email, homeFolderName, homeFolderId);
                    });
                });
            }
        })
    }

    /**
     * Signs the user globally and locally
     * @param {string} id - Global id of the user
     * @param {string} name - Global name of the user
     * @param {string} password -  Global password of user
     * @param {string} email - Global email of the user
     * @param {string} homeFolderName -  Global homeFolderName of user
     * @param {string} homeFolderID - Global homeFolderID of user
     * @param {function} callback - Callback function
     */

    sign_in = (id, name, password, email, homeFolderName, homeFolderId, callback = function() {}) => {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.homeFolderName = homeFolderName;
        this.homeFolderID = homeFolderId;

        db_func.sign_in(name, password, () => { console.log("Success Sign In") })
        callback();
    }

    /**
     * Signs the user out globally and locally
     * @param {Function} callback - Callback function
     */
    sign_out = (callback = function() {}) => {
        this.id = null;
        this.name = null;
        this.password = null;
        this.email = null;
        this.homeFolderName = null;
        this.homeFolderID = null;
        db_func.sign_out(() => { console.log('Success SignOut'); callback() });
    }

}

module.exports = {
    Users: Users
}