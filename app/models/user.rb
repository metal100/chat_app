class User < ActiveRecord::Base
  has_many :friendships_of_from_user, :class_name => 'Friendship', :foreign_key => 'from_user_id', :dependent => :destroy
  has_many :friendships_of_to_user, :class_name => 'Friendship', :foreign_key => 'to_user_id', :dependent => :destroy
  has_many :friends_of_from_user, through: :friendships_of_from_user, :source => 'to_user'
  has_many :friends_of_to_user, through: :friendships_of_to_user, :source => 'from_user'
  has_many :messages

  validates :name,presence: true
  validates :email,presence: true,
             uniqueness: true
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  def forget
    update_attribute(:remember_digest, nil)
  end

  def make_friend_with(user)
    friendships_of_from_user.find_or_create_by(to_user_id: user.id)
  end

  def friend?(user)
    self.from_friend?(user) || self.to_friend?(user)
  end

  def from_friend?(user)
    friends_of_from_user.include?(user)
  end

  def to_friend?(user)
    friends_of_to_user.include?(user)
  end

  def break_off_friend(user)
    friendship = friendships_of_from_user.find_by(to_user_id: user.id) || friendships_of_to_user.find_by(from_user_id: user.id)
    friendship.destroy if friendships_of_from_user
  end

  def find_friendship_for(user_id)
    from_user_friendship = friendships_of_from_user.find_by(to_user_id: user_id)
    to_user_friendship = friendships_of_to_user.find_by(from_user_id: user_id)
    if from_user_friendship
      from_user_friendship.to_user
    else
      to_user_friendship.from_user
    end
  end

  def friends_all
    friends_of_to_user + friends_of_from_user
  end
end
