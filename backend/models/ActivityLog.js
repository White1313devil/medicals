const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Admin = require('./Admin');

const ActivityLog = sequelize.define('ActivityLog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Admin,
            key: 'id'
        }
    },
    adminUsername: {
        type: DataTypes.STRING,
        allowNull: true
    },
    action: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    entity: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    entityId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ipAddress: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    userAgent: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true,
    updatedAt: false // Only track createdAt for logs
});

// Define Relationships
Admin.hasMany(ActivityLog, { foreignKey: 'adminId' });
ActivityLog.belongsTo(Admin, { foreignKey: 'adminId' });

module.exports = ActivityLog;
