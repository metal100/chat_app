module UsersHelper

  # 現在のユーザーをログアウトする
  def log_out
     forget(current_user)
     session.delete(:user_id)
     @current_user = nil
   end

   def logged_in?
  !current_user.nil?
end
end
