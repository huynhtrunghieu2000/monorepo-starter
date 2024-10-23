import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = z
  .object({
    NODE_ENV: z.enum(["production", "development", "test"]),
    PORT: z.coerce.number().optional(),
    JWT_SECRET: z.string().describe("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: z
      .coerce.number()
      .describe("minutes after which access tokens expire")
      .optional(),
    JWT_REFRESH_EXPIRATION_DAYS: z
      .coerce.number()
      .describe("days after which refresh tokens expire")
      .optional(),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: z
      .coerce.number()
      .describe("minutes after which reset password token expires")
      .optional(),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: z
      .coerce.number()
      .describe("minutes after which verify email token expires")
      .optional(),
    SMTP_HOST: z
      .string()
      .describe("server that will send the emails")
      .optional(),
    SMTP_PORT: z
      .coerce.number()
      .describe("port to connect to the email server")
      .optional(),
    SMTP_USERNAME: z.string().describe("username for email server").optional(),
    SMTP_PASSWORD: z.string().describe("password for email server").optional(),
    EMAIL_FROM: z
      .string()
      .describe("the from field in the emails sent by the app")
      .optional(),
  })
  .catchall(z.any());

const { data: envVars, error } = envVarsSchema.safeParse(process.env);
console.log(envVars);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD
      }
    },
    from: envVars.EMAIL_FROM
  }
};
