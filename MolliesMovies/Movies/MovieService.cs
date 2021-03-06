using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MolliesMovies.Common;
using MolliesMovies.Common.Data;
using MolliesMovies.Common.Exceptions;
using MolliesMovies.Movies.Data;
using MolliesMovies.Movies.Models;
using MolliesMovies.Movies.Requests;
using MolliesMovies.Scraper.Data;

namespace MolliesMovies.Movies
{
    public interface IMovieService
    {
        Task<Paginated<MovieDto>> SearchAsync(
            SearchMoviesRequest request,
            CancellationToken cancellationToken = default);

        Task<IScrapeSession> GetScrapeSessionAsync(string source, ScraperType type, IScrapeSession lastSession = null, CancellationToken cancellationToken = default);

        Task<MovieDto> GetAsync(int id, CancellationToken cancellationToken = default);
        Task<ICollection<MovieImageSourcesDto>> GetMoviesWithMissingImagesAsync(int limit, int skip = 0, CancellationToken cancellationToken = default);
        Task<ICollection<string>> GetAllGenresAsync(CancellationToken cancellationToken = default);
    }

    public class MovieService : IMovieService
    {
        private readonly MolliesMoviesContext _context;
        private readonly IMapper _mapper;
        private readonly ISystemClock _clock;
        private readonly IOptions<MovieOptions> _options;

        public MovieService(IMapper mapper, MolliesMoviesContext context, ISystemClock clock, IOptions<MovieOptions> options)
        {
            _mapper = mapper;
            _context = context;
            _clock = clock;
            _options = options;
        }

        public async Task<IScrapeSession> GetScrapeSessionAsync(string source, ScraperType type, IScrapeSession lastSession = null, CancellationToken cancellationToken = default)
        {
            var scrapeFrom = type == ScraperType.Local
                ? (await _context.GetLatestLocalMovieBySourceAsync(source, cancellationToken))?.DateCreated
                : (await _context.GetLatestMovieBySourceAsync(source, cancellationToken))?.DateCreated;

            var movieImdbCodes = lastSession?.MovieImdbCodes ?? await _context.Set<Movie>().Select(x => x.ImdbCode).ToListAsync(cancellationToken);
            var localImdbCodes = lastSession?.LocalImdbCodes ?? await _context.Set<LocalMovie>().Select(x => x.ImdbCode).ToListAsync(cancellationToken);
            
            return new ScrapeSession(source, type, scrapeFrom, movieImdbCodes, localImdbCodes, _context, _clock, cancellationToken, _options.Value);
        }

        public async Task<MovieDto> GetAsync(int id, CancellationToken cancellationToken = default)
        {
            var movie = await _context.GetMovieDetailByIdAsync(id, cancellationToken);
            if (movie is null)
            {
                throw EntityNotFoundException.Of<Movie>(id);
            }

            return _mapper.Map<MovieDto>(movie);
        }

        public async Task<Paginated<MovieDto>> SearchAsync(
            SearchMoviesRequest request,
            CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<PaginatedMovieQuery>(request);
            var result = await _context.SearchMoviesAsync(query, cancellationToken);
            return _mapper.Map<Paginated<MovieDto>>(result);
        }
        
        public async Task<ICollection<MovieImageSourcesDto>> GetMoviesWithMissingImagesAsync(int limit, int skip = 0, CancellationToken cancellationToken = default)
        {
            var query = _context.Set<Movie>().Where(x => string.IsNullOrEmpty(x.ImageFilename));
            var count = await query.CountAsync(cancellationToken);
            
            return count > 0
                ? await query
                    .OrderBy(x => x.Id)
                    .Skip(skip)
                    .Take(limit)
                    .ProjectTo<MovieImageSourcesDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken)
                : new List<MovieImageSourcesDto>();
        }

        public async Task<ICollection<string>> GetAllGenresAsync(CancellationToken cancellationToken = default) =>
            await _context.Set<Genre>().Select(x => x.Name).OrderBy(x => x).ToListAsync(cancellationToken);
    }
}