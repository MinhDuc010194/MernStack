const moongose = require('mongoose');

const ProfileSchema = new moongose.Schema({
user : {
    type : moongose.Schema.Types.ObjectId,
    ref: 'User'
},
company : {
    type: String
},
website:{
    type: String
},
location:{
    type: String
},
status:{
    type: String,
    required: true
},
skills:{
    type: [String],
    required: true
},
bio: {
    type: String
},
githubusername:{
    type: String
},
experience: [
    {
        title: {
            type: String,
            required: true  
        },
        company: {
            type: String,
            required: true  
        },
        location: {
            type: String,
        },
        from: {
            type: Date,
            required: true  
        },
        to: {
            type: Date,
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
        },
    }
],
education: [
    {
        school: {
            type: Date,
         required: true  
        }, 
        degree: {
            type: Date,
            required: true  
        },
        fieldofstudy: {
            type: Date,
            required: true  
        },  
        from: {
            type: Date,
            required: true  
        },
        to: {
            type: Date,
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
        },
    }
],

social: {
    facabook:{
        type: String
    },
},
date: {
    type: Date,
    default: Date.now
},
});

module.exports = Profile = moongose.model('profile',ProfileSchema);