module SessionsHelper

    def error_msg_for_signin_attempt(user)
        if user == nil
             "Email not found"
        else
            "Password does not match"
        end
    end
end
