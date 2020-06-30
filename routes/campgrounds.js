let express = require("express");
let router = express.Router();
let Campground = require("../models/campground");
let middleware = require("../middleware");

router.get("/", (req, res) => {
	Campground.find({},(err, allCampgrounds) => {
		if(err) { 
			console.log(err);
		} else {
		res.render("campgrounds/index",{campgrounds: allCampgrounds, currentUser: req.user});
		}
	});
});

router.post("/", middleware.isLoggedIn, (req, res) => {
	let name = req.body.name;
	let image = req.body.image;
	let price = req.body.price;
	let description = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	let newCampground = {name: name, image: image, price: price, description: description, author: author};
	Campground.create(newCampground,(err, newlyCreated) => {
		if(err) {
			console.log(err);
		} else {
			req.flash("success", "Successfully Created");
			res.redirect("/campgrounds");
		}
	});
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
		res.render("campgrounds/new");
});
router.get("/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err) {
			console.log(err);
		} else {
		res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
			Campground.findById(req.params.id, (err, foundCampground) => {
				res.render("campgrounds/edit", {campground: foundCampground});
			});
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if(err) {
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground Updated");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground deleted");
			res.redirect("/campgrounds");
		}
	}); 
});

module.exports = router;