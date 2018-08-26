class UsersController < ApplicationController

     before_action :authentication_required , only: [:index, :edit, :update, :destroy]
     helper :all

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
        @user = helpers.current_user
    end

    def update
        @user = User.find_by(:id => params[:id])

        @user.update(strong_params(params))
        #notice account updated
        redirect_to user_path(@user)

    end

    def destroy
        @user = User.find_by(:id => params[:id])

        if helpers.current_user == @user
            @user.appointments.each do |appointment|
                appointment.apartment.appointments.destroy_all #deletes all appointments tied to each apartment that the user created, which includes the appointments of people attending the showing.
            end

            @user.appointments.each do |appointment|
                appointment.apartment.destroy #deletes each apartment that the user created
            end

            @user.appointments.destroy_all
            @user.destroy
            redirect_to root_path
        else
            redirect_to user_path(helpers.current_user)
        end

    end

    private

    def strong_params(params)
        params.require(:user).permit(:name, :email, :password, :admin, :phone)
    end
end
