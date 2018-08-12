class UsersController < ApplicationController

     before_action :authentication_required , only: [:index, :new, :create, :edit, :update, :destroy]

    def new
        @user = User.new
    end

    def create
        @user = User.new(strong_params(params))
        if @user.save
            session[:user_id] = @user.id
            redirect_to user_path(@user)
        else
            render :new
        end
    end

    def show

    end

    def edit
        @user = User.new
    end

    def update
        binding.pry
    end

    def destroy
        
    end

    private

    def strong_params(params)
        params.require(:user).permit(:name, :email, :password, :admin)
    end
end
