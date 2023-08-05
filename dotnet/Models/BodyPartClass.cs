using System.Text.Json.Serialization;

namespace dotnet.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum BodyPartClass
    {
        Biceps = 1,
        Back = 2,
        Triceps = 3,
        Chest = 4,
        Shoulders = 5,
        Legs = 6,
        Abs = 7,
        Misc = 8
    }
}