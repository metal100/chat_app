module Api
  class  ChatsController < ApplicationController

    def index
      @products = Chat.all
      render json: @products
    end

    def create
     @contents = Chat.new
     @contents.content = params[:contents]
     @contents.save
     render json: @contents
    end

  end
end
