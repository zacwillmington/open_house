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

        respond_to do |format|

            format.json {
              render json: @appointment, status: 201
            }
            format.html { redirect_to user_appointments_path(helpers.current_user, @appointment) }
        end
    end

    def show

    end

    def destroy
        @appointment = Appointment.find_by(:id => params[:id])
        @appointment.destroy
        redirect_to user_appointments_path(helpers.current_user)
    end

    private

    def strong_params(params)
        params.require(:appointment).permit(:name, :user_id, :apartment_id, :time )
    end

end
