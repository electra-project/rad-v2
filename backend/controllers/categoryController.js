import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import fs from "fs";
import formidable from "formidable"; // Assuming you're using formidable for form parsing

export const createCategoryController = (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).send({ message: "Error in form data" });
    }

    let { name } = fields;
    const { photo } = files;

    // Log for debugging
    console.log("Fields received:", fields);
    console.log("Files received:", files);

    // Fix: Check if `name` is an array and extract the first element
    if (Array.isArray(name)) {
      name = name[0]; // Extract the first element if it's an array
    }

    // Check if name is undefined or null
    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already exists",
      });
    }

    const category = new categoryModel({
      name,
      slug: slugify(name), // Ensure `name` is a string
    });

    if (photo && photo[0]) {
      category.photo.data = fs.readFileSync(photo[0].filepath);
      category.photo.contentType = photo[0].mimetype;
    }

    await category.save();
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  });
};

// Update a category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { id } = req.params;
    const { photo } = req.files;

    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      category.photo.data = fs.readFileSync(photo.path);
      category.photo.contentType = photo.type;
    }

    await category.save();
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating category",
      error,
    });
  }
};

// Get all categories
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find().select("-photo");
    res.status(200).send({
      success: true,
      message: "All categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching categories",
      error,
    });
  }
};

// Get a single category
export const getSingleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting category",
      error,
    });
  }
};

// Delete a category
export const deleteCategoryController = async (req, res) => {
  try {
    await categoryModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};

// CAT PHOTO

// CAT PHOTO
export const categoryPhotoController = async (req, res) => {
  try {
    const category = await categoryModel
      .findById(req.params.cid)
      .select("photo"); // Use categoryModel instead of Category
    if (category && category.photo && category.photo.data) {
      res.set("Content-type", category.photo.contentType);
      return res.status(200).send(category.photo.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Photo not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting category photo",
      error,
    });
  }
};
