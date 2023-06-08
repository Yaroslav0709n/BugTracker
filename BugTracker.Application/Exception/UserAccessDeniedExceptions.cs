namespace BugTracker.Application.Exception
{
    public class UserAccessDeniedExceptions : System.Exception
    {
        public UserAccessDeniedExceptions(string name) : base($"User: {name} access denied!") { }
    }
}
