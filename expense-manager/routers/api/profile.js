const express = require('express');
const router = express.Router();
const auth = require('../../midleware/auth');
const moongose = require('mongoose');
const Profile = require('../../models/Profile');
const {check, validationResult} = require('express-validator/check');

// @route GET api/profile/me
//@desc   Get current user profile
//@access Private
router.get('/me',auth, async (req, res) => { 
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user',
        ['name','avatar']);

        if(!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route GET api/profile
//@desc   Create or Update user profile
//@access Private
router.post(
    '/',
    [
    auth,
        [
            check('status','Status is required')
            .not()
            .isEmpty(),
            check('skills','Skill is require')
            .not()
            .isEmpty()
        ]
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const{
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            facebook
        } = req.body;

        //build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(githubusername) profileFields.githubusername = githubusername;
        if(skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        //build social object
        profileFields.social = {};
        if(facebook) profileFields.social.facebook = facebook;
        try {

            let profile = Profile.findOne({user: req.user.id});
            if(profile) {
                profile = await Profile.findOneAndUpdate(
                    {
                      query: {user: req.user.id},
                      update: { $set: profileFields},
                      new: true
                    },
              );
              console.log(profileFields);
                return res.json(profile);
            }
            // Create
            profile = new Profile(profileFields);
            console.log("aaaa");
            await profile.save();
            res.json(profile);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
        

    }
);

module.exports = router;