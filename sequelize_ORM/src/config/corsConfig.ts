import cors, { CorsOptions } from "cors";

export const configureCors = (): ReturnType<typeof cors> => {
  return cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void): void => {
      const allowedOrigins = [
        "http://localhost:5173", 
        // "https://yourcustomdomain.com", 
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS")); 
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true,
    preflightContinue: false,
    maxAge: 600, 
    optionsSuccessStatus: 204,
  } as CorsOptions); 
};

export default configureCors;
