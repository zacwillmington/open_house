class ApplicationController < ActionController::Base

    def authentication_required
        if !helpers.logged_in?
            redirect_to root_path
        end
    end

    def admin_access_required
        if !helpers.current_user.admin
            redirect_to root_path
        end
    end
end
