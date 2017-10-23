module.exports = (sequelize, dataTypes) => {
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