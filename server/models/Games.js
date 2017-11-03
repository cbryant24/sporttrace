module.exports = (sequelize, DataTypes) => {
    const Games = sequelize.define('games', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        game_time: DataTypes.BIGINT(20),
        game_date: DataTypes.DATE,
        game_description: DataTypes.STRING,
        game_title: DataTypes.STRING,
        game_vibe: DataTypes.STRING,
        longitude: DataTypes.FLOAT,
        latitude: DataTypes.FLOAT,
        zipcode: DataTypes.INTEGER,
        ball: DataTypes.STRING,
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
    return Games;
}