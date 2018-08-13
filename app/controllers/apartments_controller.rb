class ApartmentsController < ApplicationController

   before_action :authentication_required , only: [:index, :new, :show, :create, :edit, :update, :destroy]

   def index

   end

   def new
       @apartment = Apartment.new
   end

   def create
       binding.pry
       @apartment = Apartment.new(strong_params(params))
       if @apartment.save
           @appointment = Appointment.create(:user_id => helpers.current_user.id, :apartment_id => @apartment.id)
           binding.pry
           redirect_to user_apartment_path(@appointment.apartment, @appointment.user)
       else

           render :new
       end
   end

   def show

   end

   def edit
       @apartment = Apartment.new
   end

   def update
       binding.pry
   end

   def destroy

   end

   private

   def strong_params(params)
       params.require(:apartment).permit(:address, :available_times)
   end
end
