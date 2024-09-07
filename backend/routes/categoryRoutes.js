import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  getAllCategoriesController, // Fixed the naming
  createCategoryController,
  deleteCategoryController, // Fixed the typo
  getSingleCategoryController, // Updated for consistency
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

// Routes
// Create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// Update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// Get all categories
router.get("/get-category", getAllCategoriesController); // Fixed naming

// Get single category
router.get("/single-category/:slug", getSingleCategoryController); // Updated for consistency

// Delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController // Fixed typo
);

export default router;
