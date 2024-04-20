import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const getRestaurant = async (req:Request, res:Response) => {
  try{
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);
    if(!restaurant){
      return res.status(404).json({message:"Restaurant not found"});
    }

    res.json(restaurant);
  }catch(error){
    console.log(error);
    res.status(500).json({message: "Server error"});
  }
}

const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const district = req.params.city;

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["district"] = new RegExp(district, "i");
    const districtCheck = await Restaurant.countDocuments(query);
    if (districtCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      //URL = selectedCuisines = italian, burgers, chinese
      // [italian, burgers, chinese]
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      // restaurantName = Pizza Place
      // cuisines = [Pizza, pasta, italian]
      // searchQuery = Pasta
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // sortOption = "lastUpdated"
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize), // 50 result, pageSize = 10 > pages 5
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  getRestaurant,
  searchRestaurant,
};
