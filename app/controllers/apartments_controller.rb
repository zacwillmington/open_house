class ApartmentsController < ApplicationController

   before_action :authentication_required , only: [:index, :new, :show, :create, :edit, :update, :destroy]
    before_action :admin_access_required, only: [:create, :new, :edit, :update, :destroy]

   def index
       @apartments = Apartment.all
   end

   def new
       @apartment = Apartment.new
   end

   def create
       @apartment = Apartment.new(strong_params(params))
       if @apartment.save
           @appointment = Appointment.create(:user_id => helpers.current_user.id, :apartment_id => @apartment.id, :time => @apartment.available_times)
           redirect_to user_apartment_path(@appointment.user, @appointment.apartment)
       else

           render :new
       end
   end

   def show
       @apartment = Apartment.find_by(:id => params[:id])
   end

   def edit
       @apartment = Apartment.find_by(:id => params[:id])
   end

   def update
       @apartment = Apartment.find_by(:id => params[:id])
       @apartment.update(strong_params(params))

       @apartment.appointments.first.update_admin_appointment_time
       #add validations
       render :show
   end

   def destroy
       @apartment = Apartment.find_by(:id => params[:id])
       @apartment.appointments.destroy_all
       @apartment.destroy
       redirect_to apartments_path
   end

   private

   def strong_params(params)
       params.require(:apartment).permit(:address, :available_times, :image, :bedrooms, :bathrooms, :parking, :price)
   end
end
