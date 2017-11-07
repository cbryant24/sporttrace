module.exports = (sequelize, DataTypes) => {
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
        fb_id: DataTypes.BIGINT(20)
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
    return Games;
}