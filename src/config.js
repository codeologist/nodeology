
    module.exports = function( sitename, lang ){

        var config = {
            "site":{
                "nodeology.co.nz" : {
                    "cssskin":"main.css",
                    "name":"nodeology",
                    "about":"Nodeology is a community website for Node JS developers, in New Zealand, to ask questions and share knowledge."
                },
                "localhost" : {
                    "cssskin":"main.css",
                    "name":"localhost",
                    "about":"Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?"
                }
            },
            lang:{
                "en":{
                    registerSuccessText:"account %s has been registered.",
                    registerTitleText:"register a new account",
                    loginTitleText:"login to your account",
                    registerButtonText:"register",
                    loginButtonText:"login",
                    wordRegister:"register",
                    wordUsername:"username",
                    wordPassword:"password",
                    wordConfirm:"confirm password"
                }
            },
            "api":{
                "localhost":{
                    register:"http://localhost:5001/register"
                }
            }

        };

        return {
            "site": config.site[sitename],
            "lang":config.lang[lang||"en"],
            "api":config.api[sitename]
        };
    };