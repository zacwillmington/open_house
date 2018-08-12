class ApplicationController < ActionController::Base

    def authentication_required
        if !helpers.logged_in?
            redirect_to root_path
        end
    end
end
