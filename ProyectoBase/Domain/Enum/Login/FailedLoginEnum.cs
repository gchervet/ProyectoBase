using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public enum FailedLoginEnum
    {
        LoggedWithoutError = 1,
        InvalidCredentials = 2,
        TooManyLoginsAttemps = 3,
        UserNotFound = 4,
        BlockedUser = 5,
        UserActivationPending = 6,

        AnotherDeviceInUser = 8,
        OnlyOneAttempLeft = 9,
        CredentialsConfirmationExpired = 10,
        UserConfirmationExpired = 11,
        UserSendPending = 12,
        UnknownException = 13
    }
}