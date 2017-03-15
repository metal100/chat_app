module Api
  class  ChatsController < ApplicationController
    before_action :authenticate_user!, only: [:create]

    def create
     @contents = Chat.new
     @contents.content = params[:contents]
     @contents.save
     render json: @contents
    end

  end
end
