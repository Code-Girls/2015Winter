class Post < ActiveRecord::Base
	validates :filmid, presence: true,
                    length: { minimum: 5 }
end
