/**
 * Public Mollies Movies API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ScraperType } from './scraper-type';

export interface ScrapeSource {
  source?: string | null;
  type?: ScraperType;
  success?: boolean;
  error?: string | null;
  startDate?: string;
  endDate?: string | null;
  movieCount?: number;
  torrentCount?: number;
}
