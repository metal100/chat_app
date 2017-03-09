module Api
  class  UsersController < ApplicationController
    def search
      @users = User.where.not(id: current_user.id)
      @search_string = params[:search_string]
      if !@search_string || @search_string == ""
        @search_users = []
      else
        @search_users = @users.where("name like?", "#{@search_string}%")
      end
      render json: @search_users
    end
  end
end
