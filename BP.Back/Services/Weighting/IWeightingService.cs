using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Weighting
{
    public interface IWeightingService
    {
        void AddWeight(Guid userId, string trackId);
        void ReduceWeight(Guid userId, string trackId);
        void IgnoreTrackWeight(Guid userId, string trackId);
    }
}
