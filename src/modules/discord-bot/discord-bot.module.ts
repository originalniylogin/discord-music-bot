/* bot.module.ts */

import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';

import { PingCommand } from './commands';
import { DiscordBotGateway } from './discord-bot.gateway';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [DiscordBotGateway, PingCommand],
})
export class DiscordBotModule {}
