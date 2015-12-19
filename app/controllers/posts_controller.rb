class PostsController < ApplicationController
	def index
		@new_post = Post.new
		@all_post = Post.order(created_at: :desc).all
	end

	def create
		@new_post = Post.new(post_params)
		if @new_post.save
			redirect_to(root_path)
		else
			render(root_path)
		end
	end

	def show
		@post = Post.find(params[:filmid])
	end

	private
	def post_params
		params.require(:post).permit(:filmid, :title, :comment, :rating)
	end
end
