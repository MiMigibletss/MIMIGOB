const Sequelize = require('sequelize');

module.exports = class Block extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
           
            hash: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            // version: {
            //     type: Sequelize.STRING(200),
            //     allowNull: false,
            // },
            // timespent: {
            //     type: Sequelize.STRING(200),
            //     allowNull: false,
            // },
            // nonce: {
            //     type: Sequelize.STRING(200),
            //     allowNull: false,
            // },
            // date: {
            //     type: Sequelize.STRING(200),
            //     allowNull: false,
            // },
         
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Block',
            tableName: 'blocks',
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