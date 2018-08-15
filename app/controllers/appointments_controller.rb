class AppointmentsController < ApplicationController

    before_action :authentication_required , only: [:index, :new, :show, :create, :edit, :update, :destroy]

    def index
        @appointments = helpers.current_user.appointments
    end

    def new
        @appointment = Appointment.new
        @apartment = Apartment.find_by(:id => params[:apartment_id])
        binding.pry
    end

    def create
        binding.pry
        @appointment = Appointment.create(strong_params(params))

        redirect_to appointment_path(@appointment)
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
        binding.pry
    end

    private

    def strong_params(params)
        params.require(:appointment).permit(:time, :user_id, :apartment_id)
    end

end
