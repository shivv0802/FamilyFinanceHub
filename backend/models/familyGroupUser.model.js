const mongoose = require('mongoose');

const familyGroupUserSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    familyGroupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FamilyGroup'
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const FamilyGroupUser = mongoose.model('FamilyGroupUser', familyGroupUserSchema);


module.exports = FamilyGroupUser;