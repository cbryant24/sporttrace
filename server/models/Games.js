/**@module games_table */

/**
 * model of games sql database table
 */

module.exports = (sequelize, DataTypes) => {
    /**
     * defining the table columns and datatypes for sql table games using npm library sequelize
     * to create models of sql database tables for route access
     */
    const Games = sequelize.define('games', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        game_date: DataTypes.BIGINT(20),
        game_description: DataTypes.STRING,
        game_title: DataTypes.STRING,
        game_vibe: DataTypes.STRING,
        longitude: DataTypes.FLOAT,
        latitude: DataTypes.FLOAT,
        zipcode: DataTypes.INTEGER,
        city: DataTypes.STRING,
        ball: DataTypes.STRING,
        fb_id: DataTypes.BIGINT(20),
        google_place_id: DataTypes.STRING,
        formatted_date: DataTypes.STRING,
        address_elements: DataTypes.TEXT
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
    return Games;
}