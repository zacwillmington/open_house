class AppointmentsController < ApplicationController

    before_action :authentication_required , only: [:index, :new, :show, :create, :edit, :update, :destroy]

    def index
        @appointments = helpers.current_user.appointments
    end

    def new
        @appointment = Appointment.new
        @apartment = Apartment.find_by(:id => params[:apartment_id])
    end

    def create
        @appointment = Appointment.create(strong_params(params))

        redirect_to user_appointments_path(helpers.current_user, @appointment)
    end

    def show

    end

    def edit
        @appointment = Appointment.find_by(:id => params[:appointment_id])
    end

    def update
        binding.pry
    end

    def destroy
        @appointment = Appointment.find_by(:id => params[:id])
        @appointment.destroy
        redirect_to user_appointments_path(helpers.current_user)
    end

    private

    def strong_params(params)
        params.require(:appointment).permit(:time, :user_id, :apartment_id)
    end

end
