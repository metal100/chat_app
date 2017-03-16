class FriendshipsController < ApplicationController
  def create
    user = User.find(params[:to_user_id])
    if current_user.friend?(user)
      redirect_to root_path
    else
      current_user.make_friend_with(user)
      redirect_to root_path
    end
  end

  def destroy
    user = User.find(params[:id])
    friendship = current_user.find_friendship_for(params[:id])
    current_user.break_off_friend(user)
    redirect_to root_path
  end
end
