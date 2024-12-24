import { Param } from '@discord-nestjs/core';

export class PlayDto {
  @Param({ description: 'Search query', required: true, autocomplete: true })
  query: string;
}
