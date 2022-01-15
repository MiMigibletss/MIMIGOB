const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(100),
                allowNull: true,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            public: {
                type: Sequelize.STRING(300),
                allowNull: true,
            },
            private: {
                type: Sequelize.STRING(300),
                allowNull: true,
            },
            name: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
         
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        // db.User.hasMany(db.Post);
        // db.User.hasMany(db.Jam);
        // db.User.hasMany(db.Comment);
        // db.User.belongsToMany(db.Comment, { through: "commentRecommends", as: "commentRecommenders" });
        // db.User.belongsToMany(db.Post, { through: "Recommends", as: "recommenders" });
    }
};