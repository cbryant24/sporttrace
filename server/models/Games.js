module.exports = (sequelize, DataTypes) => {
    const Games = sequelize.define('games', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        game_time: DataTypes.DATE,
        last_name: DataTypes.DATE,
        longitude: DataTypes.FLOAT,
        latitude: DataTypes.FLOAT,
        user_id: DataTypes.BIGINT(20),
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );
    return Games;
}




// video_game: {
//     type: DataTypes.STRING,
//     validate: {
//         len: [2,20]
//     }
// }