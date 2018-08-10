class UsersController < ApplicationController

    def new
        @user = User.new
    end

    def create
        if helpers.logged_in?
            redirect_to user_path(helpers.current_user)
        else
            @user = User.new(strong_params(params))
                if @user.save
                    session[:user_id] = @user.id
                    redirect_to user_path(@user)
                else
                    #error message
                    render :new
                end
        end
    end

    def show
        binding.pry
        @user = User.find_by(:id => params[:id])
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
