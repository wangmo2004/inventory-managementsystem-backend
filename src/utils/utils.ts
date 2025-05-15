import { Response } from "express";
import mongoose from "mongoose";

// Reusable error handler
export const handleError = (res: Response, error: unknown, statusCode = 500): void => {
  const errorMessage = error instanceof Error ? error.message : 'Server error';
  res.status(statusCode).json({ message: errorMessage });
};

// Validate MongoDB ObjectId with dynamic label
export const isValidObjectId = (id: string, res: Response, label = 'ID'): boolean => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: `Invalid ${label} format` });
    return false;
  }
  return true;
};
