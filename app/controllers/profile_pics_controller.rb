class ProfilePicsController < ApplicationController
  before_action :set_profile_pic, only: [:show, :update, :destroy]
  before_action :authorize_request, only: [:index, :show, :create, :update, :destroy]

  # GET /profile_pics
  def index
    @profile_pics = ProfilePic.all

    render json: @profile_pics
  end

  # GET /profile_pics/1
  def show
    render json: @profile_pic
  end

  # POST /profile_pics
  def create
    @profile_pic = ProfilePic.new(profile_pic_params)

    if @profile_pic.save
      render json: @profile_pic, status: :created, location: @profile_pic
    else
      render json: @profile_pic.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /profile_pics/1
  def update
    if @profile_pic.update(profile_pic_params)
      render json: @profile_pic
    else
      render json: @profile_pic.errors, status: :unprocessable_entity
    end
  end

  # DELETE /profile_pics/1
  def destroy
    @profile_pic.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_profile_pic
      @profile_pic = ProfilePic.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def profile_pic_params
      params.require(:profile_pic).permit(:image)
    end
end
