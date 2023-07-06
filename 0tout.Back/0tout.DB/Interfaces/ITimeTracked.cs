namespace _0tout.DB.Interfaces
{
    public interface ITimeTracked
    {
        DateTime CreationDate { get; set; }
        DateTime ModificationDate { get; set; }
    }
}