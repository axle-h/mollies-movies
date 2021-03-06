using System.Collections.Generic;
using MolliesMovies.Common.Data;

namespace MolliesMovies.Movies.Data
{
    public class PaginatedMovieQuery : PaginatedQuery<Movie>
    {
        public string Title { get; set; }
        
        public string Quality { get; set; }
        
        public string Language { get; set; }
        
        public bool? Downloaded { get; set; }
        
        public string Genre { get; set; }
        
        public int? YearFrom { get; set; }
        
        public int? YearTo { get; set; }
        
        public int? RatingFrom { get; set; }
        
        public int? RatingTo { get; set; }
    }
}