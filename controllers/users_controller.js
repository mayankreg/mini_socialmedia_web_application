const User = require('../models/user');

module.exports.profile = function(request, response){
    return response.render('users_profile', {
        title: 'Profile'
    });
}

// render sign up page
module.exports.signUp = function(request, response){
    if(request.isAuthenticated()){
        return response.redirect('/users/profile');
    }

    return response.render('user_sign_up', {
        title: 'Codeial | Sign Up!'
    });
}

// render sign in page
module.exports.signIn = function(request, response){
    if(request.isAuthenticated()){
        return response.redirect('/users/profile');
    }

    return response.render('user_sign_in', {
        title: 'Codeial | Sign In!'
    });
}

// get sign up data
module.exports.create = function(request, response){
    
    if(request.body.password != request.body.confirm_password){
        return response.redirect('back');
    }
    User.findOne({email: request.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
    
        if(!user){
            User.create(request.body, function(err, user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                return response.redirect('/users/sign-in');
            });
        }else{
            return response.redirect('back');
        }
    });
}

// get sign in data
module.exports.createSession = function(request, response){    
    return response.redirect('/');
}

module.exports.destroySession = function(request, response){
    request.logout(function(err) {
        if (err) { return next(err)}
    });
    return response.redirect('/');
}