export * from './genre.service';
import { GenreService } from './genre.service';
export * from './movie-torrent.service';
import { MovieTorrentService } from './movie-torrent.service';
export * from './movies.service';
import { MoviesService } from './movies.service';
export * from './scraper.service';
import { ScraperService } from './scraper.service';
export * from './transmission.service';
import { TransmissionService } from './transmission.service';
export const APIS = [
  GenreService,
  MovieTorrentService,
  MoviesService,
  ScraperService,
  TransmissionService,
];
