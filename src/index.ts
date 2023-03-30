import { Telegraf } from "telegraf";
import config from "./config";
import cron from "node-cron";

const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN!);

cron.schedule('  0 17 * * *', () => {
  bot.telegram.sendMessage(
    config.TELEGRAM_CHANNEL_ID,
    "السناكات متاحة للمحادثات الآن"
  );

  bot.telegram.setChatPermissions(config.TELEGRAM_CHANNEL_ID, {
    can_send_messages: true,
    can_send_audios: true,
    can_send_documents: true,
    can_send_photos: true,
    can_send_videos: true,
  });
})

cron.schedule('  0 18 * * *', () => {
  bot.telegram.setChatPermissions(config.TELEGRAM_CHANNEL_ID, {
    can_send_messages: false,
    can_send_audios: false,
    can_send_documents: false,
    can_send_photos: false,
    can_send_videos: false,
  });
})

bot.hears("السلام عليكم", (ctx) =>
  ctx.reply("وعليكم السلام ورحمة الله وبركاته كيف الحال")
);
bot.hears("اهلا", (ctx) => ctx.reply("اهلين"));
bot.hears("مرحبا", (ctx) => ctx.reply("مرحبتين"));

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
