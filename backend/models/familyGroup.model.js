const mongoose = require('mongoose');


const familyGroupSchema = new mongoose.Schema({
  
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