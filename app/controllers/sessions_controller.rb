class SessionsController < ApplicationController

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

        @user = User.find_by(:email => params[:email])
        if @user && @user.authenticate(params[:password])
            session[:user_id] = @user.id
            redirect_to user_path(helpers.current_user)
        else
            if @user == nil
                flash[:notice] = "Email not found"
            else
                flash[:notice] = "Password does not match"
            end
            render :new
        end
    end

    def destroy
        session.clear
        redirect_to root_path
    end

end
