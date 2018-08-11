class SessionsController < ApplicationController

    before_action :authentication_required , only: [:index, :new, :create] 

    def index #change to welcome action

    end

    def new

    end

    def create
        if auth_hash = request.env["omniauth.auth"]
            @user = User.find_or_create_by_omniauth(auth_hash)
             if @user.save
                 redirect_to user_path(@user)
              else
                  flash[:notice] = "Change email to public on github.com"
                  redirect_to '/signin'
              end
        else
            @user = User.find_by(:email => params[:email])
            if @user && @user.authenticate(params[:password])
                session[:user_id] = @user.id
                redirect_to user_path(helpers.current_user)

            else
                flash[:notice] = User.error_msg_for_signin_attempt(@user)
                render :new
            end
        end
    end

    def destroy
        session.clear
        redirect_to root_path
    end

end


#   - add before_action :authentication_required test   it works
