const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamp');


//@desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = async (req, res, next) => {
   let query;

   queryStr = JSON.stringify(req.query);
   queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

   query = Bootcamp.find(JSON.parse(queryStr));

    try {
        const bootcamps = await query;
        res.status(200).json({success:true,count: bootcamps.length,data:bootcamps});
    } catch (err) {
        next(err);
    }
   

}

//@desc Get a bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = async (req, res, next) => {

    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp){
            return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));;
        }

        res.status(200).json({success:true,data:bootcamp});
    } catch (err) {
        // res.status(400).json({success : false});
        next(err);
    }

};

//@desc Create new boootcamp 
// @route POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
        success: true,
        data: bootcamp
    });
    } catch (err) {
        next(err);
    }

    
    // res.status(200).json({success:true,msg:`Create new bootcamp`});
};

//@desc Updtae boootcamp 
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = async (req, res, next) => {

    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true
           });
        
           if(!bootcamp){
            return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));;
        }
           
           res.status(200).json({success:true,data:bootcamp});
    } catch (err) {
        next(err);
    }
  

    // res.status(200).json({success:true,msg:`Update bootcamp ${req.params.id}`});
};

//@desc Delete boootcamp 
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp =async (req, res, next) => {

    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        
        if(!bootcamp){
            return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));;
        }
           
        res.status(200).json({success:true,data:{}});
    } catch (err) {
        next(err);
    }
};

// @desc Get bootcamps within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
exports.getBootcampsInRadius = async (req, res, next) => {  
    const {zipcode, distance} = req.params;
   
    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;   

    // Calc radius using radians
    // Divide distance by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });

    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    });
}

