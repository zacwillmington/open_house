class UsersController < ApplicationController

    before_action :authentication_required

    def new
        @user = User.new
    end

    def create
        if helpers.logged_in?
            redirect_to user_path(helpers.current_user)
        else
            #Add OmniAuth authentication here if request returns relevent data.
            binding.pry
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
        if helpers.logged_in?
            #renders :show
        else
            redirect_to '/signin'
        end

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
