import { InjectDiscordClient, On, Once } from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { AutocompleteInteraction, Client, Events } from 'discord.js';
import youtubeSearch from 'yt-search';

@Injectable()
export class DiscordBotGateway {
  private readonly logger = new Logger(DiscordBotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client
  ) {}

  @Once('ready')
  onReady(): void {
    this.logger.log(`Bot ${this.client.user?.tag ?? 'unknown'} was started!`);
  }

  @On(Events.InteractionCreate)
  async onAutocomplete(interaction: AutocompleteInteraction): Promise<void> {
    if (!interaction.isAutocomplete()) return;

    const query = interaction.options.get('query')?.value;
    console.log(query);

    if (typeof query !== 'string') return;

    const searchResponse = await youtubeSearch({ query, category: 'music' });
    await interaction.respond(searchResponse.videos.map((video) => ({ name: video.title, value: video.videoId })));
  }
}
