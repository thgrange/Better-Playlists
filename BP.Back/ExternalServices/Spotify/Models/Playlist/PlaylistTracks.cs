namespace ExternalServices.Spotify.Models.Playlist
{
    public class PlaylistTracks
    {
        public string Href { get; set; }
        public int Limit { get; set; }
        public string Next {  get; set; }
        public int Offset { get; set; }
        public string Previous { get; set; }
        public int Total { get; set; }
        public IEnumerable<PlaylistTrack> Items { get; set; }
        public int PageNumber { get; set; }
        public bool HasMore { get; set; }
    }
}
