class ThoughtsController < ApplicationController
  before_action :set_thought, only: [:show, :update, :destroy]

  # GET /thoughts
  def index
    @thoughts = Thought.all

    render json: @thoughts
  end

  # GET /thoughts/1
  def show
    render json: @thought
  end

  # POST /thoughts
  def create
    @thought = Thought.new(thought_params)

    if @thought.save
      render json: @thought, status: :created, location: @thought
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
