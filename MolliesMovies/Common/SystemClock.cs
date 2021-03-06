using System;

namespace MolliesMovies.Common
{
    public interface ISystemClock
    {
        DateTime UtcNow { get; }
    }

    public class SystemClock : ISystemClock
    {
        public DateTime UtcNow => DateTime.UtcNow;
    }
}