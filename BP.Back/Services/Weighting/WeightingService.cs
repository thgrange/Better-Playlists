using Database.Interfaces;
using Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Weighting
{
    public class WeightingService : IWeightingService
    {
        private IBPUnitOfWork _unitOfWork; 

        public WeightingService(IBPUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void AddWeight(Guid userId, string trackId)
        {
            var track = _unitOfWork.TrackRepository.GetUserTrack(userId, trackId);

            if (track == null)
            {
                track = new Track
                {
                    TrackId = trackId,
                    UserId = userId,
                    Weight = Globals.BaseWeight + 1
                };
                _unitOfWork.TrackRepository.Add(track);
            }
            else
            {
                track.Weight += 1;
                _unitOfWork.TrackRepository.Update(track);
            }
        }

        public void ReduceWeight(Guid userId, string trackId)
        {
            var track = _unitOfWork.TrackRepository.GetUserTrack(userId, trackId);

            if (track == null)
            {
                track = new Track
                {
                    TrackId = trackId,
                    UserId = userId,
                    Weight = Globals.BaseWeight - 1
                };
                _unitOfWork.TrackRepository.Add(track);
            }
            else
            {
                track.Weight -= 1;
                _unitOfWork.TrackRepository.Update(track);
            }
        }

        public void IgnoreTrackWeight(Guid userId, string trackId)
        {
            var track = _unitOfWork.TrackRepository.GetUserTrack(userId, trackId);

            if (track == null)
            {
                track = new Track
                {
                    TrackId = trackId,
                    UserId = userId,
                    Weight = Globals.BaseWeight,
                    Ignore = true
                };
                _unitOfWork.TrackRepository.Add(track);
            }
            else
            {
                track.Weight = Globals.BaseWeight;
                track.Ignore = true;
                _unitOfWork.TrackRepository.Update(track);
            }
        }
    }
}
