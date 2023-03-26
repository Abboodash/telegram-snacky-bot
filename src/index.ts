import { Telegraf } from 'telegraf';
import config from "./config";

import fs from "fs";
import path from "path";
import * as cron from 'node-cron'

const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN!);

const now = new Date().getHours()

cron.schedule('* * 17 * * *', () => {
    const filePath = path.join('images', 'سناكات متاحة.png');
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (!err) {
            bot.telegram.sendPhoto(config.TELEGRAM_CHANNEL_ID, { source: data, filename: "سناكات متاحة.png" })
        } else {
            console.log(err)
        }
    })

    bot.telegram.setChatPermissions(config.TELEGRAM_CHANNEL_ID,
        {
            can_send_messages: true,
            can_send_audios: true,
            can_send_documents: true,
            can_send_photos: true,
            can_send_videos: true,
        })
});

cron.schedule('* * 18 * * *', () => {
    bot.telegram.setChatPermissions(config.TELEGRAM_CHANNEL_ID,
        {
            can_send_messages: false,
            can_send_audios: false,
            can_send_documents: false,
            can_send_photos: false,
            can_send_videos: false,
        })
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));