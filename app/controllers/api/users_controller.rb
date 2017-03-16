module Api
  class  UsersController < ApplicationController
    before_action :authenticate_user!, only: [:search]

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

    def index
      @users = current_user.friends_all
      render json: @users
    end
  end
end
