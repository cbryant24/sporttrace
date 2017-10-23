module.exports = (sequelize, DataTypes) => {
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