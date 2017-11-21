/**@module history_table */

/**
 * @function 
 * @param {object} sequelize 
 * @param {object} DataTypes 
 * @returns model of game_history sql database table
 */

module.exports = (sequelize, DataTypes) => {
    /**
     * defining the table columns and datatypes for sql table games using npm library sequelize
     * to create models of sql database tables for route access
     */
    const History = sequelize.define('game_history', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fb_id: DataTypes.BIGINT(20),
        game_id: DataTypes.BIGINT(20),
        creator: DataTypes.BOOLEAN,
    }, 
    {
        timestamps: false,
        freezeTableName: true
    })
    return History
}