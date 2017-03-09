class User < ActiveRecord::Base

  validates :name,presence: true
  validates :email,presence: true,
             uniqueness: true
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

         # ユーザーログインを破棄する
 def forget
   update_attribute(:remember_digest, nil)
 end

end
