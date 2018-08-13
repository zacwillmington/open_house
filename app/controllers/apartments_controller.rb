class ApartmentsController < ApplicationController

   before_action :authentication_required , only: [:index, :new, :show, :create, :edit, :update, :destroy]

   def index

   end

   def new
       binding.pry
       @apartment = Apartment.new
   end

   def create
       @apartment = Apartment.new(strong_params(params))
       if @apartment.save
           redirect_to apartment_path(@apartment)
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
       params.require(:apartment).permit()
   end
end
