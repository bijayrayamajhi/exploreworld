
const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/asyncWrap.js");
const {isLoggedIn, isOwner, validateSchema }= require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });



router.route("/")
.get(asyncWrap(listingController.index))
.post(
   isLoggedIn,
   upload.single('listing[image]'),
   validateSchema,
   asyncWrap(listingController.createNewListing));

  
  //NEW ROUTE
  router.get("/new", isLoggedIn,listingController.renderNewForm );

router.route("/:id")
.get( asyncWrap(listingController.showListing))
.put( isLoggedIn, isOwner, upload.single('listing[image]'), validateSchema, asyncWrap(listingController.editListing))
.delete(isLoggedIn, isOwner, asyncWrap(listingController.destroyListing));

 //edit and update route
 router.get("/:id/edit", isLoggedIn, isOwner, asyncWrap(listingController.renderEditForm));


 module.exports = router;