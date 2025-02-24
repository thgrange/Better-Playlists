using Database.Models;
using FluentRandomPicker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Random
{
    public class RandomService
    {
        public RandomService() { }
        public void Test(List<Track> tracks)
        {
            Out.Of()
                .PrioritizedElements(tracks)
                .WithValueSelector(t => t.TrackId)
                .AndWeightSelector(t => t.Weight)
                .Pick(50);
        }
    }
}
