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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { Movie } from '../model/models';
import { MoviePaginated } from '../model/models';
import { MoviesOrderBy } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getMovie(id: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<Movie>;
    public getMovie(id: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpResponse<Movie>>;
    public getMovie(id: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpEvent<Movie>>;
    public getMovie(id: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getMovie.');
        }

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'text/plain',
                'application/json',
                'text/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Movie>(`${this.configuration.basePath}/api/v1/movies/${encodeURIComponent(String(id))}`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param title 
     * @param quality 
     * @param language 
     * @param downloaded 
     * @param genre 
     * @param yearFrom 
     * @param yearTo 
     * @param ratingFrom 
     * @param ratingTo 
     * @param orderBy 
     * @param orderByDescending 
     * @param page 
     * @param limit 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public searchMovies(title?: string, quality?: string, language?: string, downloaded?: boolean, genre?: string, yearFrom?: number, yearTo?: number, ratingFrom?: number, ratingTo?: number, orderBy?: MoviesOrderBy, orderByDescending?: boolean, page?: number, limit?: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<MoviePaginated>;
    public searchMovies(title?: string, quality?: string, language?: string, downloaded?: boolean, genre?: string, yearFrom?: number, yearTo?: number, ratingFrom?: number, ratingTo?: number, orderBy?: MoviesOrderBy, orderByDescending?: boolean, page?: number, limit?: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpResponse<MoviePaginated>>;
    public searchMovies(title?: string, quality?: string, language?: string, downloaded?: boolean, genre?: string, yearFrom?: number, yearTo?: number, ratingFrom?: number, ratingTo?: number, orderBy?: MoviesOrderBy, orderByDescending?: boolean, page?: number, limit?: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpEvent<MoviePaginated>>;
    public searchMovies(title?: string, quality?: string, language?: string, downloaded?: boolean, genre?: string, yearFrom?: number, yearTo?: number, ratingFrom?: number, ratingTo?: number, orderBy?: MoviesOrderBy, orderByDescending?: boolean, page?: number, limit?: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (title !== undefined && title !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>title, 'Title');
        }
        if (quality !== undefined && quality !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>quality, 'Quality');
        }
        if (language !== undefined && language !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>language, 'Language');
        }
        if (downloaded !== undefined && downloaded !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>downloaded, 'Downloaded');
        }
        if (genre !== undefined && genre !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>genre, 'Genre');
        }
        if (yearFrom !== undefined && yearFrom !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>yearFrom, 'YearFrom');
        }
        if (yearTo !== undefined && yearTo !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>yearTo, 'YearTo');
        }
        if (ratingFrom !== undefined && ratingFrom !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>ratingFrom, 'RatingFrom');
        }
        if (ratingTo !== undefined && ratingTo !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>ratingTo, 'RatingTo');
        }
        if (orderBy !== undefined && orderBy !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>orderBy, 'OrderBy');
        }
        if (orderByDescending !== undefined && orderByDescending !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>orderByDescending, 'OrderByDescending');
        }
        if (page !== undefined && page !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>page, 'Page');
        }
        if (limit !== undefined && limit !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>limit, 'Limit');
        }

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'text/plain',
                'application/json',
                'text/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<MoviePaginated>(`${this.configuration.basePath}/api/v1/movies`,
            {
                params: queryParameters,
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
