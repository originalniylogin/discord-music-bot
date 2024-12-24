import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel } from '@discordjs/voice';
import ytdl from '@distube/ytdl-core';
import { Injectable } from '@nestjs/common';
import { ChannelType, CommandInteraction } from 'discord.js';

import { isNil } from '~lib/utils';

import { PlayDto } from './play.dto';

@Command({
  name: 'play',
  description: 'Description',
})
@Injectable()
export class PingCommand {
  @Handler()
  onPlay(
    @InteractionEvent() interaction: CommandInteraction,
    @InteractionEvent(SlashCommandPipe) options: PlayDto
  ): string {
    const { guild } = interaction;
    if (isNil(guild)) return 'guild permission required';

    const voiceChannels = guild.channels.cache.filter((channel) => channel.type === ChannelType.GuildVoice);

    const voiceChannel = voiceChannels.at(0);
    if (isNil(voiceChannel)) return 'voice channel not found';
    // Join the voice channel
    const voiceChannelConnection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });

    console.log('read stream');

    const stream = ytdl(`https://www.youtube.com/watch?v=${options.query}`, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });
    // const stream = fs.readFileSync("./morphine.webm");
    const resource = createAudioResource(stream);
    const player = createAudioPlayer();
    player.play(resource);

    console.log('Subscribe the connection to the player');
    voiceChannelConnection.subscribe(player);

    console.log('Handle events');
    player.on(AudioPlayerStatus.Idle, () => {
      console.log('Playback finished.');
      voiceChannelConnection.destroy(); // Leave the voice channel
    });

    player.on('error', (error) => {
      console.error('Error playing audio:', error);
      voiceChannelConnection.destroy(); // Leave the voice channel
    });

    return `Playing ${options.query}`;
  }
}
