import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayIntentBits } from 'discord.js';

import { DiscordBotModule } from '~modules/discord-bot/discord-bot.module';
import { AppConfigService, SharedModule } from '~modules/shared';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DiscordModule.forRootAsync({
      imports: [SharedModule],
      inject: [AppConfigService],
      useFactory: (appConfigSerivce: AppConfigService) => {
        console.log(appConfigSerivce.discordToken);
        return {
          autoLogin: true,
          failOnLogin: true,
          token: appConfigSerivce.discordToken,
          discordClientOptions: {
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
          },
          /* registerCommandOptions: [
            {
              allowFactory: (message) => {
                console.log('Deploy check');
                return !message.author.bot && message.content === '!deploy';
              },
            },
          ], */
        };
      },
    }),
    DiscordBotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
