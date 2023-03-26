import dotenv from "dotenv";
dotenv.config()

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID } = process.env;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHANNEL_ID) throw new Error("Missing Environment Variables");

const config: Record<string, string> = {
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHANNEL_ID
}

export default config