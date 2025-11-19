const Listing=require("../models/listing")

module.exports.index = async (req, res) => {
    // 1. Get both 'category' and 'search' from the URL
    const { category, search } = req.query; 
    let allListings;

    if (category) {
        // Logic 1: Filter by Category
        allListings = await Listing.find({ category: category });
    } else if (search) {
        // Logic 2: Filter by Search Query (New Code)
        allListings = await Listing.find({
            $or: [
                // Search inside Title, Location, OR Country
                // $regex: search -> looks for the pattern
                // $options: "i" -> makes it Case Insensitive (e.g., "india" finds "India")
                { title: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } }
            ]
        });
    } else {
        // Logic 3: No Filter? Show All
        allListings = await Listing.find({});
    }

    // Render the page with whatever data we found
    res.render("listings/index.ejs", { allListings });
};
module.exports.renderNewform=(req,res)=>{
    res.render("listings/new.ejs");
};
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:'reviews',populate:{path:'author'}}).populate('owner');
    if(!listing){
         req.flash('error','Listing you request for does not exist!');
        return res.redirect('/listings');
    }
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing=async(req,res,next)=>{
    const apiKey = process.env.MAPTILER_API_KEY;
    const location = req.body.listing.location;
    const url1 = `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${apiKey}&limit=1`;
    const geoResponse = await fetch(url1);
    const geoData = await geoResponse.json();
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.geometry=geoData.features[0].geometry;
    let savedListing=await newListing.save();
    // console.log(savedListing);
    req.flash('success','New Listing Created!');
    res.redirect('/listings');
   
};


module.exports.renderEditform=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
         req.flash('error','Listing you request for does not exist!');
        return res.redirect('/listings');
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace('/upload','/upload/w_200');
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
   let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== 'undefined'){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
     req.flash('success','Listing Updated!');
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
     req.flash('error','Listing Deleted!');
    res.redirect('/listings');
};