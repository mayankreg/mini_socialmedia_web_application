module.exports.profile = function(request, response){
    return response.render('users_profile', {
        title: 'Profile'
    });
}