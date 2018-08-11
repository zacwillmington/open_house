class SessionsController < ApplicationController

    before_action :authentication_required

    def index #change to welcome action

    end

    def new
        if helpers.logged_in?
            redirect_to user_path(helpers.current_user)
        else
            #renders :new
        end
    end

    def create
        if auth_hash = request.env["omniauth.auth"]
            @user = User.find_or_create_by_omniauth(auth_hash)
            binding.pry
            redirect_to user_path(@user)
        elsif  User.authenticate_and_login_existing_user(params)
            binding.pry
            redirect_to user_path(helpers.current_user)
        else
            binding.pry
             flash[:notice] = @user.error_msg_for_signin_attempt
            render :new
        end
    end

    def destroy
        session.clear
        redirect_to root_path
    end

end


#   - add before_action :authentication_required test   it works
