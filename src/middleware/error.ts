import { ErrorHandler } from "grammy";

export const error: ErrorHandler = (error) => {
  console.error(JSON.stringify({
    context: error.ctx,
    error,
  }));
};
