class UsersController < ApplicationController

    def new
        @user = User.new
    end

    def create
        @user = User.new(strong_params(params))
        binding.pry
    end

    def show

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
