module Api
  class  ChatsController < ApplicationController

  １

    def create
     @contents = Chat.new
     @contents.content = params[:contents]
     @contents.save
     render json: @contents
    end

  end
end
