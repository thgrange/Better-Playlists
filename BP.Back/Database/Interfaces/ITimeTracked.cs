namespace Database.Interfaces
{
    public interface ITimeTracked
    {
        DateTime CreationDate { get; set; }
        DateTime? ModificationDate { get; set; }
    }
}