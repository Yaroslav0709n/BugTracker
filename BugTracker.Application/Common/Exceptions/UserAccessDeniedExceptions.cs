namespace BugTracker.Application.Common.Exceptions
{
    public class UserAccessDeniedExceptions : Exception
    {
        public UserAccessDeniedExceptions(string name) : base($"User: {name} access denied!") { }
    }
}
