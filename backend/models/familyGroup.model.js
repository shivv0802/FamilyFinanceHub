const mongoose = require('mongoose');


const familyGroupSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    groupName: {
        type: String,
        required: true
    },
    description :{
        type: String
    }
 }, {timestamps: true});


const FamilyGroup = mongoose.model('FamilyGroup', familyGroupSchema);

module.exports = FamilyGroup;