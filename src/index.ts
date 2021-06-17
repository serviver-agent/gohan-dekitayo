const Discord = require("discord.js"); //todo:import文を使う
import { IncomingWebhook } from "@slack/webhook";
import { VoiceState } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Discord.Client();
const DISCODE_TOKEN = process.env.DISCODE_TOKEN as string;
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK as string;

const webhook = new IncomingWebhook(SLACK_WEBHOOK);

client.on("ready", () => {
  console.log("ready...");
});

client.on(
  "message",
  (msg: { content: string; reply: (arg0: string) => void }) => {
    if (msg.content === "ping") {
      msg.reply("Pong!");
    }
  }
);

client.on(
  "voiceStateUpdate",
  async (oldState: VoiceState, newState: VoiceState) => {
    if (
      oldState.channel?.members.size === undefined &&
      newState.channel?.members.size === 1
    ) {
      // User Joins a voice channel
      (async () => {
        await webhook.send({
          text: `${
            newState.channel?.members.toJSON()[0].displayName
          } < :slack_call: :watashi:  :in: :discord: :now:`,
        });
      })();
    }
  }
);

client.login(DISCODE_TOKEN);
