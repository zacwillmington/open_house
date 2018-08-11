class UsersController < ApplicationController

    before_action :authentication_required 

    def new
        @user = User.new
    end

    def create
        @user = User.new(strong_params(params))
        if @user.save
            session[:user_id] = @user.id
            redirect_to user_path(@user)
        else
            #error message
            render :new
        end
    end

    def show
        redirect_to '/signin'
    end

    def edit

    end

    def update

    end

    def destroy

    end

    private

    def strong_params(params)
        params.require(:user).permit(:name, :email, :password, :admin)
    end
end
