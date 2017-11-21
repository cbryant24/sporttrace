/**@module user_table */

/**
 * @function 
 * @param {object} sequelize 
 * @param {object} DataTypes 
 * @returns model of users sql database table
 */

module.exports = (sequelize, dataTypes) => {
    /**
     * defining the table columns and datatypes for sql table games using npm library sequelize
     * to create models of sql database tables for route access
     */
    const Users = sequelize.define('users', {
        id: {
            type: dataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true
        },
        fb_id: dataTypes.BIGINT(20),
        first_name: dataTypes.STRING,
        last_name: dataTypes.STRING,
        email: dataTypes.STRING,
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return Users
}