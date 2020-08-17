class ThoughtsController < ApplicationController
  before_action :set_thought, only: [:show, :update, :destroy]
  before_action :authorize_request, only: [:index, :show, :create, :update, :destroy, :add_tag, :toggle_like]

  # GET /thoughts
  def index
    @thoughts = Thought.all
    render json: @thoughts.reverse, include: [:likes, :tags]
  end

  # GET /thoughts/1
  def show
    render json: @thought, include: [:likes, :tags]
  end

  # POST /thoughts
  def create
    @thought = Thought.new(thought_params)
    @thought.user = @current_user

    if @thought.save
      render json: @thought, status: :created
    else
      render json: @thought.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /thoughts/1
  def update
    if @thought.update(thought_params)
      render json: @thought
    else
      render json: @thought.errors, status: :unprocessable_entity
    end
  end

  # DELETE /thoughts/1
  def destroy
    @thought.destroy
  end

  # PUT /thoughts/1/tags/:tagname
  def add_tag
    @thought = Thought.find(params[:id])

    if Tag.exists?(name: params[:tag_name])
      @tag = Tag.where(name: params[:tag_name])
    else
      @tag = Tag.create(name: params[:tag_name])
    end

    @thought.tags << @tag unless @thought.tags.select { |tag| tag.name == params[:tag_name] }.length > 0

    render json: @thought, include: :tags
  end

  # PUT /thoughts/1/like
  def toggle_like
    @thought = Thought.find(params[:id])

    @present = @thought.likes.select { |like| like.user == @current_user }
    if @present.length > 0
     @present.first.destroy
     @thought = Thought.find(params[:id])
    else
      @like = @thought.likes.create(:user => @current_user)
    end

    render json: @thought, include: [:likes, :tags]
  end

  # GET /thoughts/search?query=first-post
  def search
    qArray = params[:query].split(',')

    if qArray
      @thoughts = Thought.all.select { |thought| ((thought.tags.map {|x| x.name.downcase} & qArray).empty? == false) || ((thought.content.split(' ').map {|x| x.downcase} & qArray).empty? == false)  }
    end

    render json: @thoughts.reverse, include: [:tags, :likes]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_thought
      @thought = Thought.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def thought_params
      params.require(:thought).permit(:content, :user_id, :color, :location)
    end
end
