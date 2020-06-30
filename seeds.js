let mongoose = require("mongoose");
let Campground = require("./models/campground");
let Comment   = require("./models/comment");
 
let data = [
    {
        name: "Motor Home", 
        image: "https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        description: "Tous les campings participants vous offrent un rabais de 5 $ applicable sur un séjour, alors que plusieurs d’entre eux vous proposent aussi jusqu’à trois autres coupons-rabais supplémentaires. Pourcentage de rabais à compter du deuxième séjour, gratuités ou escomptes sur le bois de chauffage, locations d’embarcations nautiques, et bien d’autres : vous y trouverez assurément votre compte avec l’appli GO Camping Québec."
    },
    {
        name: "Sunrise", 
        image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        description: "Look at the beautiful sunrise"
    },
    {
        name: "Stars", 
        image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        description: "Blink stars in the dark night"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.deleteMany({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed campgrounds!");
        // Comment.remove({}, function(err) {
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log("removed comments!");
        //      //add a few campgrounds
        //     data.forEach(function(seed){
        //         Campground.create(seed, function(err, campground){
        //             if(err){
        //                 console.log(err)
        //             } else {
        //                 console.log("added a campground");
        //                 //create a comment
        //                 Comment.create(
        //                     {
        //                         text: "This place is great, but I wish there was internet",
        //                         author: "Homer"
        //                     }, function(err, comment){
        //                         if(err){
        //                             console.log(err);
        //                         } else {
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             console.log("Created new comment");
        //                         }
        //                     });
        //             }
        //         });
        //     });
        // });
    }); 
    //add a few comments
}
 
module.exports = seedDB;